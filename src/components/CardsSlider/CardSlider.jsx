import React from "react"
import styles from "./CardSlider.module.scss"
import { useState, useEffect } from "react"
import cn from "classnames"
import { MdArrowBackIos } from "react-icons/md"
import { MdArrowForwardIos } from "react-icons/md"
import { useCart } from "../../hooks/useCart"
import MyButton from "../MyButton/MyButton"
import Loader from "../Loader/Loader"
import { useFetchCards } from "../../hooks/useFetchCards"
const CardSlider = () => {
  const [indexActive, setIndexActive] = useState(0)
  const { data, isLoading: isLoadingCards } = useFetchCards(5)
  const { isLoading, addItem } = useCart()

  const nextSlider = () => {
    setIndexActive((prev) => {
      return indexActive <= data?.length - 1 ? prev + 1 : prev
    })
  }
  const prevSlider = () => {
    setIndexActive((prev) => {
      return indexActive >= 0 ? prev - 1 : prev
    })
  }

  useEffect(() => {
    if (indexActive >= data?.length) {
      setIndexActive(0)
    }
    if (indexActive < 0) {
      setIndexActive(data?.length - 1)
    }
  }, [indexActive, data])

  if (isLoadingCards) {
    return <Loader size={400} />
  }
  return (
    <div className={styles.root}>
      {isLoading ? (
        <Loader size={400} />
      ) : (
        <>
          <button>
            <MdArrowBackIos className={styles.iconLeft} onClick={prevSlider} />
          </button>

          {data?.map((item, i) => (
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
