import React from "react"
import styles from "./Buttons.module.scss"
import { useAuth } from "../../AuthContext"
import { Link } from "react-router-dom"
import cn from "classnames"
import { useSelector } from "react-redux"
const Buttons = ({
  btnClass,
  cardBasketBtn,
  cardFavoritesBtn,
  cardsFav,
  cardsBas,
  cardsBtn,
  onClick,
}) => {
  const item = useSelector(({ cart }) => cart.carts)
  const { session } = useAuth()
  return (
    <div className={cn(styles.buttons, btnClass, cardsBtn)}>
      <Link to='/favorites'>
        <button
          disabled={!session}
          className={cn(styles.btnFavorites, cardsFav, cardFavoritesBtn)}
        >
          В избранное
        </button>
      </Link>

      <button
        onClick={onClick}
        disabled={!session}
        className={cn(styles.btnBasket, cardBasketBtn, cardsBas)}
      >
        В корзину
      </button>
    </div>
  )
}

export default Buttons
