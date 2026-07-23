import {Redirect, router} from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {makeRedirectUri} from "expo-auth-session";
import {Pressable, Text, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

import {supabase} from "@/lib/supabase";
import {useAuth} from "@/providers/AuthProvider";
import {useState} from "react";
import Loading from "@/component/Loading";

WebBrowser.maybeCompleteAuthSession();
type tProvider = "google" | "github";

export default function Login() {
    const {isAuthenticated, loading} = useAuth();
    const redirectTo = makeRedirectUri({ native: 'diaryapp://' })
    const [errorMsg, setErrorMsg] = useState<string>("test message d'erreur");

    const signIn = async (provider: tProvider) => {
        const {data, error} = await supabase.auth.signInWithOAuth({provider, options: {redirectTo, skipBrowserRedirect: true}});

        if (error) {
            setErrorMsg(error.message);
            return ;
        }

        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo)
        console.log("RES result", result);
        if (result.type === 'success') {
            const url = new URL(result.url)
            const params = new URLSearchParams(url.hash.substring(1))
            const access_token = params.get('access_token')
            const refresh_token = params.get('refresh_token')

            console.log('access_token:', access_token)
            console.log('refresh_token:', refresh_token)

            if (access_token && refresh_token) {
                await supabase.auth.setSession({access_token, refresh_token})
                router.replace('/profile')
            } else
                setErrorMsg("Error when try to get access_token and refresh_token");
        } else
            setErrorMsg("Error on openAuthSessionAsync()");
    }

    if (loading)
        return (<Loading/>)

    if (isAuthenticated)
        return <Redirect href="/profile"/>;

    console.log("Login PAGE");
    return (<View className="flex-1 justify-center px-8">
        <Text className="mb-16 text-5xl font-bold text-gray-900">📖 Diary App</Text>
        <Provider provider="google" signIn={signIn}/>
        <Provider provider="github" signIn={signIn}/>
        {errorMsg && <Text className="text-lg text-center 22text-red-500">{errorMsg}</Text>}
    </View>);
}

function Provider({provider, signIn}: {provider: tProvider, signIn: (p: tProvider) => Promise<void>})  {
    return (<Pressable onPress={() => signIn(provider)}
                       className="mb-5 flex-row items-center justify-center rounded-xl bg-black py-4">
        <FontAwesome name={provider} size={22} color="white"/>
        <Text className="ml-3 text-lg font-semibold text-white">Continue with {provider[0].toUpperCase()}{provider.slice(1)}</Text>
    </Pressable>);
}
