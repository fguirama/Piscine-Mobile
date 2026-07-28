import {Pressable, Text, View} from "react-native";
import {useAuth} from "@/providers/AuthProvider";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useEntry} from "@/providers/EntryProvider";
import {FEELINGS, iDiaryEntry} from "@/types/diary";
import {Redirect} from "expo-router";
import {useEffect, useState} from "react";
import CreateEntryModal from "@/component/CreateEntry";
import Feeling from "@/component/Feeling";
import ViewEntryModal from "@/component/ViewEntry";
import Entries from "@/component/Entries";
import {round} from "mathjs";

export default function Profile() {
    const [showCreateEntryModal, setShowCreateEntryModal] = useState(false);
    const [showEntryModal, setShowEntryModal] = useState<iDiaryEntry>();
    const {user, signOut} = useAuth();
    const {entries, getEntries, createEntry, deleteEntry} = useEntry();

    useEffect(() => {
        const makeRequest = async () => {
            if (user)
                await getEntries(user.id);
        }

        if (user && entries.length === 0)
            makeRequest().then(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (!user)
        return <Redirect href="/login" />;

    return (<View className="flex-1 bg-neutral-50 px-6 gap-4 py-4">
        <ViewEntryModal onClose={() => setShowEntryModal(undefined)} entry={showEntryModal} deleteEntry={deleteEntry}/>
        <CreateEntryModal visible={showCreateEntryModal}
                          onClose={() => setShowCreateEntryModal(false)}
                          onSave={(title, feeling, content) => {
                              createEntry(user, title, feeling, content).then(() => {});
                          }}/>
        <View className="flex-row justify-between items-center">
            <View>
                <Text className="text-neutral-500 text-base">Welcome</Text>
                <Text className="text-3xl font-bold text-black">{user?.user_metadata.name ?? user?.user_metadata.preferred_username}</Text>
            </View>
            <Pressable className="bg-red-500 px-4 py-3 rounded-xl flex flex-row items-center gap-2" onPress={signOut}>
                <Text className="text-white font-semibold">Logout</Text>
                <MaterialIcons name="exit-to-app" size={16} color="white" />
            </Pressable>
        </View>

        <View className="bg-white rounded-3xl p-4 shadow-sm">
            <Text className="text-xl font-bold mb-2">Feelings <Text className="text-gray-500">({entries.length} entr{entries.length > 1 ? "ies" : "y"})</Text></Text>
            {FEELINGS.map((f)=> {
                const percent = entries.length === 0 ? 0 : round(entries.filter((e) => e.feeling === f.value).length / entries.length * 100);

                return (<View key={f.label} className="mb-2">
                    <View className="flex-row justify-between items-center mb-2">
                        <Feeling feeling={f}/>
                        <Text>{percent}%</Text>
                    </View>
                    <View className="h-2 rounded-full bg-gray-200">
                        <View className="h-2 rounded-full bg-blue-500" style={{width: `${percent}%`}}/>
                    </View>
                </View>)
            })}
        </View>
        <Entries entries={entries} setShowEntryModal={setShowEntryModal}/>
        <Pressable onPress={() => setShowCreateEntryModal(true)} className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-black justify-center items-center shadow-xl">
            <Ionicons name="add" size={30} color="white"/>
        </Pressable>
    </View>);
}
