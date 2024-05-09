import styles from './index.module.scss'
import { Link } from 'react-router-dom'

export const Placeholder = ({ title }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <Link to="/" className={styles.link}>
        Вернуться на главную Страницу
      </Link>
    </div>
  )
}
