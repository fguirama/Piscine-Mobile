import React, { createContext, useContext, useState } from "react";
import {iGeocoding} from "@/services/geocoding.service";
import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";

const WeatherContext = createContext<any>(null);

export function WeatherProvider({children}: {children: React.ReactNode}) {
    const [weather, setWeather] = useState<[WeatherApiResponse, iGeocoding | undefined]>();

    return (<WeatherContext.Provider
            value={{weather, setWeather}}>
            {children}
    </WeatherContext.Provider>);

}

export function useWeather(){
    return useContext(WeatherContext);
}
