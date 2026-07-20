import Page, {tWMOCode} from "@/components/Page";
import {iWeather} from "@/services/weather.service";
import {View, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Wind from "@/components/Wind";
import Temperature from "@/components/Temperature";

export default function Index() {
    return (<Page>
        {
            (weather: iWeather, WMOCode: tWMOCode) => (<View className="space-y-4 bg-white rounded-2xl p-6 items-center">
                <Temperature temp={weather.current.temperature_2m} units={weather.current_units.temperature_2m}/>
                <View className="flex flex-col items-center">
                    <Text className="">{WMOCode[weather.current.weather_code].name ?? "Unknown weather code"}</Text>
                    <Ionicons name={WMOCode[weather.current.weather_code].icon} color={WMOCode[weather.current.weather_code].color} size={50}/>
                </View>
                <Wind speed={weather.current.wind_speed_10m} units={weather.current_units}/>
            </View>)
        }
    </Page>);
}
