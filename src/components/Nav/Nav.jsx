import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.scss'

const categories = [
  'All',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
]

const Nav = () => (
  <nav className={styles.nav}>
    {categories.map(category => (
      <NavLink
        key={category}
        to={`/category/${category}`}
        className={({ isActive }) =>
          cn({ [styles.active]: isActive }, styles.link)
        }
      >
        {category}
      </NavLink>
    ))}
  </nav>
)

export default Nav
