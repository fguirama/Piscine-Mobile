import {Button, Text, View} from "react-native";
import {useAuth} from "@/providers/AuthProvider";

export default function ProfileScreen() {
    const {user, signOut} = useAuth();

    console.log("PROFILE PAGE");
    return (<View className="flex-1 bg-red-500">
        <Text>{user?.email}</Text>
        <Button title="Logout" onPress={signOut}/>
    </View>);
}
