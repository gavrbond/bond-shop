import React from "react"
import cn from "classnames"
const MyButton = ({ children, styles, onClick }) => {
  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  )
}

export default MyButton
