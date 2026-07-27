import React, {useState} from "react";
import {KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View,} from "react-native";
import {FEELINGS} from "@/types/diary";
import Button from "@/component/Button";
import {CloseButton} from "@/component/CloseButton";

export default function CreateEntryModal({visible, onClose, onSave}: {visible: boolean, onClose: () => void, onSave: (title: string, feeling: string, content: string) => void}) {
    const [title, setTitle] = useState("");
    const [feeling, setFeeling] = useState("neutral");
    const [content, setContent] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [errorContent, setErrorContent] = useState("");

    const handleSave = () => {
        setErrorTitle("");
        setErrorContent("");

        const titleT = title.trim();
        const contentT = content.trim();
        let titleError = true;
        let contentError = true;

        if (!titleT)
            setErrorTitle("Please enter a title");
        else if (titleT.length > 50)
            setErrorTitle("Title too long (50 max)");
        else
            titleError = false;
        if (!contentT)
            setErrorContent("Please enter a content");
        else if (contentT.length > 250)
            setErrorContent("Content too long (250 max)");
        else
            contentError = false;
        if (titleError || contentError)
            return;
        setTitle("");
        setFeeling("neutral");
        setContent("");
        onSave(titleT, feeling, contentT);
        onClose();
    };

    return (<Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
        <Pressable className="flex-1 justify-center items-center bg-black/50 px-6" onPress={onClose}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Pressable className="w-full bg-white rounded-3xl p-5" onPress={(e) => e.stopPropagation()}>
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-3xl font-bold text-black">New diary entry</Text>
                        <CloseButton onClose={onClose}/>
                    </View>

                    <Text className="font-semibold text-gray-700 mb-1">Title</Text>
                    {errorTitle && <ErrorMsg>{errorTitle}</ErrorMsg>}
                    <TextInput value={title} onChangeText={setTitle} placeholder="Give your day a title..." className="border border-gray-200 rounded-xl px-4 py-3 mb-4"/>

                    <Text className="font-semibold text-gray-700 mb-1">How do you feel?</Text>
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {FEELINGS.map((item) => {
                            const selected = feeling === item.value;

                            return (<Pressable key={item.value} onPress={() => setFeeling(item.value)}
                                               style={{backgroundColor: selected ? item.bg : "#f3f4f6", borderColor: selected ? item.fg : "#e5e7eb"}}
                                               className="px-4 py-2 rounded-full border">
                                    <Text style={{color: selected ? item.fg : "#374151"}} className={selected ? "font-medium" : ""}>{item.label}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    <Text className="font-semibold text-gray-700 mb-1">Content</Text>
                    {errorContent && <ErrorMsg>{errorContent}</ErrorMsg>}
                    <TextInput value={content} onChangeText={setContent} placeholder="Write about your day..." multiline textAlignVertical="top" className="border border-gray-200 rounded-xl px-4 py-3 h-40 mb-4"/>
                    <Button icon="save-outline" onPress={handleSave}>Save entry</Button>
                </Pressable>
            </KeyboardAvoidingView>
        </Pressable>
    </Modal>);
}

function ErrorMsg({children}: {children: React.ReactNode}) {
    return (<Text className="text-red-500 italic">{children}</Text>)
}
