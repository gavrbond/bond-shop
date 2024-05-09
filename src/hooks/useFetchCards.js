import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { sort } from '../states/sort'

const fetchCards = async url => {
  const fetchedData = await fetch(url)
  const data = await fetchedData.json()
  return data
}

export const useFetchCards = () => {
  const sortSelect = useRecoilValue(sort)

  const { category } = useParams()

  const targetCategory = category !== 'All' ? `category/${category}` : ''

  const order = sortSelect.sortProperty.includes('-') ? 'desc' : 'asc'

  const url = `https://fakestoreapi.com/products/${targetCategory}?&sort=${order}`

  const { data, isLoading } = useQuery({
    queryKey: ['cards', category, sortSelect],
    queryFn: () => fetchCards(url),
  })

  return { data, isLoading }
}
