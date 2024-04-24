import React from "react"
import { Link, useParams } from "react-router-dom"
import { useContext } from "react"
import styles from "./Nav.module.scss"
import cn from "classnames"
import { useSetRecoilState } from "recoil"
import { categoryActive } from "../../states/categoryActive"
import { useFetchCards } from "../../hooks/useFetchCards"
const categories = [
  "All",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
]

const Nav = () => {
  const setCategory = useSetRecoilState(categoryActive)
  // const { setCategoryActive } = useContext(Items)
  const { category } = useParams()

  // const dispatch = useDispatch()
  return (
    <nav className={styles.nav}>
      {categories.map((cat, i) => (
        <Link key={crypto.randomUUID()} to={`/category/${cat}`}>
          <div
            onClick={() => setCategory(cat)}
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
