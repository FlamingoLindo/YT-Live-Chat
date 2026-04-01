import ContextMenu from "@/components/ContextMenu";
import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { useTheme } from "@/hooks/useTheme";
import { useToggle } from "@/hooks/useToggle";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from 'react-native-webview';
import '../i18n';

import { MessagesDTO } from "@/services/dto/messages";
import { SearchDTO } from "@/services/dto/search";
import { VideosDTO } from "@/services/dto/videos";
import { ChannelNotLiveError, ytMessages, ytSearch, ytVideos } from "@/services/yt";

type StreamState = "loading" | "live" | "not-live" | "error";

export default function Index() {
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [showStream, toggleShowStream] = useToggle(false);
  const [streamState, setStreamState] = useState<StreamState>("loading");
  const [liveData, setLiveData] = useState<SearchDTO | null>(null);
  const [videoData, setVideoData] = useState<VideosDTO | null>(null);
  const [messagesData, setMessagesData] = useState<MessagesDTO | null>(null);
  const nextPageTokenRef = useRef<string | undefined>(undefined);
  const seenMessageIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    async function fetchLive() {
      try {
        const result = await ytSearch({ channelId: process.env.EXPO_PUBLIC_CHANNEL_ID });
        setLiveData(result);
        setStreamState("live");
      } catch (e) {
        setStreamState(e instanceof ChannelNotLiveError ? "not-live" : "error");
        console.error(e);
      }
    }
    fetchLive();
  }, []);

  useEffect(() => {
    const videoId = liveData?.items[0]?.id.videoId;
    if (!videoId) return;

    async function fetchVideo() {
      try {
        const result = await ytVideos({ videoId });
        setVideoData(result);
      } catch (e) {
        console.error(e);
      }
    }
    fetchVideo();
  }, [liveData]);

  useEffect(() => {
    const liveChatId = videoData?.items[0]?.liveStreamingDetails.activeLiveChatId;
    const videoId = liveData?.items[0]?.id.videoId;
    if (!liveChatId || !videoId) return;

    nextPageTokenRef.current = undefined;
    seenMessageIdsRef.current = new Set();
    setMessagesData(null);

    let isMounted = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const [messagesResult, latestVideoResult] = await Promise.all([
          ytMessages({ liveChatId, pageToken: nextPageTokenRef.current }),
          ytVideos({ videoId }),
        ]);

        if (!isMounted) return;

        nextPageTokenRef.current = messagesResult.nextPageToken;
        setVideoData(latestVideoResult);

        const incomingItems = messagesResult.items ?? [];
        const newItems = incomingItems.filter((item) => {
          if (seenMessageIdsRef.current.has(item.id)) return false;
          seenMessageIdsRef.current.add(item.id);
          return true;
        });

        if (newItems.length > 0) {
          setMessagesData((prev) => {
            const previousItems = prev?.items ?? [];
            const mergedItems = [...previousItems, ...newItems].slice(-300);

            return {
              ...messagesResult,
              items: mergedItems,
            };
          });
        }

        const waitMs = messagesResult.pollingIntervalMillis ?? 5000;
        timer = setTimeout(poll, waitMs);
      } catch (e) {
        console.error(e);
        if (!isMounted) return;
        timer = setTimeout(poll, 5000);
      }
    };

    poll();

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [videoData?.items[0]?.liveStreamingDetails.activeLiveChatId, liveData?.items[0]?.id.videoId]);

  if (streamState === "not-live") {
    return (
      <View style={[styles.notLiveContainer, { backgroundColor: isDarkMode ? "#000000" : "#ffffff" }]}> 
        <Text style={[styles.notLiveText, { color: isDarkMode ? "#ffffff" : "#111111" }]}>Channel is not live at the moment</Text>
      </View>
    );
  }

  if (streamState === "error") {
    return (
      <View style={[styles.notLiveContainer, { backgroundColor: isDarkMode ? "#000000" : "#ffffff" }]}> 
        <Text style={[styles.notLiveText, { color: isDarkMode ? "#ffffff" : "#111111" }]}>Unable to load the live stream</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={liveData?.items[0]?.snippet.title ?? "Loading..."} viewerCount={videoData?.items[0]?.liveStreamingDetails.concurrentViewers} />

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        style={[styles.view, { backgroundColor: isDarkMode ? "#000000" : "#ffffff" }]}
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <UserCard items={messagesData?.items ?? []}/>
      </ScrollView>

      <ContextMenu onToggleStream={toggleShowStream} showStream={showStream} />

      {showStream && (
        <WebView
          style={styles.video}
          source={{ uri: `https://www.youtube.com/live/${liveData?.items[0]?.id.videoId}` }}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20
  },
  video: {
    width: '100%',
    height: 220,
  },
  notLiveContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  notLiveText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});