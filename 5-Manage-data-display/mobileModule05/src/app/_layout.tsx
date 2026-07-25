import "@/global.css";

import {Stack} from "expo-router";
import {AuthProvider} from "@/providers/AuthProvider";
import {EntryProvider} from "@/providers/EntryProvider";

export default function Layout() {
    return (<EntryProvider>
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}/>
        </AuthProvider>
    </EntryProvider>);
}
