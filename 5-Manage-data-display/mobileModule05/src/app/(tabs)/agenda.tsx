import {useEntry} from "@/providers/EntryProvider";
import {Calendar} from "react-native-calendars";
import {useState} from "react";
import {Pressable, View} from "react-native";
import dayjs from "dayjs";
import Entries from "@/component/Entries";
import ViewEntryModal from "@/component/ViewEntry";
import {iDiaryEntry} from "@/types/diary";
import {Ionicons} from "@expo/vector-icons";
import CreateEntryModal from "@/component/CreateEntry";
import {useAuth} from "@/providers/AuthProvider";
import {Redirect} from "expo-router";

export default function Agenda() {
    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
    const {user} = useAuth();
    const {entries, deleteEntry, createEntry} = useEntry();
    const filteredEntries = entries.filter((entry) => entry.created_at.split("T")[0] === selectedDate).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const [showEntryModal, setShowEntryModal] = useState<iDiaryEntry>();
    const [showCreateEntryModal, setShowCreateEntryModal] = useState(false);
    const blue = "#3b82f6";
    const markedDates: Record<string, {dots?: {key: string, color: string}[], selected?: boolean}> = {
        [selectedDate]: {selected: true}
    };

    entries.forEach(entry => {
        const d = entry.created_at.split("T")[0];

        if (markedDates[d] === undefined)
            markedDates[d] = {dots: [{key: "entry", color: "gray"}]};
    })

    if (!user)
        return <Redirect href="/login" />;

    return (<View className="flex-1 bg-white px-6 py-4 gap-4">
        <ViewEntryModal onClose={() => setShowEntryModal(undefined)} entry={showEntryModal} deleteEntry={deleteEntry}/>
        <CreateEntryModal visible={showCreateEntryModal}
                          onClose={() => setShowCreateEntryModal(false)}
                          onSave={(title, feeling, content) => {
                              createEntry(user, title, feeling, content).then(() => {});
                          }}/>
        <Calendar theme={{selectedDayBackgroundColor: blue, todayTextColor: blue, arrowColor: blue}} markingType="multi-dot" markedDates={markedDates} maxDate={dayjs().format("YYYY-MM-DD")} current={selectedDate} onDayPress={(day) => setSelectedDate(day.dateString)}/>
        <Entries entries={filteredEntries} setShowEntryModal={setShowEntryModal}/>
        <Pressable onPress={() => setShowCreateEntryModal(true)} className="absolute bottom-8 right-6 w-16 h-16 rounded-full bg-black justify-center items-center shadow-xl">
            <Ionicons name="add" size={30} color="white"/>
        </Pressable>
    </View>);
}
