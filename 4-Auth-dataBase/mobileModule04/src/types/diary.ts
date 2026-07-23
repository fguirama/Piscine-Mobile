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

export interface iNewDiaryEntry {
    title: string
    feeling: string
    content: string
}
