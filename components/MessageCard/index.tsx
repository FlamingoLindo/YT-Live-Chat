import { useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface MessageCardProps {
    item: any;
    isBanned?: boolean;
}

const superColors = {
    red: "red",
    blue: "blue",
    yellow: "#c8d600",
    green: "green"
}

function getColor<T>(obj: Record<string, T>): T {
    const values = Object.values(obj);
    return values[Math.floor(Math.random() * values.length)];
}

export default function MessageCard({ item, isBanned }: MessageCardProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const [isDeleted, setIsDeleted] = useState(false);
    const isSuperChat = item.superChatDetails ? true : false;

    return (
        <View style={[
            styles.view,
            { backgroundColor: isSuperChat ? getColor(superColors) : "" },
            isBanned && styles.bannedView,
        ]}>
            {isSuperChat && item.superChatDetails && (
                <Text style={[
                    styles.msg,
                    { color: isDarkMode ? "white" : "black", fontWeight: "bold" },
                    isBanned && styles.bannedText,
                ]}>
                    {item.superChatDetails.amountDisplayString}
                </Text>
            )}
            <Text style={[
                styles.msg,
                { color: isDarkMode ? "white" : "black" },
                isBanned && styles.bannedText,
            ]}>
                {item.displayMessage}
            </Text>
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