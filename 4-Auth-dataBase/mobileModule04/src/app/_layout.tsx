import "@/global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {AuthProvider} from "@/providers/AuthProvider";

export default function Layout() {
    return (<SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-slate-950">
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="login" />
                    <Stack.Screen name="profile" />
                    <Stack.Screen name="entry/new" />
                    <Stack.Screen name="entry/[id]" />
                </Stack>
            </AuthProvider>
        </SafeAreaView>
    </SafeAreaProvider>);
}
