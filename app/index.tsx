import ContextMenu from "@/components/ContextMenu";
import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from 'react-native-webview';
import '../i18n';

export default function Index() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [showStream, setShowStream] = useState(false);

  const STREAM_ID = "nTFXkCV64Ew";


  return (
    <View style={{ flex: 1 }}>
      <Header top={insets.top} />

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        style={[styles.view, { backgroundColor: isDarkMode ? "#121212" : "#f5f5f5" }]}
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <UserCard />
      </ScrollView>

      <ContextMenu insets={insets} onToggleStream={() => setShowStream(prev => !prev)} showStream={showStream} />

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