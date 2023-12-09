import React, { createContext, useState, useEffect } from "react"
export const Items = createContext()

const categories = [
  "All",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
]

export const DataContext = ({ children }) => {
  const [data, setData] = useState([])
  const [categoryActive, setCategoryActive] = useState(0)
  const [selectedSort, setSelectedSort] = useState({
    name: "По названию (По возрастанию)",
    sortProperty: "title",
  })
  useEffect(() => {
    const category =
      categoryActive > 0 ? `category/${categories[categoryActive]}` : ""

    const order = selectedSort.sortProperty.includes("-") ? "desc" : "asc"

    fetch(`https://fakestoreapi.com/products/${category}?&sort=${order}`)
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [categoryActive, selectedSort])
  return (
    <Items.Provider
      value={{
        data,
        categoryActive,
        setCategoryActive,
        selectedSort,
        setSelectedSort,
      }}
    >
      {children}
    </Items.Provider>
  )
}

export default DataContext
