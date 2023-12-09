import React from "react"
import { Link, useParams } from "react-router-dom"
import { useContext } from "react"
import { Items } from "../../DataContext"
import styles from "./Nav.module.scss"
import cn from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { setCategory } from "../../redux/slices/filterSlice"
const categories = [
  "All",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
]

const Nav = () => {
  // const { setCategoryActive } = useContext(Items)
  const { categoryActive } = useSelector((state) => state.filter)
  const { category } = useParams()
  const dispatch = useDispatch()
  return (
    <nav className={styles.nav}>
      {categories.map((cat, i) => (
        <Link key={crypto.randomUUID()} to={`/category/${cat}`}>
          <div
            onClick={() => dispatch(setCategory(cat))}
            className={cn(styles.link, cat === category && styles.active)}
          >
            {cat}
          </div>
        </Link>
      ))}
      {/* {items.map((category) => {
        return (
          <Link key={crypto.randomUUID()} to={`/category/${category}`}>
            <div className={styles.link}> {category}</div>
          </Link>
        )
      })} */}

      {/* <div className={styles.link}>electronics</div>
      <div className={styles.link}>jewelery</div>
      <div className={styles.link}>men's clothing</div>
      <div className={styles.link}>women`s clothing</div> */}
    </nav>
  )
}

export default Nav
