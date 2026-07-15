import { Pressable, Text, View } from "react-native";
import {useState} from "react";

export default function HomeScreen() {
    const [idx, setIdx] = useState(0);
    const text = ["A simple text", "Hello World!"];

    return (<View className="flex-1 items-center justify-center gap-3">
        <Text className="text-xl rounded-lg bg-green-500 px-5 py-3">{text[idx]}</Text>
        <Pressable className="rounded-full bg-white px-5 py-3">
            <Text className="text-green-500" onPress={() => setIdx((idx + 1) % 2)}>Click me</Text>
        </Pressable>
    </View>);
}
