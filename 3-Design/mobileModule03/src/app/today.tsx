import Page, {tWMOCode} from "@/components/Page";
import {iWeather} from "@/services/weather.service";
import {ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Wind from "@/components/Wind";
import Temperature from "@/components/Temperature";

export default function Today() {
    return (<Page>
        {
            (weather: iWeather, WMOCode: tWMOCode) => (<View className="w-full">
                <ScrollView horizontal={true}>
                    <View className="flex flex-row gap-2">
                    {
                        weather.hourly.time.slice(0, 24).map((t, i) => (
                            <View key={i} className="items-center bg-white rounded-xl px-3 py-4">
                                <Text>{t.split("T")[1]}</Text>
                                <Temperature size="text-lg" temp={weather.hourly.temperature_2m[i]} units={weather.hourly_units.temperature_2m}/>
                                <View className="mb-2 mt-1">
                                    <Ionicons name={WMOCode[weather.hourly.weather_code[i]].icon} color={WMOCode[weather.hourly.weather_code[i]].color} size={25}/>
                                </View>
                                <Wind size={13} speed={weather.hourly.wind_speed_10m[i]} units={weather.hourly_units}/>
                            </View>
                        ))
                    }
                    </View>
                </ScrollView>
            </View>)
        }
    </Page>);
}
