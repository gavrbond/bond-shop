import { useAuth } from "../../AuthContext"
import styles from "./MyButton.module.scss"
import cn from "classnames"
const MyButton = ({ children, styleBtn, onClick }) => {
  const { session } = useAuth()
  return (
    <button
      disabled={!session?.user}
      onClick={onClick}
      className={cn(styles.btn, styleBtn)}
    >
      {children}
    </button>
  )
}

export default MyButton
