import { useEffect } from "react"
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom"

const ProductPage = () => {
  const { session } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (session) {
      navigate("/signup")
    }
  }, [session, navigate])

  return <>{session ? <div>ProductPage</div> : <div>Залогиньтесь</div>}</>
}

export default ProductPage
