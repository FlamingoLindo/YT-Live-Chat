import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

interface Props {
    insets: { top: number };
    onToggleStream: () => void;
    showStream: boolean;
}

export default function ContextMenu({ insets, onToggleStream, showStream }: Props) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const isPortuguese = (i18n.resolvedLanguage ?? i18n.language).toLowerCase().startsWith('pt');

    const colors = {
        background: isDarkMode ? '#1e1e1e' : 'white',
        icon: isDarkMode ? 'white' : 'black',
        text: isDarkMode ? '#f0f0f0' : '#1a1a1a',
        separator: isDarkMode ? '#2e2e2e' : '#f0f0f0',
        active: '#FF0000',
    };

    const options = [
        { id: 1, title: showStream ? t('Close Preview') : t('Open Preview'), onPress: onToggleStream },
        { id: 2, title: t('Super chats'), onPress: () => { } },
        { id: 3, title: t('Moderators'), onPress: () => { } },
        {
            id: 4,
            title: t('Change to PT/BR'),
            onPress: () => {
                i18n.changeLanguage(isPortuguese ? 'en' : 'pt');
            }
        },
    ];

    return (
        <View style={[styles.view, { top: insets.top + 100 }]}>
            <Pressable onPress={() => setIsOpen(!isOpen)}>
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <Ionicons name={isOpen ? "chevron-down" : "chevron-up"} size={15} color={colors.icon} />
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
    },
    optContainer: {
        marginTop: 8,
        width: 200,
        borderRadius: 6,
        overflow: 'hidden',
    },
    optRow: {
        height: 45,
        justifyContent: 'center',
        paddingHorizontal: 14,
    },
    optText: {
        fontSize: 15,
        fontWeight: '500',
    },
});