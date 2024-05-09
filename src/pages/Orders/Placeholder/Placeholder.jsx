import styles from './index.module.scss'
import { Link } from 'react-router-dom'

export const Placeholder = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>Заказов нету,Сделайте заказ.</div>
      <Link to="/" className={styles.link}>
        Вернуться на главную Страницу
      </Link>
    </div>
  )
}
