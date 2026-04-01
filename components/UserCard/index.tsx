import { step_3 } from "@/mock_data";
import Ionicons from '@expo/vector-icons/Ionicons';
import { t } from "i18next";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MessageCard from "../MessageCard";

export default function UserCard() {
    const [selectedItem, setSelectedItem] = useState<typeof step_3.items[0] | null>(null);
    const [bannedUsers, setBannedUsers] = useState<Set<string>>(new Set());

    return (
        <View style={styles.view}>
            {step_3.items.map((item) => (
                <View key={item.id}>
                    <TouchableOpacity onPress={() => setSelectedItem(item)}>
                        <View style={styles.container}>
                            <Image src={item.authorDetails.profileImageUrl} width={30} height={30} style={styles.pfp} />
                            <View style={[
                                styles.usernameBadge,
                                item.authorDetails.isChatOwner && { backgroundColor: "#ffe600" },
                                item.authorDetails.isChatModerator && { backgroundColor: "#008f00" },
                                item.authorDetails.isChatSponsor && { backgroundColor: "#8400ff" },
                            ]}>
                                <Text style={[
                                    styles.username,
                                    item.authorDetails.isChatOwner && { color: "#000" },
                                ]}>
                                    {item.authorDetails.displayName}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <MessageCard
                        item={item.snippet}
                        isBanned={bannedUsers.has(item.authorDetails.displayName)}
                    />
                </View>
            ))}

            {selectedItem && (
                <Modal
                    transparent
                    animationType="none"
                    onRequestClose={() => setSelectedItem(null)}
                >
                    <TouchableOpacity
                        style={styles.backdrop}
                        onPress={() => setSelectedItem(null)}
                    >
                        <View style={styles.sheet}>
                            <Image
                                src={selectedItem.authorDetails.profileImageUrl}
                                width={60}
                                height={60}
                                style={styles.pfp}
                            />
                            <Text style={{ color: 'white', fontSize: 16, marginTop: 8 }}>
                                {selectedItem.authorDetails.displayName}
                            </Text>

                            <Pressable
                                style={styles.banContainer}
                                onPress={() => {
                                    setBannedUsers(prev => new Set(prev).add(selectedItem.authorDetails.displayName));
                                    setSelectedItem(null);
                                }}
                            >
                                <Ionicons name="ban" size={24} color={'white'} />
                                <Text style={styles.banText}>
                                    {t('Ban user')}
                                </Text>
                            </Pressable>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
    view: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 4,
    },
    pfp: {
        objectFit: 'cover',
        borderRadius: 50,
    },
    usernameBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: '#333',
    },
    username: {
        color: 'white',
        fontSize: 14,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: '#222',
        padding: 24,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        minHeight: 200,
        alignItems: 'center',
    },
    banContainer: {
        alignItems: 'center',
        gap: 8,
        flexDirection: 'row',
        marginTop: 15,
        padding: 5,
    },
    banText: {
        color: 'white',
        fontSize: 25,
    }
});