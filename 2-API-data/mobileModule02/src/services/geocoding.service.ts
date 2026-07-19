export interface iGeocoding {
    id: number
    name: string
    latitude: number
    longitude: number
    elevation: number
    feature_code: string
    country_code: string
    admin1_id: number
    admin2_id: number
    admin3_id: number
    admin4_id: number
    timezone: string
    population: number
    postcodes: string[]
    country_id: number
    country: string
    admin1: string
    admin2: string
    admin3: string
    admin4: string
}

export default async function getGeocoding(search: string): Promise<{results: iGeocoding[] }> {
    const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${search}`;
    const response = await fetch(
        API_URL,
    );

    const data = await response.json().catch(() => null);
    if (!response.ok)
        throw new Error("API Error");
    return data;
}
