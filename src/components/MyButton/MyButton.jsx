import { useAuth } from '../../AuthContext'

const MyButton = ({ children, styles, onClick }) => {
  const { session } = useAuth()
  return (
    <button disabled={!session?.user} onClick={onClick} className={styles}>
      {children}
    </button>
  )
}

export default MyButton
