import {View, TextInput, Pressable, Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useSearch} from "@/context/useSearchContext";
import * as Location from "expo-location";
import getGeocoding, {getReverseGeocoding, iLocation, iGeocoding} from "@/services/geocoding.service";
import {useEffect, useState} from "react";
import getWeather from "@/services/weather.service";
import {useWeather} from "@/context/useWeatherContext";

export default function TopBar() {
    const {search, setSearch, setSearchError, setError} = useSearch()
    const {weather, setWeather} = useWeather()
    const [res, setRes] = useState<iGeocoding[]>([]);

    const makeWeatherRequest = async (latitude: number, longitude: number, location: iLocation) => {
        try {
            const requestRes = await getWeather(latitude, longitude);
            setWeather([requestRes, location]);
            setError(false);
            setRes([]);
        } catch {
            setSearchError("Error on request weather");
            setError(true);
        }
    }

    async function getLocation() {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            const location = await Location.getCurrentPositionAsync({});
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;

            try {
                const reverseGeocode = await getReverseGeocoding(latitude, longitude);
                const region = reverseGeocode.address.state || reverseGeocode.address.region || reverseGeocode.address["ISO3166-2-lvl4"];
                await makeWeatherRequest(latitude, longitude, {city: reverseGeocode.address.city, region: region, country: reverseGeocode.address.country});
            } catch {
                setSearchError("Error on request reverse geolocation");
                setError(true);
            }
        } else {
            setSearchError("Geolocation is not available, please enable it in your App settings");
            setError(true);
        }
    }

    const handleChangeText = async (text: string) => {
        setSearch(text);
        setWeather(undefined);
    }

    useEffect(() => {
        const makeRequest  = async () => {
            if (search && search.length > 1) {
                try {
                    const requestRes = await getGeocoding(search);
                    if (requestRes.results)
                        setError(false);
                    else {
                        setError(true);
                        setSearchError("No results found");
                    }
                    setRes(requestRes.results ?? []);
                } catch {
                    setRes([]);
                    setSearchError("Error on request geocoding");
                    setError(true);
                }
            } else
                setRes([]);
            setWeather(undefined);
        }

        if (!weather)
            makeRequest().then(() => {});
    }, [search]);

    return (<View className="relative space-y-4 px-4 py-3">
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
            <View className="absolute top-full w-full bg-white z-10" style={{backgroundColor: "rgb(242, 242, 242)"}}>
                {res.map((item, key) => (
                    <Pressable key={key} className="flex-row border-b border-gray-300 px-2 py-6" onPress={() => makeWeatherRequest(item.latitude, item.longitude, {city: item.name, region: item.admin1, country: item.country})}>
                        <Text className="flex-1"><Text className="font-bold">{item.name}</Text> {item.admin1}, {item.country}</Text>
                    </Pressable>
                ))}
            </View>
        }
    </View>);
}
