import * as Location from "expo-location";
import { Alert } from "react-native";


export default async function getLocation(){
    // Demande permission
    const { status } = await Location.requestForegroundPermissionsAsync();


    if(status !== "granted"){

        Alert.alert(
            "Permission refusée",
            "La localisation est nécessaire pour la météo"
        );

        return;

    }

    // Récupère la position
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    console.log(latitude);
    console.log(longitude);
}
