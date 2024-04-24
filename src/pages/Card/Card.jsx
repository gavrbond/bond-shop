import React from "react"
import styles from "./Card.module.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Loader from "../../components/Loader/Loader"
import Buttons from "../../components/Buttons/Buttons"
import { useCart } from "../../hooks/useCart"
const Card = () => {
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const { addItem } = useCart()
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
  }, [id])
  return (
    <>
      <div className={styles.root}>
        <div className={styles.cardContainer}>
          {item ? (
            <>
              <div className={styles.imgContainer}>
                <img alt='#' src={item.image} className={styles.img} />
              </div>
              <div className={styles.description}>
                <div className={styles.title}>
                  <p>Название:</p>
                  {item.title}
                </div>
                <div className={styles.desc}>
                  <p>Описание:</p>
                  {item.description}
                </div>
                <div className={styles.price}>
                  <span>Цена: </span>
                  {item.price}
                </div>
                <div className={styles.category}>
                  <span>Категория: </span>
                  {item.category}
                </div>
                <button
                  onClick={() => addItem(item)}
                  className={styles.btnBasket}
                >
                  В корзину
                </button>
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
