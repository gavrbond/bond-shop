import React from "react"
import { GoListUnordered } from "react-icons/go"
import { AiOutlineStar } from "react-icons/ai"
import { SlBasket } from "react-icons/sl"
import { LiaSignInAltSolid } from "react-icons/lia"
import styles from "./Icons.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../../supabaseClient"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"
const Icons = () => {
  const navigate = useNavigate()
  const { carts } = useSelector((state) => state.cart)
  const totalCount = carts.reduce((acc, item) => acc + item.quantity, 0)
  const dispatch = useDispatch()
  const signOut = () => {
    supabase.auth.signOut()
    navigate("/")
  }

  return (
    <div className={styles.iconContainer}>
      <Link to={"/orders"}>
        <GoListUnordered className={styles.icon} />
      </Link>
      <Link to={"/favorites"}>
        <AiOutlineStar className={styles.icon} />
      </Link>
      <Link className={styles.basket} to={"/basket"}>
        {totalCount > 0 && <div className={styles.count}>{totalCount}</div>}
        <SlBasket className={styles.icon} />
      </Link>
      <button onClick={signOut}>
        <LiaSignInAltSolid className={styles.icon} />
      </button>
    </div>
  )
}

export default Icons
