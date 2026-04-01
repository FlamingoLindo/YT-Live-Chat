import { baseColors } from "@/consts/colors";
import { useInsets } from "@/hooks/useInsets";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
    title: string,
    viewerCount: string | undefined
}

export default function Header({ title, viewerCount }: HeaderProps) {
    const insets = useInsets();
    const [isShowingCount, setIsShowingCount] = useState(true);

    return (
        <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
            <View style={styles.inner}>
                <View >
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <TouchableOpacity onPress={() => setIsShowingCount(!isShowingCount)}>
                    <View style={styles.viewerBadge}>
                        <Ionicons name="person" size={20} color={'white'} />
                        <Text style={styles.viewerCount}>{isShowingCount ? viewerCount : '******'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: baseColors.darkBg,
        borderBottomWidth: 1,
        borderBottomColor: baseColors.darkBgAlt,
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
        backgroundColor: baseColors.darkBg2,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
        gap: 5,
    },
    viewerCount: {
        color: baseColors.lightGray,
        fontSize: 20,
        fontWeight: '600',
    },
    title: {
        color: baseColors.darkText,
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.3,
        lineHeight: 18,
    },
});