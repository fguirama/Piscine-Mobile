import Page from "@/components/Page";
import {iWeather} from "@/services/weather.service";
import {Text, View} from "react-native";

export default function Today() {
    return (<Page>
        {
            (weather: iWeather, WMOCode: Record<number, string>) => (<View className="overflow-auto">
                {
                    weather.hourly.time.map((t, i) => (
                        <Text key={i}>{t}: {weather.hourly.temperature_2m[i]}{weather.hourly_units.temperature_2m}, {WMOCode[weather.hourly.weather_code[i]] ?? "Unknown weather code"}, {weather.hourly.wind_speed_10m[i]}{weather.hourly_units.wind_speed_10m}</Text>
                    ))
                }
            </View>)
        }
    </Page>);
}
