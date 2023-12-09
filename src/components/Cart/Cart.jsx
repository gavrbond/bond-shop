import React from "react"
import styles from "./Cart.module.scss"
import { AiFillPlusCircle } from "react-icons/ai"
import { AiFillMinusCircle } from "react-icons/ai"
import { addCart, removeCart } from "../../redux/slices/cartSlice"
import { useDispatch } from "react-redux"
import { IoMdClose } from "react-icons/io"

const Cart = ({ id, price, title, description, image, quantity }) => {
  const dispatch = useDispatch()
  const item = {
    id,
    price,
    title,
    description,
    image,
  }
  const addToBasket = (cart, quantity) => {
    dispatch(addCart({ ...cart, quantity }))
  }

  return (
    <div className={styles.basket}>
      <div className={styles.basketContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.img} alt='#' src={image} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <span style={{ color: "red" }}>Название: </span>
            {title}
          </div>
          <div className={styles.desc}>
            <p>Oписание:</p>
            {description}
          </div>
          <div className={styles.infoMoney}>
            <div className={styles.price}>
              <span>Цена: </span>
              {price}$
            </div>
            <div className={styles.count}>
              <button className={styles.iconBtn}>
                <AiFillMinusCircle
                  onClick={() => addToBasket(item, Math.max(1, quantity - 1))}
                  className={styles.icon}
                />
              </button>
              <span style={{ color: "black" }}> Кол-во заказов:</span>{" "}
              {quantity}
              <button className={styles.icon}>
                <AiFillPlusCircle
                  onClick={() => addToBasket(item, quantity + 1)}
                  className={styles.iconBtn}
                />
              </button>
            </div>
            <div className={styles.navigation}>
              <button onClick={() => dispatch(removeCart(id))}>
                {" "}
                <div>
                  <IoMdClose />
                </div>
                Удалить товар
              </button>
            </div>
          </div>
        </div>
        <div className={styles.activeWrapper}> </div>
      </div>
    </div>
  )
}

export default Cart
