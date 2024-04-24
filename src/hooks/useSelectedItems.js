import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { cartState } from "../states/cartState"

export const useSelectedItems = () => {
  const items = useRecoilValue(cartState)
  const [checkedItems, setCheckedItems] = useState(items)

  useEffect(() => {
    setCheckedItems((prev) => {
      return prev.map((item) => {
        const findItem = items.find((product) => product.id === item.id)
        return findItem ? findItem : item
      })
    })
  }, [items])

  const clearAllChecked = () => {
    setCheckedItems([])
  }

  const selectAll = () => {
    setCheckedItems(items)
  }

  const toggleItem = (item) => {
    if (checkedItems.some(({ id }) => id === item.id)) {
      setCheckedItems((prev) => {
        return prev.filter(({ id }) => id !== item.id)
      })
    } else {
      setCheckedItems((prev) => {
        return [...prev, item]
      })
    }
  }

  return {
    checkedItems,
    clearAllChecked,
    selectAll,
    toggleItem,
  }
}
