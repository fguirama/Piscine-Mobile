import {createContext, useContext, useEffect, useState, ReactNode,} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const { data: { session } } = await supabase.auth.getSession()
        // console.log('Current session:', session)
        // if (session)
        //     router.replace('/profile') todo check

        const loadSession = async () => {
            const {data: { session }} = await supabase.auth.getSession();

            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        loadSession().then(() => {});

        const {data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {subscription.unsubscribe()};
    }, []);

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();

        if (error)
            console.error(error.message);
    };

    return (<AuthContext.Provider value={{session, user, loading, isAuthenticated: !!session, signOut}}>
        {children}
    </AuthContext.Provider>);
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error("useAuth must be used inside an AuthProvider");

    return context;
}
