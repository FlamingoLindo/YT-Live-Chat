import { step_3 } from "@/mock_data";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MessageCard from "../MessageCard";

export default function UserCard() {
    return (
        <View style={styles.view}>
            {step_3.items.map((item) => (
                <View key={item.id}>
                    <TouchableOpacity>
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

                    <MessageCard message={item.snippet.displayMessage} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
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
});