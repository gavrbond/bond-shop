import { useEffect } from 'react'
import styles from './Sort.module.scss'
import { TiArrowSortedUp } from 'react-icons/ti'
import { useState } from 'react'
import cn from 'classnames'
import { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { sort } from '../../states/sort'

const list = [
  { name: 'По названию (По возрастанию)', sortProperty: 'title' },
  { name: 'По названию (По убыванию)', sortProperty: '-title' },
]

const Sort = () => {
  const [sorting, setSorting] = useRecoilState(sort)

  const [isClicked, setIsClicked] = useState(false)

  const sortRef = useRef(null)

  useEffect(() => {
    const handleClick = event => {
      const path = event.composedPath()
      if (!path.includes(sortRef.current)) {
        setIsClicked(false)
      }
    }
    document.body.addEventListener('click', handleClick)
    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [sortRef])

  const onClickSort = obj => {
    setSorting(obj)
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
          {sorting.name}
        </button>
        {isClicked && (
          <ul className={isClicked && styles.choose}>
            {list.map((obj, i) => (
              <li
                key={i}
                className={cn(
                  styles.link,
                  sorting.name === obj.name && styles.activeBtn
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
