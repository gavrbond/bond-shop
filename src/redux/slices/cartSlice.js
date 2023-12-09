import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  totalPrice: 0,
  carts: [],
}

const cartSlise = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, { payload }) {
      // Задача такова
      // 1.Мы находим в нашем массиве корзины элемент по клику
      // 2.Если он есть проходим по нашему массиву корзины и ищем подходящий элемент
      // 3.Если нашли то возврощаем объект с счетчиком +1 или заданым в параметрах
      let newCarts = [...state.carts]
      const foundItem = newCarts.find((item) => item.id === payload.id)
      if (foundItem) {
        newCarts = newCarts.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item
        })
      } else {
        newCarts.push({ ...payload, quantity: 1 })
      }

      state.carts = newCarts
      state.totalPrice = state.carts.reduce(
        (acc, { price, quantity }) => price * quantity + acc,
        0
      )
    },
    removeCart(state, { payload }) {
      state.carts = state.carts.filter((item) => item.id !== payload)

      state.totalPrice = state.carts.reduce(
        (acc, { price, quantity }) => price * quantity + acc,
        0
      )
    },
    clearCarts(state) {
      state.carts = []
      state.totalPrice = 0
    },
  },
})
export const { addCart, removeCart, clearCarts } = cartSlise.actions
export default cartSlise.reducer
