import React from "react"
import styles from "./Search.module.scss"
import { IoSearchOutline } from "react-icons/io5"
import { IoMdClose } from "react-icons/io"
import { useContext } from "react"
import { SearchInput } from "../../SearchContext"

const Search = () => {
  const { searchItems, setSearchItems } = useContext(SearchInput)
  return (
    <div className={styles.searchContainer}>
      <IoSearchOutline className={styles.iconSearch} />
      <input
        value={searchItems}
        onChange={(event) => setSearchItems(event.target.value)}
        placeholder='Поиск'
        type='text'
        className={styles.search}
      />
      {searchItems && (
        <IoMdClose
          onClick={() => setSearchItems("")}
          className={styles.iconClose}
        />
      )}
    </div>
  )
}

export default Search
