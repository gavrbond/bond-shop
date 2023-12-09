import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./slices/filterSlice"
import dataReducer from "./slices/dataSlice"
import cartReducer from "./slices/cartSlice"
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    data: dataReducer,
    cart: cartReducer,
  },
})
