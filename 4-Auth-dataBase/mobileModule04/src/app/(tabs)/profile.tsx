import {Modal, Pressable, ScrollView, Text, View} from "react-native";
import {useAuth} from "@/providers/AuthProvider";
import {Ionicons} from "@expo/vector-icons";
import Button from "@/component/Button";
import {useEntry} from "@/providers/EntryProvider";
import {iDiaryEntry} from "@/types/diary";
import {Redirect} from "expo-router";
import {useEffect, useState} from "react";
import CreateEntryModal from "@/component/CreateEntry";
import Feeling from "@/component/Feeling";
import ViewEntryModal from "@/component/ViewEntry";

export default function ProfileScreen() {
    const [showCreateEntryModal, setShowCreateEntryModal] = useState(false);
    const [showEntryModal, setShowEntryModal] = useState<iDiaryEntry>();
    const [deleteEntryId, setDeleteEntryId] = useState<number>();
    const {user} = useAuth();
    const {entries, getEntries, createEntry, deleteEntry} = useEntry();

    useEffect(() => {
        const makeRequest = async () => {
            console.log("MAKE request");
            if (user)
                await getEntries(user.id);
        }

        if (user && entries.length === 0)
            makeRequest().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (!user)
        return <Redirect href="/login" />;

    console.log("PROFILE PAGE");
    return (<>
        <ViewEntryModal onClose={() => setShowEntryModal(undefined)} entry={showEntryModal}/>
        <CreateEntryModal visible={showCreateEntryModal}
                          onClose={() => setShowCreateEntryModal(false)}
                          onSave={(title, feeling, content) => {
                              createEntry(user, title, feeling, content).then(() => {});
                          }}/>
        <DeleteConfirmationModal deleteEntryId={deleteEntryId} onClose={() => setDeleteEntryId(undefined)} deleteEntry={deleteEntry}/>
        <View className="flex-1 px-8 py-4">
            <ScrollView>
                <View className="flex-1 space-y-4">
                    {entries.map(e => <PreviewDiaryEntry key={e.id} entry={e} setDeleteEntryId={setDeleteEntryId} setShowEntryModal={setShowEntryModal}/>)}
                </View>
            </ScrollView>
        <Button icon="add" onPress={() => setShowCreateEntryModal(true)}>Add entry</Button>
        </View>
        </>
    );
}

function PreviewDiaryEntry({entry, setDeleteEntryId, setShowEntryModal}: { entry: iDiaryEntry, setDeleteEntryId: (v?: number) => void, setShowEntryModal: (e: iDiaryEntry) => void}) {
    const [year, , day] = entry.created_at.split("T")[0].split("-");
    const month = new Date(entry.created_at).toLocaleString("en-US", {month: "short"});

    return (<Pressable className="bg-white rounded-2xl p-5 mb-4 flex-row items-center shadow-sm border border-gray-100 text-black" onPress={() => setShowEntryModal(entry)}>
        <View className="items-center justify-center bg-indigo-50 rounded-xl px-4 py-3 mr-4">
            <Text className="text-2xl font-bold text-[#007AFF]">{day}</Text>
            <Text className="text-xs uppercase tracking-wide text-gray-500">{month}</Text>
            <Text className="text-xs text-gray-400">{year}</Text>
        </View>

        <View className="flex-1">
            <Text className="text-3xl font-semibold" numberOfLines={1}>{entry.title}</Text>
            <Feeling entry={entry}/>
        </View>

        <Pressable className="ml-4 p-2" onPress={() => setDeleteEntryId(entry.id)}>
            <Ionicons name="trash-outline" size={22} color="#EF4444"/>
        </Pressable>
    </Pressable>);
}

function DeleteConfirmationModal({deleteEntryId, onClose, deleteEntry}: {deleteEntryId?: number, onClose: () => void, deleteEntry: (eId: number) => void}) {
    return (<Modal visible={deleteEntryId !== undefined} animationType="fade" transparent onRequestClose={onClose}>
        <Pressable className="flex-1 justify-center items-center bg-black/50" onPress={onClose}>
            <Pressable className="bg-white rounded-2xl p-6 w-80" onPress={(e) => e.stopPropagation()}>
                <Text className="text-3xl text-black font-bold mb-2">Delete entry?</Text>

                <View className="flex-row">
                    <Pressable className="flex-1 py-2" onPress={() => {
                        if (deleteEntryId)
                            deleteEntry(deleteEntryId);
                        onClose();
                    }}>
                        <Text className="text-red-500 text-center font-semibold">Delete</Text>
                    </Pressable>
                    <Pressable className="flex-1 py-2" onPress={() => onClose()}><Text className="text-gray-500 text-center">Cancel</Text></Pressable>
                </View>
            </Pressable>
        </Pressable>
    </Modal>);
}
