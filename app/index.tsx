import ContextMenu from "@/components/ContextMenu";
import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { useTheme } from "@/hooks/useTheme";
import { useToggle } from "@/hooks/useToggle";
import { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from 'react-native-webview';
import '../i18n';

export default function Index() {
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [showStream, toggleShowStream] = useToggle(false);

  const STREAM_ID = "4Uhp_xRikaU";


  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        style={[styles.view, { backgroundColor: isDarkMode ? "#000000" : "#ffffff" }]}
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <UserCard />
      </ScrollView>

      <ContextMenu onToggleStream={toggleShowStream} showStream={showStream} />

      {showStream && (
        <WebView
          style={styles.video}
          source={{ uri: `https://www.youtube.com/live/${STREAM_ID}` }}
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
});