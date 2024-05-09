import React from "react"
import styles from "./Cart.module.scss"
import { useRecoilValue } from "recoil"
import { cartState } from "../../states/cartState"
import MakeOrders from "../../components/MakeOrders/MakeOrders"
import Product from "../../components/Product/Product"
import { useSelectedItems } from "../../hooks/useSelectedItems"
import ActionsCart from "../../components/ActionsCart/ActionsCart"
import { Link } from "react-router-dom"
import { supabase } from "../../supabaseClient"
import { useCart } from "../../hooks/useCart"
import Loader from "../../components/Loader/Loader"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Cart = () => {
  const items = useRecoilValue(cartState)
  const { isLoading, emptyCart } = useCart()
  const { checkedItems, clearAllChecked, selectAll, toggleItem } =
    useSelectedItems(items)
  const isCheckedAll = checkedItems.length === items.length
  const isProductSelect = checkedItems.length === 0 || items.length === 0

  const totalPrice = items.reduce((acc, item) => {
    if (checkedItems.some(({ id }) => id === item.id)) {
      return item.price * item.quantity + acc
    }
    return acc
  }, 0)

  const totalCount = items.reduce((acc, item) => {
    if (checkedItems.some(({ id }) => id === item.id)) {
      return item.quantity + acc
    }
    return acc
  }, 0)

  const addOrder = async () => {
    toast.success("Товар успешно заказан!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    const user = await supabase.auth.getUser()
    const userId = user.data.user.id
    try {
      await supabase.from("Orders").insert([{ userId, products: checkedItems }])
    } catch (error) {
      console.log(error)
    } finally {
      emptyCart()
    }
  }

  // const { totalPrice, emptyCart } = useCart()
  return (
    <div className={styles.root}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader size='400' />
        </div>
      ) : (
        <>
          {!items.length ? (
            <div className={styles.backHome}>
              <div className={styles.titleEmptyCart}>
                Корзина пуста,добавьте товар в корзину!
              </div>
              <Link to={"/"} className={styles.btnHome}>
                Вернуться на главную Страницу
              </Link>
            </div>
          ) : (
            <>
              <ToastContainer />
              <div className={styles.cartContainer}>
                <div className={styles.product}>
                  <ActionsCart
                    isProductSelect={isProductSelect}
                    clearAllChecked={clearAllChecked}
                    isCheckedAll={isCheckedAll}
                    selectAll={selectAll}
                  />
                  {items.map((product) => (
                    <Product
                      key={product.id}
                      {...product}
                      isChecked={checkedItems.some(
                        ({ id }) => id === product.id
                      )}
                      toggleItem={toggleItem}
                    />
                  ))}
                </div>
                <MakeOrders
                  totalPrice={totalPrice}
                  totalCount={totalCount}
                  isProductSelect={isProductSelect}
                  addOrder={addOrder}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
export default Cart
