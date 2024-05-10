import { useEffect, useState } from "react"
import styles from "./Order.module.scss"
import { supabase } from "../../supabaseClient"
import { Link } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import { useRecoilState } from "recoil"
import { ordersState } from "../../states/ordersState"
import { Placeholder } from "../../components/Placeholder/Placeholder"

const Order = () => {
  const [orders, setOrders] = useRecoilState(ordersState)
  const [isLoading, setLoading] = useState(false)

  const fetchDataOrders = async () => {
    const user = await supabase.auth.getUser()
    const userId = user.data.user.id

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("Orders")
        .select("products")
        .eq("userId", userId)
      if (error) {
        console.error("Ошибка при получении данных:", error.message)
      } else if (data) {
        setOrders(data)
      }
    } catch (error) {
      console.error("Произошла ошибка:", error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataOrders()
  }, [])

  if (isLoading) {
    return <Loader size='400' />
  }

  if (orders?.length === 0) {
    return (
      <div className={styles.root}>
        <Placeholder title='Список заказов пуст' />
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {orders?.map(({ products }) => {
        const totalPrice = Math.round(
          products.reduce(
            (acc, { price, quantity }) => price * quantity + acc,
            0
          )
        )

        return (
          <div className={styles.order}>
            <div className={styles.infoOrder}>
              <div className={styles.status}>
                Сатус товара: <span>Получен</span>
              </div>
              <div className={styles.price}>
                Общая цена заказа : <span> {totalPrice}$ </span>
              </div>
            </div>

            {products.map(({ quantity, id, image, title }) => {
              return (
                <Link to={`/card/${id}`} className={styles.link}>
                  <div className={styles.quantity}>
                    Кол-во товаров: <span>{quantity}</span>
                  </div>
                  <div className={styles.imgContainer}>
                    <img src={image} alt='#' />
                  </div>
                  <div className={styles.title}>{title}</div>
                </Link>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Order
