import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function Layout() {
    return (<Tabs>
        <Tabs.Screen name="profile" options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" size={size} color={color} />)
        }}/>
        <Tabs.Screen name="calendar" options={{
            title: "Calendrier",
            tabBarIcon: ({ color, size }) => (<Ionicons name="calendar-outline" size={size} color={color}/>)
        }}/>
    </Tabs>);
}
