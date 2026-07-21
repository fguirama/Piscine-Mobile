import {View, TextInput, Pressable, Text, Dimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useSearch} from "@/context/useSearchContext";
import * as Location from "expo-location";
import getGeocoding, {getReverseGeocoding, iLocation, iGeocoding} from "@/services/geocoding.service";
import getWeather from "@/services/weather.service";
import {useWeather} from "@/context/useWeatherContext";
import {useEffect, useRef} from "react";

export default function TopBar() {
    const {search, setSearch, setSearchError, setError, searchResult, setSearchResult} = useSearch();
    const {setWeather} = useWeather();
    const iptRef = useRef<TextInput>(null);
    const { width, height } = Dimensions.get("window");

    const makeWeatherRequest = async (latitude: number, longitude: number, location: iLocation) => {
        setSearchResult(undefined);
        try {
            let requestRes = await getWeather(latitude, longitude);
            for (let i = 0; i < requestRes.daily.time.length; i++)
                requestRes.daily.time[i] = `${requestRes.daily.time[i].split('-')[2]}/${requestRes.daily.time[i].split('-')[1]}`;
            setWeather([requestRes, location]);
            setError(false);
        } catch {
            setSearchError("Error on request weather");
            setError(true);
        }
    }

    async function getLocation() {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            try {
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
            } catch {
                setSearchError("Location is not available");
                setError(true);
                return;
            }


        } else {
            setSearchError("Geolocation is not available, please enable it in your App settings");
            setError(true);
        }
    }

    const handleChangeText = async (text: string) => {
        setSearch(text);
        setError(false);
        if (text.length > 1) {
            try {
                const requestRes = await getGeocoding(text);
                setError(false);
                setSearchResult(requestRes.results?.slice(0, 5) ?? []);
            } catch {
                setSearchResult(undefined);
                setSearchError("Error on request geocoding");
                setError(true);
            }
        } else
            setSearchResult(undefined);
    }

    useEffect(() => {
        getLocation().then(() => {});
    }, []);

    return (<View className="space-y-4 px-4 py-3">
        <View className="flex flex-row gap-3">
            <Pressable className="flex-1 flex-row items-center px-3 bg-white rounded-full" onPress={() => {
                if (!searchResult) {
                    iptRef.current?.focus()
                    handleChangeText(search).then(() => {});
                }
            }}>
                <Ionicons name="search" size={25} color="rgb(0, 122, 255)"/>
                <TextInput ref={iptRef} value={search} onChangeText={handleChangeText} placeholder="Search location" className="flex-1 px-3 py-2 focus:outline-none"/>
            </Pressable>

            <Pressable onPress={getLocation} className="p-3 rounded-full bg-white">
                <Ionicons name="location" size={25} color="rgb(0, 122, 255)"/>
            </Pressable>
        </View>

        {
            searchResult && (<Pressable className="absolute inset-0 top-14 bg-black/20" onPress={() => setSearchResult(undefined)} style={{
                width,
                height,
            }}>
                <View className="relative top-0 w-full bg-white z-10 " style={{backgroundColor: "rgb(242, 242, 242)", boxShadow: "0px 6px 6px rgba(0,0,0,0.2)"}}>
                {
                    searchResult.length > 0 ?
                        searchResult.map((item: iGeocoding, key: number) => (
                            <Pressable key={key} className={"flex-row px-8 py-6 mx-4" + (key === searchResult.length - 1 ? "" : " border-b border-gray-300")} onPress={() => makeWeatherRequest(item.latitude, item.longitude, {city: item.name, region: item.admin1, country: item.country})}>
                                <Text className="flex-1 text-gray-400"><Ionicons name="business" size={18}/><Text className="ml-4 mr-2 text-base font-bold text-black">{item.name}</Text>{item.admin1}, {item.country}</Text>
                            </Pressable>
                        )) :
                        <Text className="text-center py-6 text-gray-400 italic">No results found.</Text>
                }
                </View>
            </Pressable>)
        }
    </View>);
}
