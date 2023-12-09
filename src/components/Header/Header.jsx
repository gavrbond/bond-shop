import { AiOutlineUserAdd } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import Icons from "../Icons/Icons"
import Search from "../Search/Search"
import styles from "./Header.module.scss"
import cn from "classnames"
import Nav from "../Nav/Nav"
import { useAuth } from "../../AuthContext"

const Header = () => {
  const { session } = useAuth()

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <Link to='/' className={styles.logo}>
          Gavr
        </Link>
        {/* <Link to='/' className={styles.logo}>
          Gavr
        </Link> */}
        <Nav />
        <Search />
      </div>

      <div className={cn(styles.actions, session && styles.actionsAuthOrised)}>
        {session ? (
          <Icons />
        ) : (
          <>
            <Link to='/signup'>
              <AiOutlineUserAdd className={styles.icon} />
            </Link>
            <Link to='/signin'>
              <BiUserCircle className={styles.icon} />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
