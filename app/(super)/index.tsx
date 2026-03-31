import { superChats } from "@/mock_data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Super() {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [chats, setChats] = useState(superChats.super_chats ?? []);
    const { t } = useTranslation();


    const colors = {
        background: isDarkMode ? "#1a1a1a" : "#ffffff",
        text: isDarkMode ? "#ffffff" : "#000000",
        subtext: isDarkMode ? "#aaaaaa" : "#666666",
        card: isDarkMode ? "#2e2e2e" : "#f5f5f5",
        border: isDarkMode ? "#3a3a3a" : "#e0e0e0",
    };

    const hasSuperChats = chats.length > 0;

    function selectSuperChat(id: string) {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function removeSuperChats(ids: Set<string>) {
        setChats(prev => prev.filter(s => !ids.has(s.id)));
        setSelectedIds(new Set());
    }

    return (
        <View
            style={
                [styles.container,
                {
                    backgroundColor: colors.background,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom
                }]}
        >
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                    <Text style={[styles.backText, { color: colors.text }]}>{t('Back')}</Text>
                </Pressable>

                {selectedIds.size > 0 ? (
                    <Pressable onPress={() => removeSuperChats(selectedIds)} style={styles.clearButton}>
                        <Ionicons name="checkmark-done" size={24} color={colors.text} />
                        <Text
                            style={[styles.backText,
                            { color: colors.text }]}>
                            {t('Clear Super Chats')} ({selectedIds.size})
                        </Text>
                    </Pressable>
                ) : (<></>)}
            </View>
            {!hasSuperChats ? (
                <View style={styles.emptyState}>
                    <Ionicons name="chatbubble-ellipses-outline" size={64} color={colors.subtext} />
                    <Text
                        style={[styles.emptyStateText,
                        { color: colors.text }]}>
                        {t('No super chats')}
                    </Text>
                    <Text
                        style={[styles.emptyStateSubtext,
                        { color: colors.subtext }]}>
                        {t('There are no super chats yet')}
                    </Text>
                </View>
            ) : (
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {chats.map((s, index) => (
                        <TouchableOpacity
                            key={s.id}
                            onPress={() => selectSuperChat(s.id)}
                            style={[
                                styles.userCard,
                                {
                                    backgroundColor: selectedIds.has(s.id) ? "#4CAF5022" : colors.card,
                                    borderBottomColor: colors.border,
                                },
                                index === chats.length - 1 && { borderBottomWidth: 0 }
                            ]}
                        >
                            <Image
                                source={{ uri: s.authorDetails.profileImageUrl }}
                                style={styles.profileImage}
                            />
                            <View style={styles.userInfo}>
                                <Text style={[styles.userData, { color: colors.text }]}>
                                    {s.authorDetails.displayName}
                                </Text>
                                <Text style={[styles.userData, { color: colors.text }]}>
                                    {s.snippet.superChatDetails.userComment}
                                </Text>
                                <Text style={[styles.userData, { color: colors.text }]}>
                                    {s.snippet.superChatDetails.amountDisplayString}
                                </Text>
                            </View>
                            {selectedIds.has(s.id) && (
                                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 12,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 14,
        marginTop: 8,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    userInfo: {
        padding: 5,
        flex: 1,
        justifyContent: 'center',
    },
    userData: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '500',
    },
});