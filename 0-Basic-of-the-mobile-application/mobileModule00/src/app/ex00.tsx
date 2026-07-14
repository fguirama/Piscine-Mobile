import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3">
      <Text className="text-xl rounded-lg bg-green-500 px-5 py-3">A simple text</Text>
      <Pressable className="rounded-full bg-white px-5 py-3">
        <Text className="text-green-500" onPress={() => console.log("Button pressed”")}>Click me</Text>
      </Pressable>
    </View>
  );
}
