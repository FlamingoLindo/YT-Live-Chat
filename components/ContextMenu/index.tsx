import { baseColors } from '@/consts/colors';
import { useInsets } from '@/hooks/useInsets';
import { useLocalization } from '@/hooks/useLocalization';
import { useTheme } from '@/hooks/useTheme';
import { useToggle } from '@/hooks/useToggle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    onToggleStream: () => void;
    showStream: boolean;
}

export default function ContextMenu({ onToggleStream, showStream }: Props) {
    const insets = useInsets();
    const { colors } = useTheme();
    const { t, toggleLanguage } = useLocalization();
    const [isOpen, toggleOpen] = useToggle(false);
    const router = useRouter();

    const options = [
        { id: 1, title: showStream ? t('Close Preview') : t('Open Preview'), onPress: onToggleStream },
        { id: 2, title: t('Super chats'), onPress: () => { router.navigate('/(super)'), toggleOpen() } },
        { id: 3, title: t('Moderators'), onPress: () => { router.navigate('/(mods)'), toggleOpen() } },
        {
            id: 4,
            title: t('Change to PT/BR'),
            onPress: toggleLanguage
        },
    ];

    return (
        <View style={[styles.view, { top: insets.top + 100 }]}>
            <Pressable onPress={toggleOpen}>
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={15} color={colors.icon} />
                </View>
            </Pressable>
            {isOpen && (
                <View style={[styles.optContainer, { backgroundColor: colors.background }]}>
                    {options.map((item, index) => (
                        <View
                            key={item.id}
                            style={[
                                styles.optRow,
                                index < options.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.separator }
                            ]}
                        >
                            <TouchableOpacity onPress={item.onPress}>
                                <Text style={[
                                    styles.optText,
                                    { color: item.id === 1 && showStream ? colors.active : colors.text }
                                ]}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        right: 16,
        zIndex: 10,
        alignItems: 'flex-end',
    },
    container: {
        width: 30,
        height: 30,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    optContainer: {
        marginTop: 8,
        width: 200,
        overflow: 'visible',
    },
    optRow: {
        height: 45,
        justifyContent: 'center',
        paddingHorizontal: 14,
        backgroundColor: baseColors.darkBg3
    },
    optText: {
        fontSize: 15,
        fontWeight: '500',
    },
});