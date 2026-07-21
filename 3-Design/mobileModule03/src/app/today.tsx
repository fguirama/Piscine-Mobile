import Page, {tWMOCode} from "@/components/Page";
import {iWeather} from "@/services/weather.service";
import {Platform, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Wind from "@/components/Wind";
import Temperature from "@/components/Temperature";
import {useFont} from "@shopify/react-native-skia";
import {CartesianChart, Line} from "victory-native";

export default function Today() {
    const font = useFont(require("../../assets/Roboto.ttf"), 12);

    return (<Page>
        {
            (weather: iWeather, WMOCode: tWMOCode) => {
            const data = weather.hourly.time.map((time, index) => ({time, temp: weather.hourly.temperature_2m[index]}));
            const maxY = Math.max(...weather.hourly.temperature_2m);

                return (<View className="w-full">
                <View className="bg-white rounded-xl mx-2 my-2 p-2">
                    {
                        Platform.OS === 'web' ?
                            <Text className="text-center italic text-gray-400">Graphic not available on web</Text> :
                            <View className="h-64 w-[90%] mx-auto my-2">
                                <CartesianChart data={data} xKey="time" yKeys={["temp"]} axisOptions={{font, tickCount: data.length}} domain={{y: [0, maxY + 3]}}>
                                    {({ points }) => (<Line points={points.temp} color="#007AFF" strokeWidth={3}/>)}
                                </CartesianChart>
                            </View>
                    }
                </View>
            <ScrollView horizontal={true}>
                <View className="flex flex-row gap-2 px-2">
                    {
                        weather.hourly.time.map((t, i) => (
                            <View key={i} className="items-center bg-white rounded-xl px-3 py-4">
                                <Text>{t.split("T")[1]}</Text>
                                <Temperature size="text-lg" temp={weather.hourly.temperature_2m[i]} units={weather.hourly_units.temperature_2m}/>
                                <View className="mb-2 mt-1">
                                    {/*@ts-ignore*/}
                                    <Ionicons name={WMOCode[weather.hourly.weather_code[i]].icon} color={WMOCode[weather.hourly.weather_code[i]].color} size={25}/>
                                </View>
                                <Wind size={13} speed={weather.hourly.wind_speed_10m[i]} units={weather.hourly_units}/>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            </View>)
            }}
    </Page>);
}
