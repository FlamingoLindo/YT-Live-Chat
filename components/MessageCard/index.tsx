import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface MessageCardProps {
    item: any;
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

export default function MessageCard({ item }: MessageCardProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const isSuperChat = item.superChatDetails ? true : false;

    return (
        <View style={[styles.view, { backgroundColor: isSuperChat ? getColor(superColors) : "" }]}>
            {isSuperChat && item.superChatDetails && (
                <Text style={[styles.msg, { color: isDarkMode ? "white" : "black", fontWeight: "bold" }]}>
                    {item.superChatDetails.amountDisplayString}
                </Text>
            )}
            <Text
                style={[styles.msg, { color: isDarkMode ? "white" : "black" }]}>
                {item.displayMessage}
            </Text>
        </View>
    )
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
    }
});