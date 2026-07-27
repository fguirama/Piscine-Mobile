import {Redirect, router} from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {makeRedirectUri} from "expo-auth-session";
import {Text, View} from "react-native";

import {supabase} from "@/lib/supabase";
import {useAuth} from "@/providers/AuthProvider";
import {useState} from "react";
import Loading from "@/component/Loading";
import Button from "@/component/Button";
import {tProvider} from "@/types/diary";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const {isAuthenticated, loading} = useAuth();
    const redirectTo = makeRedirectUri({ native: 'diaryapp://' })
    const [errorMsg, setErrorMsg] = useState<string>();

    const signIn = async (provider: tProvider) => {
        try {
            const {data, error} = await supabase.auth.signInWithOAuth({provider, options: {redirectTo, skipBrowserRedirect: true, queryParams: {prompt: 'select_account'}}});

            if (error) {
                setErrorMsg(error.message);
                return ;
            }

            const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo)

            if (result.type === 'success') {
                const url = new URL(result.url)
                const params = new URLSearchParams(url.hash.substring(1))
                const access_token = params.get('access_token')
                const refresh_token = params.get('refresh_token')

                if (access_token && refresh_token) {
                    await supabase.auth.setSession({access_token, refresh_token})
                    router.replace('/profile')
                } else
                    setErrorMsg("Error when try to get access_token and refresh_token");
            } else
                setErrorMsg("Error on openAuthSessionAsync()");
        } catch { }
    }

    if (loading)
        return (<Loading/>)

    if (isAuthenticated)
        return <Redirect href="/profile"/>;

    return (<View className="flex-1 justify-center px-8 gap-8">
        <Text className="mb-8 text-5xl font-bold text-gray-900">📖 Diary App</Text>
        <Provider provider="google" signIn={signIn}/>
        <Provider provider="github" signIn={signIn}/>
        {errorMsg && <Text className="text-lg text-center text-red-500 italic">{errorMsg}</Text>}
    </View>);
}

function Provider({provider, signIn}: {provider: tProvider, signIn: (p: tProvider) => Promise<void>})  {
    return (<Button icon={provider} onPress={() => signIn(provider)}>Continue with {provider[0].toUpperCase()}{provider.slice(1)}</Button>);
}
