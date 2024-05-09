import React from "react"
import styles from "./CardSlider.module.scss"
import axios from "axios"
import { useState, useEffect } from "react"
import cn from "classnames"
import { MdArrowBackIos } from "react-icons/md"
import { MdArrowForwardIos } from "react-icons/md"
import { supabase } from "../../supabaseClient"
import { useCart } from "../../hooks/useCart"
import MyButton from "../MyButton/MyButton"
import Loader from "../Loader/Loader"

const CardSlider = () => {
  const [goods, setGoods] = useState([])
  const [indexActive, setIndexActive] = useState(0)
  // const [addProducts, setAddProducts] = useState([])

  const { isLoading, addItem } = useCart()
  // const sendingItems = useSendingItems()

  // const addCard = (item) => {
  //   setAddProducts((prev) => [...prev, item])
  //   sendingItems(item)
  // }
  const requestData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products?limit=5")
      setGoods(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const nextSlider = () => {
    setIndexActive((prev) => {
      return indexActive <= goods.length - 1 ? prev + 1 : prev
    })
  }
  const prevSlider = () => {
    setIndexActive((prev) => {
      return indexActive >= 0 ? prev - 1 : prev
    })
  }

  useEffect(() => {
    if (indexActive >= goods.length) {
      setIndexActive(0)
    }
    if (indexActive < 0) {
      setIndexActive(goods.length - 1)
    }
  }, [indexActive, goods])

  useEffect(() => {
    requestData()
  }, [])

  // useEffect(() => {
  //   sendingItems(addProducts)
  // }, [addProducts, sendingItems])

  return (
    <div className={styles.root}>
      {isLoading ? (
        <Loader size={400} />
      ) : (
        <>
          <button>
            <MdArrowBackIos className={styles.iconLeft} onClick={prevSlider} />
          </button>

          {goods.map((item, i) => (
            <div
              onClick={() => setIndexActive(i)}
              key={item.id}
              className={cn(
                styles.container,
                indexActive === i && styles.active
              )}
            >
              <div className={styles.imgContainer}>
                <img alt='#' src={item.image} />
              </div>

              <div className={styles.content}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.price}>Цена: {item.price}$</div>
              </div>
              <div className={styles.btns}></div>
              <MyButton
                disabled={isLoading}
                onClick={() => addItem(item)}
                styles={styles.btnBasket}
              >
                В Корзину
              </MyButton>
            </div>
          ))}
          <button>
            <MdArrowForwardIos
              className={styles.iconRight}
              onClick={nextSlider}
            />
          </button>
        </>
      )}
    </div>
  )
}

export default CardSlider
