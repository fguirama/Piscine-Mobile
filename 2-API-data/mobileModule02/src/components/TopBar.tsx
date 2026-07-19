import {View, TextInput, Pressable, Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useSearch} from "@/context/useSearchContext";
import * as Location from "expo-location";
import getGeocoding, {iGeocoding} from "@/services/geocoding.service";
import {useState} from "react";
import getWeather from "@/services/weather.service";
import {useWeather} from "@/context/useWeatherContext";

export default function TopBar() {
    const {search, setSearch, setSearchDisplay, setError} = useSearch()
    const {setWeather} = useWeather()
    const [res, setRes] = useState<iGeocoding[]>([]);

    const makeWeatherRequest = async (latitude: number, longitude: number, geocoding?: iGeocoding) => {
        try {
            const requestRes = await getWeather(latitude, longitude);
            console.log(requestRes);
            setSearchDisplay(String(requestRes));
            setWeather([requestRes, geocoding]);
            setError(false);
            setRes([]);
        } catch {
            setSearchDisplay("Error on request weather location");
            setError(true);
        }
        setSearch(geocoding?.name);
    }

    async function getLocation() {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            const location = await Location.getCurrentPositionAsync({});
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
            await makeWeatherRequest(latitude, longitude);
        } else {
            setSearchDisplay("Geolocation is not available, please enable it in your App settings");
            setError(true);
        }
    }

    const handleChangeText = async (text: string) => {
        if (text) {
            try {
                const requestRes = await getGeocoding(text);
                setRes(requestRes.results);
                setError(false);
            } catch {
                setRes([]);
                setSearchDisplay("Error on request geocoding");
                setError(true);
            }
        } else
            setRes([]);
        setSearchDisplay(text);
        setSearch(text);
    }

    return (<View className="space-y-4 px-4 py-3">
        <View className="flex flex-row gap-3">
            <View className="flex-1 flex-row items-center px-3 bg-gray-300 rounded-full">
                <Ionicons name="search" size={25} color="rgb(0, 122, 255)"/>
                <TextInput value={search} onChangeText={handleChangeText} placeholder="Search location..." className="flex-1 px-3 py-2"/>
            </View>

            <Pressable onPress={getLocation} className="p-3 rounded-full">
                <Ionicons name="location" size={25} color="rgb(0, 122, 255)"/>
            </Pressable>
        </View>

        {
            res && res.length > 0 &&
            <View className="w-full bg-white z-10 overflow-y-auto" style={{backgroundColor: "rgb(242, 242, 242)"}}>
                {res.map((item, key) => (
                    <Pressable key={key} className="flex-row border-b border-gray-300 px-2 py-6" onPress={() => makeWeatherRequest(item.latitude, item.longitude, item)}>
                        <Text className="flex-1"><Text className="font-bold">{item.name}</Text> {item.admin1}, {item.country}</Text>
                    </Pressable>
                ))}
            </View>
        }
    </View>);
}
