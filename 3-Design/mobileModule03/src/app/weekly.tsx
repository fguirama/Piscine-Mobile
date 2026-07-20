import Page, {tWMOCode} from "@/components/Page";
import {iWeather} from "@/services/weather.service";
import {Text, View, ScrollView} from "react-native";
import Temperature from "@/components/Temperature";
import {Ionicons} from "@expo/vector-icons";

export default function Weekly() {
    return (<Page>
        {
            (weather: iWeather, WMOCode: tWMOCode) => (<View className="w-full">
                <ScrollView horizontal={true}>
                    <View className="flex flex-row gap-2 px-2">
                        {
                            weather.daily.time.map((d, i) => (
                                <View key={i} className="items-center bg-white rounded-xl p-3">
                                    <Text>{d.split('-')[2]}/{d.split('-')[1]}</Text>
                                    <View className="m-2">
                                        <Ionicons name={WMOCode[weather.daily.weather_code[i]].icon} color={WMOCode[weather.daily.weather_code[i]].color} size={25}/>
                                    </View>
                                    <Temperature size="text-sm" temp={weather.daily.temperature_2m_min[i]} units={weather.daily_units.temperature_2m_min} text="min"/>
                                    <Temperature size="text-sm" temp={weather.daily.temperature_2m_max[i]} units={weather.daily_units.temperature_2m_max} text="max" color="orange"/>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>)
        }
    </Page>);
}
