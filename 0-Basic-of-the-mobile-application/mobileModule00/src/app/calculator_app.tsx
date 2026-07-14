import React, {useState} from "react";
import { Text, View, Pressable } from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import { evaluate } from "mathjs";

export default function App() {
    const [exp, setExp] = useState("")
    const [result, setResult] = useState("0")
    const buttons = [
        "7", "8", "9", "C", "AC",
        "4", "5", "6", "+", "-",
        "1", "2", "3", "*", "/",
        "0", ".", "00", "="
    ];

    const handlePress = (value: string) => {
        console.log("Button pressed:", value);
        if (value === "=") {
            try {
                setResult(evaluate(exp));
            }
            catch (e) {
                setResult("SyntaxError");
            }
        } else if (value === "AC") {
            setExp("");
            setResult("0");
        } else if (value === "C")
            setExp((prev) => prev.slice(0, -1));
        else
            setExp((prev) => prev + value);
    };

    return (<SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-100 justify-between p-3">
            <View className="h-16 bg-blue-700 justify-center items-center">
                <Text className="text-white text-xl font-bold">Calculator</Text>
            </View>

            <View className="flex justify-end">
                <Text className="text-right text-2xl text-gray-600">{exp === "" ? "0" : exp}</Text>
                <Text className={"text-right text-5xl font-bold" + (result === "SyntaxError" ? " text-red-500" : "")}>{result}</Text>
            </View>

            <View className="grid grid-cols-5">
                {
                    buttons.map((button) => (
                        <Pressable key={button} onPress={() => handlePress(button)} className="flex-1 py-2 m-1 rounded-xl bg-white justify-center items-center shadow">
                            <Text className="text-2xl font-bold">{button}</Text>
                        </Pressable>
                    ))
                }
            </View>
        </SafeAreaView>
    </SafeAreaProvider>);
}
