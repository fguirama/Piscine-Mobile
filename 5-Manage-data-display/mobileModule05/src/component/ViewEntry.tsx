import React from "react";
import {Modal, Pressable, Text, View} from "react-native";
import {iDiaryEntry} from "@/types/diary";
import Feeling from "@/component/Feeling";
import {CloseButton} from "@/component/CloseButton";
import {Ionicons} from "@expo/vector-icons";

export default function ViewEntryModal({entry, onClose, deleteEntry}: {entry?: iDiaryEntry, onClose: () => void, deleteEntry: (eId: number) => void}) {
    return (<Modal visible={entry !== undefined} animationType="fade" transparent onRequestClose={onClose}>
        <Pressable className="flex-1 justify-center items-center bg-black/50 px-6" onPress={onClose}>
            <Pressable className="w-full bg-white rounded-3xl p-6" onPress={(e) => e.stopPropagation()}>
                <View className="flex-row justify-between items-center">
                    {entry && <Text className="text-sm text-gray-400">{new Date(entry.created_at).toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric",})}</Text>}
                    <CloseButton onClose={onClose}/>
                </View>
                <Text className="text-2xl font-bold text-black mb-4">{entry?.title}</Text>
                <View className="flex flex-row justify-between">
                    {entry && <Feeling entry={entry}/>}
                    <Pressable className="ml-4 p-2" onPress={() => {
                        if (entry)
                            deleteEntry(entry.id);
                        onClose();
                    }}>
                        <Ionicons name="trash-outline" size={22} color="#EF4444"/>
                    </Pressable>
                </View>
                <Text className="mt-4 text-gray-700 text-base leading-6">{entry?.content}</Text>
            </Pressable>
        </Pressable>
    </Modal>);
}
