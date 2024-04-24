import React from "react"
import styles from "./MakeOrders.module.scss"
import { useCart } from "../../hooks/useCart"
import { SlDiamond } from "react-icons/sl"

const MakeOrders = ({ totalPrice, totalCount, isProductSelect, addOrder }) => {
  return (
    <div className={styles.container}>
      {isProductSelect ? (
        <div className={styles.orderEmpty}>
          <div className={styles.title}> Товары для заказа не выбраны!</div>
          <div className={styles.subTitle}>
            Выбирете товар который хотите заказать.
          </div>
        </div>
      ) : (
        <>
          <div className={styles.containerTittle}>
            <div className={styles.orderTitle}>Моя Корзина</div>
          </div>
          <div className={styles.infoCart}>
            <div className={styles.quantityItem}>
              Кол-во товаров: <span>{totalCount}</span>
            </div>
            <div className={styles.totalPrice}>
              Общая цена: <span>{Math.round(totalPrice)}$</span>
            </div>
          </div>

          <button onClick={addOrder} className={styles.btn}>
            Сделать заказ
          </button>
        </>
      )}
    </div>
  )
}

export default MakeOrders
