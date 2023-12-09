import React from "react"
import styles from "./Basket.module.scss"
import { IoTrashOutline } from "react-icons/io5"
import { useSelector, useDispatch } from "react-redux"
import Cart from "../../components/Cart/Cart"
import { clearCarts } from "../../redux/slices/cartSlice"

const Basket = () => {
  const dispatch = useDispatch()
  const { carts, totalPrice } = useSelector((state) => state.cart)
  return (
    <div className={styles.root}>
      <div className={styles.totalPrice}>
        <div className={styles.infoPrice}>
          <span>Общая цена корзины: </span> {Math.round(totalPrice)}$
        </div>
        <button onClick={() => dispatch(clearCarts())}>
          <div className={styles.clear}>
            <IoTrashOutline />
            Очистить козрину
          </div>
        </button>
      </div>
      {carts.map((cart) => (
        <Cart key={cart.id} {...cart} />
      ))}
    </div>
  )
}

export default Basket
