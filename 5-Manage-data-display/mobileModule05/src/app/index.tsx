import { Redirect } from "expo-router";
import {useAuth} from "@/providers/AuthProvider";
import Loading from "@/component/Loading";

export default function Index() {
    const {loading, isAuthenticated} = useAuth();

    if (loading)
        return (<Loading/>);

    if (isAuthenticated)
        return <Redirect href="/profile" />;

    return <Redirect href="/login" />;
}
