import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TopBar from "@/components/TopBar";
import {SearchProvider} from "@/context/useSearchContext";
import "@/global.css";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function Layout() {
    return (<SafeAreaProvider>
        <SafeAreaView className="flex-1">
            <SearchProvider>
                <Tabs screenOptions={{header: () => <TopBar />}}>
                    <Tabs.Screen name="index" options={{
                        title: "Currently",
                        tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color}/>
                    }} />
                    <Tabs.Screen name="today" options={{
                        title: "Today",
                        tabBarIcon: ({ color, size }) => <Ionicons name="today" size={size} color={color} />
                    }} />
                    <Tabs.Screen name="weekly" options={{
                        title: "Weekly",
                        tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />
                    }} />
                </Tabs>
            </SearchProvider>
        </SafeAreaView>
    </SafeAreaProvider>);
}
