export interface iWeather {
    latitude: number
    longitude: number
    elevation: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    current: {
        time: string
        interval: number
        temperature_2m: number
        wind_speed_10m: number
        weather_code: number
    }
    hourly: {
        time: string[]
        temperature_2m: number[]
        wind_speed_10m: number[]
        weather_code: number[]
    }
    daily: {
        time: string[]
        temperature_2m_min: number[]
        temperature_2m_max: number[]
        weather_code: number[]
    }
    current_units: {
        time: string
        interval: string
        temperature_2m: string
        wind_speed_10m: string
        weather_code: string
    }
    hourly_units: {
        time: string
        temperature_2m: string
        wind_speed_10m: string
        weather_code: string
    }
    daily_units: {
        time: string
        temperature_2m_min: string
        temperature_2m_max: string
        weather_code: string
    }
}

export default async function getWeather(latitude: number, longitude: number): Promise<iWeather> {
    const current = "temperature_2m%2Cwind_speed_10m%2Cweather_code";
    const hourly = "temperature_2m%2Cweather_code%2Cwind_speed_10m";
    const daily = "temperature_2m_min%2Ctemperature_2m_max%2Cweather_code";
    const param = `latitude=${latitude}&longitude=${longitude}&daily=${daily}&hourly=${hourly}&current=${current}`;
    const API_URL = `https://api.open-meteo.com/v1/forecast?${param}`;
    const response = await fetch(API_URL);

    const data = await response.json().catch(() => null);
    if (!response.ok)
        throw new Error("API Error");
    return data;
}
