import React from "react"
import styles from "./CardSlider.module.scss"
import axios from "axios"
import { useState, useEffect } from "react"
import cn from "classnames"
import { MdArrowBackIos } from "react-icons/md"
import { MdArrowForwardIos } from "react-icons/md"
import { addCart } from "../../redux/slices/cartSlice"
import { useDispatch } from "react-redux"
const CardSlider = () => {
  const [items, setItems] = useState([])
  const [indexActive, setIndexActive] = useState(0)
  const dispatch = useDispatch()
  console.log(indexActive)
  const requestData = async () => {
    const res = await axios.get("https://fakestoreapi.com/products?limit=5")
    setItems(res.data)
  }

  const nextSlider = () => {
    setIndexActive((prev) => {
      return indexActive <= items.length - 1 ? prev + 1 : prev
    })
  }
  const prevSlider = () => {
    setIndexActive((prev) => {
      return indexActive >= 0 ? prev - 1 : prev
    })
  }

  useEffect(() => {
    const timeSlider = setTimeout(() => {
      setIndexActive((prev) => prev + 1)
    }, 5000)
    return () => {
      clearTimeout(timeSlider)
    }
  }, [indexActive])

  useEffect(() => {
    if (indexActive >= items.length) {
      setIndexActive(0)
    }
    if (indexActive < 0) {
      setIndexActive(items.length - 1)
    }
  }, [indexActive, items])

  useEffect(() => {
    requestData()
  }, [])

  return (
    <div className={styles.root}>
      <button>
        <MdArrowBackIos className={styles.iconLeft} onClick={prevSlider} />
      </button>

      {items.map((item, i) => (
        <div
          onClick={() => setIndexActive(i)}
          key={item.id}
          className={cn(styles.container, indexActive === i && styles.active)}
        >
          <div className={styles.imgContainer}>
            <img alt='#' src={item.image} />
          </div>

          <div className={styles.content}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.price}>Цена: {item.price}$</div>
          </div>
          <div className={styles.btns}>
            <button className={styles.btnFavorites}>В избранное</button>
            <button
              onClick={() => dispatch(addCart(item))}
              className={styles.btnBasket}
            >
              В корзину
            </button>
          </div>
        </div>
      ))}
      <button>
        <MdArrowForwardIos className={styles.iconRight} onClick={nextSlider} />
      </button>
    </div>
  )
}

export default CardSlider
