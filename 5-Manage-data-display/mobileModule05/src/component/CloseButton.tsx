import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export function CloseButton({onClose}: {onClose: () => void}) {
    return (<Pressable onPress={onClose} className="bg-gray-100 rounded-full p-2">
        <Ionicons name="close" size={22} color="#6B7280"/>
    </Pressable>);
}