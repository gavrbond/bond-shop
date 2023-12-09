import React, { useEffect } from "react"
import styles from "./Sort.module.scss"
import { TiArrowSortedUp } from "react-icons/ti"
import { useState } from "react"
import cn from "classnames"
import { useSelector, useDispatch } from "react-redux"
import { setSortPrototype } from "../../redux/slices/filterSlice"
import { requestData } from "../../redux/slices/dataSlice"
import { useRef } from "react"

const list = [
  { name: "По названию (По возрастанию)", sortProperty: "title" },
  { name: "По названию (По убыванию)", sortProperty: "-title" },
]

const Sort = () => {
  const { sort } = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const [isClicked, setIsClicked] = useState(false)

  const sortRef = useRef(null)
  console.log(sortRef)
  useEffect(() => {
    dispatch(requestData())
  }, [dispatch, sort])

  useEffect(() => {
    const handleClick = (event) => {
      const path = event.composedPath()
      if (!path.includes(sortRef.current)) {
        setIsClicked(false)
      }
    }
    document.body.addEventListener("click", handleClick)
    return () => {
      document.body.removeEventListener("click", handleClick)
    }
  }, [sortRef])

  const onClickSort = (obj) => {
    dispatch(setSortPrototype(obj))
    setIsClicked(false)
  }

  return (
    <div ref={sortRef} className={styles.sortContainer}>
      <div className={styles.sort}>
        <TiArrowSortedUp className={isClicked && styles.arrow} />
        <div className={styles.text}>Сортировка по:</div>
        <button
          onClick={() => setIsClicked(!isClicked)}
          className={styles.activeBtn}
        >
          {sort.name}
        </button>
        {isClicked && (
          <ul className={isClicked && styles.choose}>
            {list.map((obj, i) => (
              <li
                key={i}
                className={cn(
                  styles.link,
                  sort.name === obj.name && styles.activeBtn
                )}
                onClick={() => onClickSort(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Sort
