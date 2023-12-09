import React, { useEffect } from "react"
import styles from "./Category.module.scss"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { SearchInput } from "../../SearchContext"
import Buttons from "../../components/Buttons/Buttons"
import Sort from "../../components/Sort/Sort"
import { requestData } from "../../redux/slices/dataSlice"
import { useSelector, useDispatch } from "react-redux"
import { addCart } from "../../redux/slices/cartSlice"

const Category = () => {
  const { searchItems } = useContext(SearchInput)
  const { items } = useSelector((state) => state.data)
  const { categoryActive } = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestData())
  }, [dispatch, categoryActive])

  return (
    <div className={styles.categoryContainer}>
      <Sort />
      <div className={styles.root}>
        {items
          .filter(({ title }) =>
            title.toLowerCase().includes(searchItems.toLowerCase())
          )
          .map(({ id, image, price, title }) => {
            return (
              <div key={id} className={styles.category}>
                <Link to={`/card/${id}`} className={styles.link}>
                  <div className={styles.imgContainer}>
                    <img alt='#' src={image} className={styles.img} />
                  </div>
                  <div className={styles.title}>{title}</div>
                </Link>

                <div className={styles.description}>
                  <div className={styles.price}>
                    <span style={{ color: "white", fontSize: "16px" }}>
                      Цена:{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>
                        ${price}
                      </span>
                    </span>
                  </div>
                  <Buttons />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Category
