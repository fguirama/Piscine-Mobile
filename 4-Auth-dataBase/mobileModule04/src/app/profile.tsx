import {Button, Text, View} from "react-native";
import {useAuth} from "@/providers/AuthProvider";

export default function ProfileScreen() {
    const {user, loading, signOut} = useAuth();

    if (loading)
        return <Text>Loading...</Text>;

    return (<View>
        <Text>{user?.email}</Text>
        <Button title="Logout" onPress={signOut}/>
    </View>);
}
