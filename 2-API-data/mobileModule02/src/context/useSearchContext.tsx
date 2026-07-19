import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext<any>(null);

export function SearchProvider({children}: {children: React.ReactNode}) {
    const [search, setSearch] = useState("");
    const [searchDisplay, setSearchDisplay] = useState("");
    const [error, setError] = useState(false);

    return (<SearchContext.Provider
            value={{search, setSearch, searchDisplay, setSearchDisplay, error, setError}}>
            {children}
    </SearchContext.Provider>);

}

export function useSearch(){
    return useContext(SearchContext);
}
