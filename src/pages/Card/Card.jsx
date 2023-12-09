import React from "react"
import styles from "./Card.module.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Loader from "../../components/Loader/Loader"
import Buttons from "../../components/Buttons/Buttons"
const Card = () => {
  const [items, setItems] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [id])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.cardContainer}>
          {items ? (
            <>
              <div className={styles.imgContainer}>
                <img alt='#' src={items.image} className={styles.img} />
              </div>
              <div className={styles.description}>
                <div className={styles.title}>
                  <p>Название:</p>
                  {items.title}
                </div>
                <div className={styles.desc}>
                  <p>Описание:</p>
                  {items.description}
                </div>
                <div className={styles.price}>
                  <span>Цена: </span>
                  {items.price}
                </div>
                <div className={styles.category}>
                  <span>Категория: </span>
                  {items.category}
                </div>
                <Buttons
                  btnClass={styles.btn}
                  cardFavoritesBtn={styles.cardFavoritesBtn}
                  cardBasketBtn={styles.cardBasketBtn}
                />
                {/* <div className={styles.btn}>
                  <button className={styles.btnFavorites}>В избранное</button>
                  <button className={styles.btnBasket}>В корзину</button>
                </div> */}
              </div>
            </>
          ) : (
            <div className={styles.loader}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
