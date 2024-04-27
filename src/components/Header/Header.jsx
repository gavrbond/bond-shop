import { AiOutlineUserAdd } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import Search from "../Search/Search"
import styles from "./Header.module.scss"
import cn from "classnames"
import Nav from "../Nav/Nav"
import { useAuth } from "../../AuthContext"
import Actions from "../Actions/Actions"
import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5"

const Header = () => {
  const { session } = useAuth()
  const [showCategories, setShowCategories] = useState(false)
  const [showInput, setShowInput] = useState(false)

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <Link to='/' className={styles.logo}>
          Gavr
        </Link>
        <div className={styles.adaptive}>
          <div className={styles.searchInAdaptive}>
            <button
              onClick={() => setShowInput(!showInput)}
              className={styles.searchBtn}
            >
              <IoSearchOutline />
            </button>
            {showInput && (
              <div className={styles.searchAdaptive}>
                <Search />
              </div>
            )}
          </div>

          <button
            onClick={() => setShowCategories(!showCategories)}
            className={styles.btnCategory}
          >
            categories
          </button>
          {showCategories && (
            <>
              <div className={styles.wrapperCategory}>
                <Nav />
              </div>
            </>
          )}
        </div>
        <div className={styles.navigationCategories}>
          <Nav />
          <Search className={styles.searchBox} />
        </div>
      </div>
      <div className={cn(styles.actions, session && styles.actionsAuthOrised)}>
        {session ? (
          <Actions />
        ) : (
          <>
            <div className={styles.comunication}>
              <Link to='/signin'>
                <div className={styles.sign}>
                  <BiUserCircle className={styles.icon} />
                  <div className={styles.signTittle}>LogIN</div>
                </div>
              </Link>
              <Link to='/signup'>
                <div className={styles.sign}>
                  <AiOutlineUserAdd className={styles.icon} />

                  <div className={styles.signTittle}>SignUP</div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
