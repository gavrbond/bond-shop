import React, { useEffect } from "react"
import styles from "./Cards.module.scss"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { Items } from "../../DataContext.jsx"
import { SearchInput } from "../../SearchContext.jsx"
import Buttons from "../Buttons/Buttons.jsx"
import { useSelector, useDispatch } from "react-redux"
import { requestData } from "../../redux/slices/dataSlice.js"
import { addCart } from "../../redux/slices/cartSlice.js"
const Cards = () => {
  // const { data } = useContext(Items)
  const { items } = useSelector((state) => state.data)
  const { searchItems } = useContext(SearchInput)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestData())
  }, [dispatch])

  return (
    <div className={styles.root}>
      {items
        .filter(({ title }) => {
          return title.toLowerCase().includes(searchItems.toLowerCase())
        })
        .map((obj) => {
          return (
            <div key={obj.id} className={styles.card}>
              <Link to={`/card/${obj.id}`} className={styles.link}>
                <div className={styles.imgContainer}>
                  <img alt='#' src={obj.image} className={styles.img} />
                </div>
                <div className={styles.title}>{obj.title}</div>
              </Link>

              <div className={styles.description}>
                <div className={styles.price}>
                  <span style={{ color: "white" }}>
                    CТОИМОСТЬ <span style={{ color: "red" }}>${obj.price}</span>
                  </span>
                </div>
                <Buttons
                  onClick={() => dispatch(addCart(obj))}
                  {...obj}
                  cardsBtn={styles.cardsBtn}
                  cardsFav={styles.cardsBtnFavorites}
                  cardsBas={styles.cardsBtnBasket}
                />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Cards
