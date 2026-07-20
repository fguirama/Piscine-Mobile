import {Ionicons} from "@expo/vector-icons";
import {Text} from "react-native";

export default function Temperature({temp, units, size="text-2xl", text, color="rgb(0, 122, 255)"}: {temp: number, units: string, text?: string, size?: string, color?: string}) {
  return (<Text className={"font-bold " + size} style={{color: color}}>
      <Ionicons name="thermometer" size={size === "text-2xl" ? 22 : 16}/>{temp}
      {units}
      {text && <Text className="pl-1 text-xs font-normal">{text}</Text>}
  </Text>);
}
