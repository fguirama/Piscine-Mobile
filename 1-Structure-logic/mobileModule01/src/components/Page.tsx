import {useSearch} from "@/context/useSearchContext";
import {Text, View} from "react-native";

export default function Page({name}: {name: string}) {
    const {searchDisplay} = useSearch();

    return (<View className="flex-1 justify-center items-center">
        <Text className="font-bold text-xl flex-wrap">{name} {searchDisplay}</Text>
    </View>);
}
