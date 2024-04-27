import React, { useState } from "react"
import styles from "./SignIn.module.scss"
import { Link } from "react-router-dom"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../supabaseClient"
import Loader from "../../components/Loader/Loader"

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignIn = () => {
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const handleChange = (e) => {
    setUserSignIn((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!EMAIL_REGEX.test(String(userSignIn.email).toLowerCase())) {
      setErrorMessage("Введите корректный email")
    } else if (userSignIn.password.length < 6) {
      setErrorMessage("Пароль не должен быть меньше 6")
    } else {
      try {
        setErrorMessage(null)
        setIsLoading(true)
        const { error } = await supabase.auth.signInWithPassword(userSignIn)
        if (error) {
          setErrorMessage(error.error_description || error.message)
        } else {
          navigate("/")
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.signIn}>
        {isLoading ? (
          <Loader size='300' />
        ) : (
          <>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                placeholder='Введите email'
                className={styles.inputSignIn}
                onChange={handleChange}
                name='email'
                type='email'
              />
              <input
                placeholder='Введите password'
                className={styles.inputSignIn}
                onChange={handleChange}
                name='password'
                type='password'
              />
              <button type='submit' className={styles.btn}>
                Войти
              </button>
              <Link to='/' className={styles.btnClose}>
                <AiOutlineCloseCircle />
              </Link>
              {errorMessage && (
                <div className={styles.error}>{errorMessage}</div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default SignIn
