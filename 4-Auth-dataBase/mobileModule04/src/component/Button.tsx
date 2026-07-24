import {Pressable, Text} from "react-native";
import React from "react";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import type { ComponentProps } from "react";
import {tProvider} from "@/types/diary";

type IconName = ComponentProps<typeof Ionicons>["name"];

export default function Button({children, icon, onPress}: {children: React.ReactNode, icon?: IconName | tProvider, onPress: () => void}) {
    return (<Pressable onPress={onPress} className="flex-row items-center justify-center rounded-xl bg-black py-4">
        {icon &&  (icon === "github" || icon === "google") ?
            <FontAwesome color="white" size={22} name={icon} /> :
            <Ionicons color="white" size={22} name={icon}/>}
        <Text className="ml-3 text-lg font-semibold text-white">{children}</Text>
    </Pressable>);
}
