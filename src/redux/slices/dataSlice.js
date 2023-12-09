import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  items: [],
  status: "",
}

export const requestData = createAsyncThunk(
  "data/requestDataStatus",
  async (_, { dispatch, rejectWithValue, getState }) => {
    const { sort, categoryActive } = getState().filter

    const category =
      categoryActive !== "All" ? `category/${categoryActive}` : ""

    const order = sort.sortProperty.includes("-") ? "desc" : "asc"

    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${category}?&sort=${order}`
      )

      dispatch(setItems(data))
      return data
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [requestData.pending]: (state) => {
      state.status = "loading"
      state.items = []
    },
    [requestData.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = "resolved"
    },
    [requestData.rejected]: (state) => {
      state.items = []
      state.status = "rejected"
    },
  },
})
export const { setItems } = dataSlice.actions
export default dataSlice.reducer
