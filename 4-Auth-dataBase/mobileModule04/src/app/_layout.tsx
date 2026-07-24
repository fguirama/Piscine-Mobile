import "@/global.css";

import {Stack, Tabs} from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {AuthProvider, useAuth} from "@/providers/AuthProvider";
import {EntryProvider} from "@/providers/EntryProvider";
import {Ionicons} from "@expo/vector-icons";

export default function Layout() {
    console.log("default layout");
    return (<SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-100">
            <AuthProvider>
                <EntryProvider>
                    <Stack screenOptions={{ headerShown: false }}/>
                </EntryProvider>
            </AuthProvider>
        </SafeAreaView>
    </SafeAreaProvider>);
}
