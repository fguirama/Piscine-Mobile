import Page from "@/components/Page";
import {iWeather} from "@/services/weather.service";
import {View, Text} from "react-native";

export default function Index() {
    return (<Page>
        {
            (weather: iWeather, WMOCode: Record<number, string>) => (<View>
                <Text>{weather.current.temperature_2m}{weather.current_units.temperature_2m}</Text>
                <Text>{WMOCode[weather.current.weather_code] ?? "Unknown weather code"}</Text>
                <Text>{weather.current.wind_speed_10m}{weather.current_units.wind_speed_10m}</Text>
            </View>)
        }
    </Page>);
}
