import { useContext } from "react"
import { Link } from "react-router-dom"
import { SearchInput } from "../../SearchContext"
import Loader from "../../components/Loader/Loader"
import MyButton from "../../components/MyButton/MyButton"
import Sort from "../../components/Sort/Sort"
import { useCart } from "../../hooks/useCart"
import { useFetchCards } from "../../hooks/useFetchCards"
import styles from "./Category.module.scss"
import { Placeholder } from "../../components/Placeholder/Placeholder"

const Category = () => {
  const { searchItems } = useContext(SearchInput)
  const { isLoading: isFetchCardsLoading, data } = useFetchCards()
  const { addItem, isLoading: isCartLoading } = useCart()

  const filteredData = data?.filter(({ title }) =>
    title.toLowerCase().includes(searchItems.toLowerCase())
  )

  if (isFetchCardsLoading || isCartLoading) {
    return (
      <div className={styles.root}>
        <Loader size={400} />
      </div>
    )
  }

  // Сделать Плейсхолдер
  if (filteredData.length === 0) {
    return <Placeholder title='Ничего не найдено' />
  }

  return (
    <div className={styles.root}>
      <Sort />
      {filteredData.length > 0 && (
        <div className={styles.container}>
          {filteredData?.map((item) => {
            const { id, price, title, image } = item

            return (
              <div key={id} className={styles.categoryItem}>
                <Link to={`/card/${id}`} className={styles.link}>
                  <div className={styles.imgContainer}>
                    <img alt='#' src={image} className={styles.img} />
                  </div>
                  <div className={styles.title}>{title}</div>
                </Link>

                <div className={styles.description}>
                  <div className={styles.price}>
                    <span style={{ color: "white", fontSize: "16px" }}>
                      Цена:{" "}
                      <span style={{ color: "white", fontSize: "16px" }}>
                        ${price}
                      </span>
                    </span>
                  </div>
                  <MyButton
                    onClick={() => addItem(item)}
                    styles={styles.btnBasket}
                  >
                    {" "}
                    В корзину{" "}
                  </MyButton>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Category
