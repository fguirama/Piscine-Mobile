import Page from "@/components/Page";
import {iWeather} from "@/services/weather.service";
import {Text, View} from "react-native";

export default function Weekly() {
    return (<Page>
        {
            (weather: iWeather, WMOCode: Record<number, string>) => (<View className="overflow-auto">
                {
                    weather.daily.time.map((d, i) => (
                        <Text key={i}>{d}: {weather.daily.temperature_2m_min[i]}{weather.daily_units.temperature_2m_min} -&gt; {weather.daily.temperature_2m_max[i]}{weather.daily_units.temperature_2m_max}, {WMOCode[weather.daily.weather_code[i]] ?? "Unknown weather code"}</Text>
                    ))
                }
            </View>)
        }
    </Page>);
}
