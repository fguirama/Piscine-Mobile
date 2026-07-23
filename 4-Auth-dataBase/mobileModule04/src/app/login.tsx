import {Redirect} from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {makeRedirectUri} from "expo-auth-session";
import {ActivityIndicator, Pressable, Text, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

import {supabase} from "@/lib/supabase";
import {useAuth} from "@/providers/AuthProvider";
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const {isAuthenticated, loading} = useAuth();
    const redirectTo = makeRedirectUri({scheme: "diaryapp"});

    async function signIn(provider: "google" | "github") {
        const {data, error} = await supabase.auth.signInWithOAuth({provider, options: {redirectTo, skipBrowserRedirect: true},});

        if (error) {
            console.error(error.message);
            return;
        }

        console.log("COUCOU", data, redirectTo);
        if (data?.url) {
            const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
            console.log("RES", res);
            if (res.type === "success") {
                const { data, error } = await supabase.auth.getSession();
                console.log("getSession", data, data.session, error);
            }
        }
    }

    if (loading) {
        return (<View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator size="large"/>
        </View>);
    }

    if (isAuthenticated)
        return <Redirect href="/profile"/>;

    const Provider = (provider: "google" | "github") => {
        return (<Pressable onPress={() => signIn(provider)}
                           className="mb-5 flex-row items-center justify-center rounded-xl bg-gray-900 py-4">
            <FontAwesome name={provider} size={22} color="white"/>
            <Text className="ml-3 text-lg font-semibold text-white">Continue with {provider[0].toUpperCase()}{provider.slice(1)}</Text>
        </Pressable>);
    }

    return (<View className="flex-1 justify-center bg-white px-8">
        <Text className="mb-16 text-5xl font-bold text-gray-900">📖 Diary App</Text>
        {Provider("google")}
        {Provider("github")}
    </View>);
}
