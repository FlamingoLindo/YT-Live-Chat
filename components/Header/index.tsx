import { step_1, step_2 } from "@/mock_data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header({ top }: { top: number }) {
    const [isShowingCount, setIsShowingCount] = useState(true);

    return (
        <View style={[styles.container, { paddingTop: top + 12 }]}>
            <View style={styles.inner}>
                <View >
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {step_1.items[0].snippet.title}
                </Text>
                <TouchableOpacity onPress={() => setIsShowingCount(!isShowingCount)}>
                    <View style={styles.viewerBadge}>
                        <Ionicons name="person" size={20} color={'white'} />
                        <Text style={styles.viewerCount}>{isShowingCount ? step_2.items[0].liveStreamingDetails.concurrentViewers : '******'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#0f0f0f',
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    inner: {
        paddingHorizontal: 16,
        paddingBottom: 14,
        gap: 8,
    },
    viewerBadge: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
        gap: 5,
    },
    viewerCount: {
        color: '#e0e0e0',
        fontSize: 20,
        fontWeight: '600',
    },
    title: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.3,
        lineHeight: 18,
    },
});