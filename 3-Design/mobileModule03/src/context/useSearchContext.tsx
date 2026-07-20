import React, { createContext, useContext, useState } from "react";
import {iGeocoding} from "@/services/geocoding.service";

const SearchContext = createContext<any>(null);

export function SearchProvider({children}: {children: React.ReactNode}) {
    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState("");
    const [error, setError] = useState(false);
    const [searchResult, setSearchResult] = useState<iGeocoding[]>();

    return (<SearchContext.Provider
            value={{search, setSearch, searchError, setSearchError, error, setError, searchResult, setSearchResult}}>
            {children}
    </SearchContext.Provider>);

}

export function useSearch(){
    return useContext(SearchContext);
}
