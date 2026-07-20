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

    console.log(font);
      const data = [
        { day: "Lun", min: 12, max: 20 },
        { day: "Mar", min: 14, max: 22 },
        { day: "Mer", min: 10, max: 18 },
        { day: "Jeu", min: 11, max: 19 },
        { day: "Ven", min: 13, max: 21 },
        { day: "Sam", min: 15, max: 24 },
        { day: "Dim", min: 14, max: 23 },
      ];
    const maxY = Math.max(...data.map(d => Math.max(d.min, d.max)));

    return (<Page>
        {
            (weather: iWeather, WMOCode: tWMOCode) => {
                return (<View className="w-full">
                    <View className="bg-white rounded-lg mx-2 my-2 p-2">
                    {
                        Platform.OS === 'web' ?
                        <Text className="text-center italic text-gray-400">Graphic not available on web</Text> :
                        <View className="h-32 w-[50%]">
                            <CartesianChart data={data} xKey="day" yKeys={["min", "max"]}
                                      axisOptions={{
                                        font,
                                        tickCount: 6,
                                      }}
                                  domain={{
                                      y: [0, maxY + 5], // petite marge au-dessus
                                    }}>
                                      {({ points }) => (
                                        <>
                                          <Line points={points.min} color="#3b82f6" strokeWidth={3}/>
                                          <Line points={points.max} color="#f97316" strokeWidth={3}/>
                                        </>
                                      )}
                                    </CartesianChart>
                        <View className="flex flex-row gap-2 px-2 justify-center mb-2">
                            <View className="flex flex-row items-center gap-1">
                                <View className="w-3 h-3 rounded-full" style={{backgroundColor: "rgb(0, 122, 255)"}}/>
                                <Text className="text-xs">Temp Min</Text>
                            </View>
                            <View className="flex flex-row items-center gap-1">
                                <View className="w-3 h-3 bg-orange-300 rounded-full"/>
                                <Text className="text-xs">Temp Max</Text>
                            </View>
                        </View>
                        </View>
                        }
                    </View>

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
        }}
    </Page>);
}
