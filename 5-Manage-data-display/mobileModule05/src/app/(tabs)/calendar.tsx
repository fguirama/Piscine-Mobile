import {View} from "react-native";
import {Redirect} from "expo-router";
import {useAuth} from "@/providers/AuthProvider";
import Button from "@/component/Button";

export default function Page() {
    const {user, signOut} = useAuth();

    if (!user)
        return <Redirect href="/login" />;
    return (<View className="flex-1 px-8 py-4">
        <Button icon="log-out-outline" onPress={signOut}>Logout</Button>
    </View>)
}
