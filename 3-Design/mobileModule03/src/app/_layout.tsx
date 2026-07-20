import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TopBar from "@/components/TopBar";
import {SearchProvider} from "@/context/useSearchContext";
import "@/global.css";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {WeatherProvider} from "@/context/useWeatherContext";
import {ImageBackground} from "expo-image";

export default function Layout() {
    return (<ImageBackground
        source={require("../../assets/background.jpg")}
        className="flex-1 Z-10"
    >
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <WeatherProvider>
                <SearchProvider>
                    <Tabs screenOptions={{
                        header: () => <TopBar />,
                        sceneStyle: {
                            backgroundColor: "transparent",
                        }}}>
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
                </WeatherProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    </ImageBackground>);
}
