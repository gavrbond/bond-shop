import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRecoilValue } from "recoil"
import ActionsCart from "../../components/ActionsCart/ActionsCart"
import Loader from "../../components/Loader/Loader"
import MakeOrders from "../../components/MakeOrders/MakeOrders"
import { Placeholder } from "../../components/Placeholder/Placeholder"
import Product from "../../components/Product/Product"
import { useCart } from "../../hooks/useCart"
import { useSelectedItems } from "../../hooks/useSelectedItems"
import { cartState } from "../../states/cartState"
import { supabase } from "../../supabaseClient"
import styles from "./Cart.module.scss"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const items = useRecoilValue(cartState)
  const { isLoading, emptyCart } = useCart()
  const { checkedItems, clearAllChecked, selectAll, toggleItem } =
    useSelectedItems(items)
  const isCheckedAll = checkedItems.length === items.length
  const isProductSelect = checkedItems.length === 0 || items.length === 0
  const navigate = useNavigate()
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

      emptyCart()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <Loader size='400' />
  }

  if (items.length === 0) {
    return (
      <div className={styles.root}>
        <Placeholder title='Корзина пуста' />
      </div>
    )
  }

  return (
    <div className={styles.root}>
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
              isChecked={checkedItems.some(({ id }) => id === product.id)}
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
    </div>
  )
}
export default Cart
