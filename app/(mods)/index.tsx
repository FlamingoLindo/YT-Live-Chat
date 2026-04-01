import { baseColors } from "@/consts/colors";
import { useTheme } from "@/hooks/useTheme";
import { moderators } from "@/mock_data";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Mods() {
    const { isDarkMode } = useTheme();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { t } = useTranslation();

    const colors = {
        background: isDarkMode ? baseColors.darkBg : baseColors.lightBg,
        text: isDarkMode ? baseColors.darkText : baseColors.lightText,
        subtext: isDarkMode ? "#aaaaaa" : "#666666",
        card: isDarkMode ? baseColors.darkBg3 : "#f5f5f5",
        border: isDarkMode ? "#3a3a3a" : "#e0e0e0",
    };

    const hasModerators = moderators.items && moderators.items.length > 0;

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
            </View>

            {!hasModerators ? (
                <View style={styles.emptyState}>
                    <Ionicons name="people" size={64} color={colors.subtext} />
                    <Text
                        style={[styles.emptyStateText,
                        { color: colors.text }]}>
                        {t('No moderators')}
                    </Text>
                    <Text
                        style={[styles.emptyStateSubtext,
                        { color: colors.subtext }]}>
                        {t('There are no moderators yet')}
                    </Text>
                </View>
            ) : (
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {moderators.items.map((m, index) => (
                        <View
                            key={m.id}
                            style={[
                                styles.moderatorCard,
                                {
                                    backgroundColor: colors.card,
                                    borderBottomColor: colors.border,
                                },
                                index === moderators.items.length - 1 && { borderBottomWidth: 0 }
                            ]}
                        >
                            <Image
                                source={{ uri: m.snippet.moderatorDetails.profileImageUrl }}
                                style={styles.profileImage}
                            />
                            <View style={styles.moderatorInfo}>
                                <Text style={[styles.moderatorName, { color: colors.text }]}>
                                    {m.snippet.moderatorDetails.displayName}
                                </Text>
                            </View>
                        </View>
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
    backText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    moderatorCard: {
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
    moderatorInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    moderatorName: {
        fontSize: 16,
        fontWeight: '500',
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
});