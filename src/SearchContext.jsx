import { useState, createContext } from "react"
import React from "react"

export const SearchInput = createContext()

export const SearchContext = ({ children }) => {
  const [searchItems, setSearchItems] = useState("")

  return (
    <SearchInput.Provider value={{ searchItems, setSearchItems }}>
      {children}
    </SearchInput.Provider>
  )
}

export default SearchContext
