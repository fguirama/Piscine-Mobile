import {Text, View} from "react-native";
import {defaultFeeling, FEELINGS, iDiaryEntry} from "@/types/diary";

export default function Feeling({entry, feeling}: {entry?: iDiaryEntry, feeling?: typeof FEELINGS[number]}) {
    if (!entry && !feeling)
        return null;
    // @ts-ignore
    const feel = feeling ?? FEELINGS.find(f => entry.feeling === f.value) ?? defaultFeeling;
    return (<View className="self-start mt-2 rounded-full px-3 py-1" style={{backgroundColor: feel.bg}}>
        <Text className="text-sm capitalize" style={{color: feel.fg}}>{feel.label}</Text>
    </View>);
}
