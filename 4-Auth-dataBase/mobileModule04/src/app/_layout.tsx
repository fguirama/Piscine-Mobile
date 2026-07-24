import "@/global.css";

import {Stack} from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {AuthProvider} from "@/providers/AuthProvider";
import {EntryProvider} from "@/providers/EntryProvider";

export default function Layout() {
    return (<SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-100">
            <EntryProvider>
                <AuthProvider>
                    <Stack screenOptions={{ headerShown: false }}/>
                </AuthProvider>
            </EntryProvider>
        </SafeAreaView>
    </SafeAreaProvider>);
}
