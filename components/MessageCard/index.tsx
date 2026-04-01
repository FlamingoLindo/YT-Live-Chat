import { getRandomSuperChatColor } from '@/consts/colors';
import { useTheme } from '@/hooks/useTheme';
import { Snippet } from "@/services/dto/messages";
import { StyleSheet, Text, View } from "react-native";

interface MessageCardProps {
    item: Snippet;
    isBanned?: boolean;
}
export default function MessageCard({ item, isBanned }: MessageCardProps) {
    const { colors } = useTheme();
    const isSuperChat = item.superChatDetails ? true : false;
    const superChatComment = item.superChatDetails?.userComment ?? item.displayMessage;

    return (
        <View style={[
            styles.view,
            { backgroundColor: isSuperChat ? getRandomSuperChatColor() : "" },
            isBanned && styles.bannedView,
        ]}>
            {isSuperChat && item.superChatDetails && (
                <Text style={[
                    styles.msg,
                    { color: colors.text, fontWeight: "bold" },
                    isBanned && styles.bannedText,
                ]}>
                    {item.superChatDetails.amountDisplayString}
                </Text>
            )}
            {(!isSuperChat || superChatComment) && (
                <Text style={[
                    styles.msg,
                    { color: colors.text },
                    isBanned && styles.bannedText,
                ]}>
                    {superChatComment}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        marginBottom: 20
    },
    msg: {
        fontSize: 15
    },
    bannedView: {
        opacity: 0.4,
    },
    bannedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});