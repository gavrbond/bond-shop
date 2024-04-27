import React, { useEffect, useState, useContext } from "react"
import styles from "./Category.module.scss"
import { Link } from "react-router-dom"
import { SearchInput } from "../../SearchContext"
import Sort from "../../components/Sort/Sort"
import { useRecoilValue } from "recoil"
import { cardsState } from "../../states/cardsState"
import { useCart } from "../../hooks/useCart"
import MyButton from "../../components/MyButton/MyButton"
import Loader from "../../components/Loader/Loader"
const Category = () => {
  const { searchItems } = useContext(SearchInput)
  const items = useRecoilValue(cardsState)
  const { addItem, isLoading } = useCart()
  // const { items } = useSelector((state) => state.data)
  // const { categoryActive } = useSelector((state) => state.filter)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(requestData())
  // }, [dispatch, categoryActive])

  return (
    <div className={styles.categoryContainer}>
      <Sort />
      <div className={styles.root}>
        {isLoading ? (
          <div className={styles.loader}>
            <div className={styles.containerLoader}>
              <Loader size='300' />
            </div>
          </div>
        ) : (
          <>
            {items
              .filter(({ title }) =>
                title.toLowerCase().includes(searchItems.toLowerCase())
              )
              .map(({ id, image, price, title, description, quantity }) => {
                const item = {
                  id,
                  price,
                  title,
                  description,
                  image,
                  quantity,
                }
                return (
                  <div key={id} className={styles.category}>
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
                          <span style={{ color: "black", fontSize: "16px" }}>
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
                      <MyButton className={styles.red}>Категории</MyButton>
                    </div>
                  </div>
                )
              })}
          </>
        )}
      </div>
    </div>
  )
}

export default Category
