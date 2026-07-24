export const FEELINGS = [
    {
        value: "amazing",
        label: "Amazing",
        bg: "#D1FAE5",
        fg: "#047857"
    },
    {
        value: "happy",
        label: "Happy",
        bg: "#DCFCE7",
        fg: "#15803D"
    },
    {
        value: "neutral",
        label: "Neutral",
        bg: "#F1F5F9",
        fg: "#475569"
    },
    {
        value: "stressed",
        label: "Stressed",
        bg: "#FEF3C7",
        fg: "#B45309"
    },
    {
        value: "sad",
        label: "Sad",
        bg: "#DBEAFE",
        fg: "#1D4ED8"
    },
] as const;

export const defaultFeeling = FEELINGS.find(f => f.value === "neutral") as typeof FEELINGS[number];

export interface iDiaryEntry {
    id: number
    user_id: string
    user_email: string | undefined
    entry_date: string
    title: string
    feeling: string
    content: string
    created_at: string
}

export type tProvider = "google" | "github";
