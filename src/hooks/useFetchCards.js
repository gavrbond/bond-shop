import { useRecoilState } from "recoil"
import { cardsState } from "../states/cardsState"
import { useRecoilValue } from "recoil"
import { categoryActive } from "../states/categoryActive"
import { sort } from "../states/sort"
import { useEffect, useState } from "react"
import axios from "axios"

export const useFetchCards = () => {
  const [cards, setCards] = useRecoilState(cardsState)
  const categorySelect = useRecoilValue(categoryActive)
  const sortSelect = useRecoilValue(sort)
  const [isLoadingCards, setIsLoadingCards] = useState(false)

  const fetchCards = async () => {
    const category =
      categorySelect !== "All" ? `category/${categorySelect}` : ""
    const order = sortSelect.sortProperty.includes("-") ? "desc" : "asc"
    console.log(order)
    try {
      setIsLoadingCards(true)
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${category}?&sort=${order}`
      )

      setCards(data)
      return data
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingCards(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [categorySelect, sortSelect])

  return { fetchCards, cards, isLoadingCards }
}
