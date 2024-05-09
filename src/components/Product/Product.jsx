import { useEffect } from 'react'
import styles from './Product.module.scss'
import { AiFillPlusCircle } from 'react-icons/ai'
import { AiFillMinusCircle } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { useCart } from '../../hooks/useCart'
import { useSelectedItems } from '../../hooks/useSelectedItems'

const Product = ({
  id,
  price,
  title,
  description,
  image,
  quantity,
  isChecked,
  toggleItem,
}) => {
  const { deleteItem, addItem, isLoading } = useCart()

  const item = {
    id,
    price,
    title,
    description,
    image,
    quantity,
  }

  const { selectAll } = useSelectedItems(item)
  useEffect(() => {
    selectAll(item)
  }, [])

  if (isLoading) {
    return <h1>Loader</h1>
  }

  return (
    <div className={styles.basket}>
      <input
        className={styles.checkBox}
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleItem(item)}
      />

      <div className={styles.basketContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.img} alt="#" src={image} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <span style={{ color: 'white' }}>Название: </span>
            {title}
          </div>
          <div className={styles.desc}>
            <p>Oписание:</p>
            {description}
          </div>
          <div className={styles.infoMoney}>
            <div className={styles.price}>
              <span>Цена: </span>
              {price}$
            </div>
            <div className={styles.count}>
              <button
                disabled={quantity === 1}
                className={styles.iconMinus}
                onClick={() =>
                  addItem({ ...item, quantity: Math.max(1, quantity - 1) })
                }
              >
                <AiFillMinusCircle />
              </button>
              <div className={styles.counter}>{quantity}</div>
              <button
                className={styles.icon}
                onClick={() => addItem({ ...item, quantity: quantity + 1 })}
              >
                <AiFillPlusCircle />
              </button>
            </div>
            <div className={styles.navigation}>
              <button onClick={() => deleteItem(item.id)}>
                {' '}
                <div>
                  <IoMdClose />
                </div>
                Удалить товар
              </button>
            </div>
          </div>
        </div>
        <div className={styles.activeWrapper}> </div>
      </div>
    </div>
  )
}

export default Product
