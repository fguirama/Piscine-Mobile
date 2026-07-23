import {createContext, useContext, useState, ReactNode,} from "react";
import { supabase } from "@/lib/supabase";
import {iDiaryEntry} from "@/types/diary";
import {User} from "@supabase/supabase-js";

type EntryContextType = {
    entry: iDiaryEntry[];
    CreateEntry: (user: User, title: string, feeling: string, content: string) => Promise<void>;
    DeleteEntry: (entryId: number) => Promise<void>;
};

const EntryContext = createContext<EntryContextType | undefined>(undefined);

export function EntryProvider({children}: {children: ReactNode}) {
    const [entry, setEntry] = useState<iDiaryEntry[]>([]);

    const CreateEntry = async (user: User, title: string, feeling: string, content: string) => {
        const res = await supabase.from("diary_entries").insert({user_id: user.id, email: user.email, title, feeling, content});
        console.log(res);
        const newEntry: iDiaryEntry = {id: 6, user_id: user.id, user_email: user.email, title, feeling, content, entry_date: "test", created_at: "test"};
        setEntry((prev) => [...prev, newEntry]);
    }

    const DeleteEntry = async (entryId: number) => {
        const res = await supabase.from("diary_entries").delete().eq("id", entryId);
        console.log(res);
        setEntry((prev) => prev.filter(e => e.id !== entryId));
    }

    return (<EntryContext.Provider value={{entry, CreateEntry, DeleteEntry}}>
        {children}
    </EntryContext.Provider>);
}

export function useEntry() {
    const context = useContext(EntryContext);

    if (!context)
        throw new Error("useEntry must be used inside an EntryProvider");

    return context;
}
