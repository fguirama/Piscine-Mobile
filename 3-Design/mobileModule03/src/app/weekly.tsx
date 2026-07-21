import Page, {tWMOCode} from "@/components/Page";
import {iWeather} from "@/services/weather.service";
import {Text, View, ScrollView} from "react-native";
import Temperature from "@/components/Temperature";
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";

export default function Weekly() {
    const font = useFont(require("../../assets/Roboto.ttf"), 12);

    const Round = ({color, label}: {color: string, label: string}) => {
        return (<View className="flex flex-row items-center gap-1">
            <View className={`w-3 h-3 rounded-full bg-[${color}]`}/>
            <Text className="text-xs">{label}</Text>
    </View>);}

    return (<Page>
        {
            (weather: iWeather, WMOCode: tWMOCode) => {
                console.log(weather.daily);
                const data = weather.daily.time.map((day, index) => ({day, min: weather.daily.temperature_2m_min[index], max: weather.daily.temperature_2m_max[index],}));
                const maxY = Math.max(...data.map(d => d.max));

                return (<View className="w-full">
                    <View className="bg-white rounded-lg mx-2 my-2 p-2">
                    {
                        Platform.OS === 'web' ?
                        <Text className="text-center italic text-gray-400">Graphic not available on web</Text> :
                        <View className="h-full w-[80%]">
                            <CartesianChart data={data} xKey="day" yKeys={["min", "max"]} axisOptions={{font, tickCount: data.length}} domain={{y: [0, maxY + 5]}}>
                                {({ points }) => (<>
                                    <Line points={points.min} color="#007AFF" strokeWidth={3}/>
                                    <Line points={points.max} color="#FFA500" strokeWidth={3}/>
                                </>)}
                            </CartesianChart>
                            <View className="flex flex-row gap-2 px-2 justify-center mb-2">
                                <Round color="#007AFF" label="Temp Min"/>
                                <Round color="#FFA500" label="Temp Max"/>
                            </View>
                        </View>
                        }
                    </View>

                    <ScrollView horizontal={true}>
                    <View className="flex flex-row gap-2 px-2">
                        {
                            weather.daily.time.map((d, i) => (
                                <View key={i} className="items-center bg-white rounded-xl p-3">
                                    <Text>{d}</Text>
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
        }}
    </Page>);
}
