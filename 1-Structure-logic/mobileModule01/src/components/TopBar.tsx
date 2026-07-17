import { View, TextInput, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useSearch} from "@/context/useSearchContext";
import * as Location from "expo-location";

export default function TopBar() {
    const {search, setSearch, setSearchDisplay} = useSearch()

    async function getLocation() {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            let resultDisplay = "Geolocation";
            const location = await Location.getCurrentPositionAsync({});
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
            const result = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });
            if (result && result.length > 0) {
                resultDisplay += ": " + result[0].city;
            }
            setSearch("");
            setSearchDisplay(resultDisplay);
        }
    }

    const handleChangeText = (text: string) => {
        setSearchDisplay(text);
        setSearch(text);
    }

    return (<View className="flex flex-row gap-3 px-4 py-3">
            <View className="flex-1 flex-row items-center px-3 bg-gray-300 rounded-full">
                <Ionicons name="search" size={25} color="rgb(0, 122, 255)"/>
                <TextInput value={search} onChangeText={handleChangeText} placeholder="Search location..." className="flex-1 px-3 py-2"/>
            </View>

            <Pressable onPress={getLocation} className="p-3 rounded-full">
                <Ionicons name="location" size={25} color="rgb(0, 122, 255)"/>
            </Pressable>
    </View>);
}
