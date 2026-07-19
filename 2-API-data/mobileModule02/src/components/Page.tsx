import {useSearch} from "@/context/useSearchContext";
import {Text, View} from "react-native";
import {useWeather} from "@/context/useWeatherContext";
import React, {useEffect} from "react";
import {iWeather} from "@/services/weather.service";
import {iGeocoding} from "@/services/geocoding.service";
import {ScrollView} from "@expo/ui";

export default function Page({children}: {children: (weather: iWeather, WMOCode: Record<number, string>) => React.ReactNode}) {
    const {searchDisplay, error} = useSearch();
    const {weather: selectedData} = useWeather();

    return (<View className="flex-1 justify-center items-center">
        <Text className={"flex-wrap" + (error ? " text-red-500 px-12" : "")}>
            {
                error || !selectedData ?
                    <Text>{searchDisplay}</Text> :
                    <ContentSuccess data={selectedData}>{children}</ContentSuccess>
            }
        </Text>
    </View>);
}

function ContentSuccess({children, data}: {children: (weather: iWeather, WMOCode: Record<number, string>) => React.ReactNode, data: [iWeather, iGeocoding | undefined]}) {
    const [weather, loc] = data;

    const WMOCode: Record<number, string> = {
        0: "Clear sky",

        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Depositing rime fog",

        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",

        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",

        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",

        66: "Light freezing rain",
        67: "Heavy freezing rain",

        71: "Slight snowfall",
        73: "Moderate snowfall",
        75: "Heavy snowfall",

        77: "Snow grains",

        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",

        85: "Slight snow showers",
        86: "Heavy snow showers",

        95: "Thunderstorm",

        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
    };

    return (<View className="flex-1 justify-center items-center text-xs">
        <Text className="flex-1 text-lg"><Text className="font-bold">{loc?.name}</Text> {loc?.admin1}, {loc?.country}</Text>
        <ScrollView>
            {children(weather, WMOCode)}
        </ScrollView>
    </View>);
}
