import {View, Text} from "react-native";
import WindIcon from "@/components/icon/WindIcon";

export default function Wind({speed, units, size=17}: {speed: number, units: {wind_speed_10m: string}, size?: number}) {
    return (<View className="flex flex-row items-center gap-1">
        <WindIcon size={size}/>
        <Text>{speed}{units.wind_speed_10m}</Text>
    </View>)
}
