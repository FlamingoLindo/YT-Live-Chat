import { StyleSheet, Text, useColorScheme, View } from "react-native";

interface MessageCardProps {
    message: string;
}

export default function MessageCard({ message }: MessageCardProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    return (
        <View style={styles.view}>
            <Text style={[styles.msg,{ color: isDarkMode ? "white" : "black" }]}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    msg: {
        marginBottom: 20,
        fontSize: 15
    }
});