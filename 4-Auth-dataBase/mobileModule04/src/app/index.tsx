import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import {useAuth} from "@/providers/AuthProvider";

export default function Index() {
    const {loading, isAuthenticated} = useAuth();

    if (loading) {
        return (<View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator size="large" />
        </View>);
    }

    if (isAuthenticated)
        return <Redirect href="/profile" />;

    return <Redirect href="/login" />;
}
