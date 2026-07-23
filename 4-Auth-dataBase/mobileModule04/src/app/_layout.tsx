import "@/global.css";

import {Stack, Tabs} from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {AuthProvider, useAuth} from "@/providers/AuthProvider";
import {EntryProvider} from "@/providers/EntryProvider";
import {Ionicons} from "@expo/vector-icons";

export default function Layout() {
    return (<SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-100">
            <AuthProvider>
                <EntryProvider>
                    <Tabs>
                        <Tabs.Screen name="profile" options={{
                            title: "Profil",
                            tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" size={size} color={color} />)
                        }}/>
                        <Tabs.Screen name="calendar" options={{
                            title: "Calendrier",
                            tabBarIcon: ({ color, size }) => (<Ionicons name="calendar-outline" size={size} color={color}/>)
                        }}/>
                    </Tabs>
                    {/*<Stack screenOptions={{ headerShown: false }}/>*/}
                </EntryProvider>
            </AuthProvider>
        </SafeAreaView>
    </SafeAreaProvider>);
}
