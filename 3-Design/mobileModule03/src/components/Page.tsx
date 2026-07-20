import {useSearch} from "@/context/useSearchContext";
import {Text, View} from "react-native";
import {useWeather} from "@/context/useWeatherContext";
import React from "react";
import {iWeather} from "@/services/weather.service";
import {iLocation} from "@/services/geocoding.service";
import {Ionicons} from "@expo/vector-icons";

export default function Page({children}: {children: (weather: iWeather, WMOCode: tWMOCode) => React.ReactNode}) {
    const {searchError, error} = useSearch();
    const {weather: selectedData} = useWeather();

    const content = () => {
        if (error)
            return (<Text className="flex-wrap text-red-500 px-12">{searchError}</Text>);
        else if (!selectedData)
            return (<Text className="flex-wrap px-12">{"No location selected"}</Text>);
        return (<ContentSuccess data={selectedData}>{children}</ContentSuccess>);
    }

    return (<View className="flex-1 justify-center items-center mt-6">
        {content()}
    </View>);
}

export type tWMOCode = Record<number, { name: string; icon: string; color: string }>

function ContentSuccess({children, data}: {children: (weather: iWeather, WMOCode: tWMOCode) => React.ReactNode, data: [iWeather, iLocation | undefined]}) {
    const [weather, loc] = data;
    const WMOCode: tWMOCode = {0:  { name: "Clear sky", icon: "sunny-outline", color: "#FDB813" }, 1:  { name: "Mainly clear", icon: "sunny-outline", color: "#FDB813" }, 2:  { name: "Partly cloudy", icon: "partly-sunny-outline", color: "#8FA8C9" }, 3:  { name: "Overcast", icon: "cloud-outline", color: "#7B8794" }, 45: { name: "Fog", icon: "cloud-outline", color: "#B0BEC5" }, 48: { name: "Depositing rime fog", icon: "snow-outline", color: "#B3E5FC" }, 51: { name: "Light drizzle", icon: "rainy-outline", color: "#64B5F6" }, 53: { name: "Moderate drizzle", icon: "rainy-outline", color: "#42A5F5" }, 55: { name: "Dense drizzle", icon: "rainy-outline", color: "#1E88E5" }, 56: { name: "Light freezing drizzle", icon: "snow-outline", color: "#80DEEA" }, 57: { name: "Dense freezing drizzle", icon: "snow-outline", color: "#26C6DA" }, 61: { name: "Slight rain", icon: "rainy-outline", color: "#64B5F6" }, 63: { name: "Moderate rain", icon: "rainy-outline", color: "#2196F3" }, 65: { name: "Heavy rain", icon: "rainy-outline", color: "#1565C0" }, 66: { name: "Light freezing rain", icon: "snow-outline", color: "#80DEEA" }, 67: { name: "Heavy freezing rain", icon: "snow-outline", color: "#0097A7" }, 71: { name: "Slight snowfall", icon: "snow-outline", color: "#B3E5FC" }, 73: { name: "Moderate snowfall", icon: "snow-outline", color: "#81D4FA" }, 75: { name: "Heavy snowfall", icon: "snow-outline", color: "#29B6F6" }, 77: { name: "Snow grains", icon: "snow-outline", color: "#90CAF9" }, 80: { name: "Slight rain showers", icon: "rainy-outline", color: "#64B5F6" }, 81: { name: "Moderate rain showers", icon: "rainy-outline", color: "#2196F3" }, 82: { name: "Violent rain showers", icon: "rainy-outline", color: "#0D47A1" }, 85: { name: "Slight snow showers", icon: "snow-outline", color: "#81D4FA" }, 86: { name: "Heavy snow showers", icon: "snow-outline", color: "#0288D1" }, 95: { name: "Thunderstorm", icon: "thunderstorm-outline", color: "#7E57C2" }, 96: { name: "Thunderstorm with slight hail", icon: "thunderstorm-outline", color: "#673AB7" }, 99: { name: "Thunderstorm with heavy hail", icon: "thunderstorm-outline", color: "#4527A0" }};

    return (<View className="flex-1 justify-center items-center text-xs">
        <View className="text-lg bg-white py-4 px-6 rounded-2xl">
        {
            loc ?
                <View className="flex flex-col items-center">
                    <Text className="text-xl font-bold"><Text className="text-gray-400"><Ionicons name="business" size={18}/></Text> {loc.city}</Text>
                    <Text className="text-gray-400">{loc.region}, {loc.country}</Text>
                </View> :
                <Text>Error on revert geolocation API</Text>
        }
        </View>
        <View className="flex-1 justify-center items-center">
            {children(weather, WMOCode)}
        </View>
    </View>);
}
