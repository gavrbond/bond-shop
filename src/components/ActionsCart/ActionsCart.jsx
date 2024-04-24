import React from "react"
import styles from "./Actions.module.scss"
import { IoTrashOutline } from "react-icons/io5"
import { useCart } from "../../hooks/useCart"
const ActionsCart = ({
  clearAllChecked,
  isCheckedAll,
  selectAll,
  isProductSelect,
}) => {
  const { emptyCart } = useCart()
  return (
    <div className={styles.actionsCart}>
      <div className={styles.actionAll}>
        <label className={styles.checkAll}>
          <input type='checkbox' checked={isCheckedAll} onChange={selectAll} />
          Выбрать Все
        </label>
        {!isProductSelect && (
          <label className={styles.deleteAll}>
            {" "}
            <input type='checkbox' onChange={clearAllChecked} />
            Удалить Выбранные
          </label>
        )}
      </div>
      <button onClick={emptyCart}>
        <div className={styles.clear}>
          <IoTrashOutline />
          Очистить козрину
        </div>
      </button>
    </div>
  )
}

export default ActionsCart
