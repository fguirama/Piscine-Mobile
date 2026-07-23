import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {iUser} from "@/types/user";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        loadSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error(error.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                user,
                loading,
                isAuthenticated: !!session,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }

    return context;
}



export async function logout() {
    await supabase.auth.signOut();
}

export async function CreateEntry(user: iUser, title: string, feeling: string, content: string) {
    await supabase.from("diary_entries").insert({
        user_id: user.id,
        email: user.email,
        title,
        feeling,
        content,
    });
}

export async function DeleteEntry(entryId: number) {
    await supabase
        .from("diary_entries")
        .delete()
        .eq("id", entryId);
}
