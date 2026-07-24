import {createContext, useContext, useState, ReactNode,} from "react";
import { supabase } from "@/lib/supabase";
import {iDiaryEntry} from "@/types/diary";
import {User} from "@supabase/supabase-js";

type EntryContextType = {
    entries: iDiaryEntry[];
    getEntries: (userId: string) => Promise<void>;
    createEntry: (user: User, title: string, feeling: string, content: string) => Promise<void>;
    deleteEntry: (entryId: number) => Promise<void>;
    errorMsg: string;
    clearEntries: () => void;
};

const EntryContext = createContext<EntryContextType | undefined>(undefined);

export function EntryProvider({children}: {children: ReactNode}) {
    const [entries, setEntries] = useState<iDiaryEntry[]>([]);
    const [errorMsg, setErrorMsg] = useState("");

    const getEntries = async (userId: string) => {
        const { data, error } = await supabase.from("diary_entries").select("*").eq("user_id", userId).order("created_at", { ascending: false });

        if (error) {
            setErrorMsg(error.name);
            return;
        }
        setErrorMsg("");
        setEntries(data);
    };

    const createEntry = async (user: User, title: string, feeling: string, content: string) => {
        const {data, error} = await supabase.from("diary_entries").insert({user_id: user.id, email: user.email, title, feeling, content}).select().single();

        if (error) {
            setErrorMsg(error.name);
            return;
        }
        setErrorMsg("");
        setEntries((prev) => [...prev, data]);
    };

    const deleteEntry = async (entryId: number) => {
        const {error} = await supabase.from("diary_entries").delete().eq("id", entryId);
        if (error) {
            setErrorMsg(error.name);
            return;
        }
        setErrorMsg("");
        setEntries((prev) => prev.filter(e => e.id !== entryId));
    }

    const clearEntries = () => {
        setEntries([]);
    }

    return (<EntryContext.Provider value={{entries, getEntries, createEntry, deleteEntry, errorMsg, clearEntries}}>
        {children}
    </EntryContext.Provider>);
}

export function useEntry() {
    const context = useContext(EntryContext);

    if (!context)
        throw new Error("useEntry must be used inside an EntryProvider");

    return context;
}
