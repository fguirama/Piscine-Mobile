import {Pressable, ScrollView, Text, View} from "react-native";
import {iDiaryEntry} from "@/types/diary";
import Feeling from "@/component/Feeling";
import {Ionicons} from "@expo/vector-icons";

export default function Entries({entries, setShowEntryModal}: {entries: iDiaryEntry[], setShowEntryModal: (e: iDiaryEntry) => void}) {
    return (<ScrollView className="">
        <View className="flex-1 space-y-4">
            {
                entries.length > 0 ?
                    entries.map(e => <PreviewDiaryEntry key={e.id} entry={e} setShowEntryModal={setShowEntryModal}/>) :
                    <Text className="pt-6 text-center text-lg italic text-gray-400">No entry</Text>
            }
        </View>
    </ScrollView>);
}

function PreviewDiaryEntry({entry, setShowEntryModal}: { entry: iDiaryEntry, setShowEntryModal: (e: iDiaryEntry) => void}) {
    const [year, , day] = entry.created_at.split("T")[0].split("-");
    const month = new Date(entry.created_at).toLocaleString("en-US", {month: "short"});

    return (<Pressable className="bg-white rounded-2xl p-5 mb-4 flex-row items-center shadow-sm border border-gray-100 text-black" onPress={() => setShowEntryModal(entry)}>
        <View className="items-center justify-center bg-indigo-50 rounded-xl px-4 py-3 mr-4">
            <Text className="text-2xl font-bold text-blue-500">{day}</Text>
            <Text className="text-xs uppercase tracking-wide text-gray-500">{month}</Text>
            <Text className="text-xs text-gray-400">{year}</Text>
        </View>

        <View className="flex-1">
            <Text className="text-3xl font-semibold" numberOfLines={1}>{entry.title}</Text>
            <Feeling entry={entry}/>
        </View>

        <Ionicons name="chevron-forward" size={22} color="gray"/>
    </Pressable>);
}
