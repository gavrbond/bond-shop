import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryActive: "All",
  sort: {
    name: "По названию (По возрастанию)",
    sortProperty: "title",
  },
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      console.log(state)
      state.categoryActive = action.payload
    },
    setSortPrototype(state, action) {
      state.sort = action.payload
    },
  },
})

export const { setCategory, setSortPrototype } = filterSlice.actions
export default filterSlice.reducer
