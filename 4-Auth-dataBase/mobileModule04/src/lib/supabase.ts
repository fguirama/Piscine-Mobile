import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
// import ws from "ws"; todo handle

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
}

const options: Parameters<typeof createClient>[2] = {
    auth: {
        storage: Platform.OS === "web" ? undefined : AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: Platform.OS === "web",
    },
};

// if (Platform.OS === "web") {
//     options.realtime = {
//         transport: ws as any,
//     };
// }

export const supabase = createClient(
    supabaseUrl!,
    supabaseAnonKey!,
    options
);
