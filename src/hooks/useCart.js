import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useRecoilState } from 'recoil'
import { cartState } from '../states/cartState'

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState)
  const [isLoading, setLoading] = useState(false)

  const totalCount = cart.reduce((acc, { quantity }) => quantity + acc, 0)
  const totalPrice = cart.reduce(
    (acc, { price, quantity }) => price * quantity + acc,
    0
  )

  const deleteItem = async id => {
    const user = await supabase.auth.getUser()
    const userId = user.data.user.id

    try {
      await supabase
        .from('Carts')
        .update({ cart: cart.filter(item => item.id !== id) })
        .eq('userId', userId)

      fetchCartData()
    } catch (error) {
      console.log(error)
    }
  }
  const emptyCart = async () => {
    const user = await supabase.auth.getUser()
    const userId = user.data.user.id

    try {
      await supabase.from('Carts').update({ cart: [] }).eq('userId', userId)

      fetchCartData()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const user = await supabase.auth.getUser()
      const userId = user.data.user.id

      const { data, error } = await supabase
        .from('Carts')
        .select('cart')
        .eq('userId', userId)
      if (error) {
        console.error('Ошибка при получении данных:', error.message)
      } else if (data) {
        const items = data[0].cart || []
        setCart(items)
      }
    } catch (error) {
      console.error('Произошла ошибкаааа:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const addItemHandler = item => {
    let cartCopy = [...cart]

    const findItem = cartCopy.some(({ id }) => id === item.id)
    if (findItem) {
      cartCopy = cartCopy.map(product => {
        return product.id === item.id
          ? {
              ...item,
              quantity: item.quantity || product.quantity + 1,
            }
          : product
      })
    } else {
      cartCopy.push({ ...item, quantity: 1 })
    }

    return cartCopy
  }

  const addItem = async item => {
    const user = await supabase.auth.getUser()
    const userId = user.data.user.id

    try {
      await supabase
        .from('Carts')
        .update({ cart: addItemHandler(item) })
        .eq('userId', userId)

      fetchCartData()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCartData()
  }, [])

  return {
    addItem,
    deleteItem,
    totalCount,
    totalPrice,
    emptyCart,
    isLoading,
  }
}
