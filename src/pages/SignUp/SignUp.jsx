import styles from "./SignUp.module.scss"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
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
        const { error } = await supabase.auth.signUp(userSignUp)
        if (error) {
          setErrorMessage(error.error_description || error.message)
        } else {
          setSuccessMessage("Регистрация прошла успешно!")
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

  return (
    <div className={styles.root}>
      <div className={styles.signUp}>
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} action=''>
            {inputMapping.map(({ name, placeholder, type }) => (
              <div className={styles.inputDiv}>
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

            {userMessage && <div>{userMessage}</div>}
            <Link to='/' className={styles.btnClose}>
              <AiOutlineCloseCircle />
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}

export default SignUp
