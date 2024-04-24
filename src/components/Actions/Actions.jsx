import React from "react"
import { GoListUnordered } from "react-icons/go"
import { AiOutlineStar } from "react-icons/ai"
import { SlBasket } from "react-icons/sl"
import { LiaSignInAltSolid } from "react-icons/lia"
import styles from "./Actions.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../../supabaseClient"
import { useCart } from "../../hooks/useCart"

const Actions = () => {
  const navigate = useNavigate()
  const { totalCount } = useCart()
  const signOut = () => {
    supabase.auth.signOut()
    navigate("/")
  }
  return (
    <div className={styles.iconContainer}>
      <Link to={"/orders"}>
        <GoListUnordered className={styles.icon} />
      </Link>

      <Link className={styles.basket} to={"/cart"}>
        <div className={styles.count}>{totalCount}</div>
        <SlBasket className={styles.icon} />
      </Link>
      <button onClick={signOut}>
        <LiaSignInAltSolid className={styles.icon} />
      </button>
    </div>
  )
}

export default Actions
