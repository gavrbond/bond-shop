import styles from "./SignUp.module.scss"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Loader from "../../components/Loader/Loader"
import { supabase } from "../../supabaseClient"

const inputMapping = [
  { name: "email", placeholder: "Email", type: "email" },
  { name: "password", placeholder: "Password", type: "password" },
  {
    name: "confirmPassword",
    placeholder: "Confirm password",
    type: "password",
  },
]

const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!re.test(String(userSignUp.email).toLowerCase())) {
      setErrorMessage("Емайл некоретный")
    } else if (userSignUp.password.length < 6) {
      setErrorMessage("Пароль не должен быть  меньше 6 символов")
    } else if (userSignUp.confirmPassword !== userSignUp.password) {
      setErrorMessage("Пароли не совпадают")
    } else {
      try {
        setIsLoading(true)
        const { data, error: signUpError } = await supabase.auth.signUp(
          userSignUp
        )

        if (signUpError) {
          setErrorMessage(signUpError.error_description || signUpError.message)
        } else {
          const userId = data.user.id
          await supabase.from("Carts").insert([{ userId, cart: [] }])
          setSuccessMessage("Регистрация прошла успешно!")
          navigate("/")
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    setUserSignUp((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const userMessage = successMessage || errorMessage
  if (isLoading) {
    return <Loader size={400} />
  }
  return (
    <div className={styles.root}>
      <div className={styles.signUp}>
        <form onSubmit={handleSubmit} className={styles.form} action=''>
          {inputMapping.map(({ name, placeholder, type }) => (
            <div key={name} className={styles.inputDiv}>
              <input
                className={styles.inputForm}
                value={userSignUp[name]}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                type={type}
              />
            </div>
          ))}

          <button type='submit' className={styles.btnSignUp}>
            Зарегистрироваться
          </button>

          {userMessage && <div style={{ color: "red" }}>{userMessage}</div>}
          <Link to='/' className={styles.btnClose}>
            <AiOutlineCloseCircle />
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp
