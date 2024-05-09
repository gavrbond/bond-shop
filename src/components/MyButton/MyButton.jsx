import React from "react"
import cn from "classnames"
import styles from "./MyButton.module.scss"
import { useAuth } from "../../AuthContext"

const MyButton = ({ children, styles, onClick }) => {
  const { session } = useAuth()
  console.log(session)
  return (
    <button disabled={!session} onClick={onClick} className={styles}>
      {children}
    </button>
  )
}

export default MyButton
