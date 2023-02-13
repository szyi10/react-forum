import React, { useState, useRef, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AuthContext from "../../context/auth-context"
import { fetchUser } from "../../lib/auth"

import classes from "./AuthForm.module.scss"

const AuthForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [isLogin, setIsLogin] = useState(true)

  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const switchAuthMode = () => {
    setIsLogin((prevState) => !prevState)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value

    const enteredUser = {
      email: enteredEmail,
      password: enteredPassword,
    }

    const login = () => {
      fetchUser(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA",
        enteredUser
      )
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          )
          authCtx.login(data.idToken, expirationTime.toISOString())
          navigate("/")
          toast.success("Logged in!")
        })
        .catch((err) => {
          toast.error(err.message)
        })
    }

    if (isLogin) {
      login()
    } else {
      fetchUser(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA`,
        enteredUser
      )
      toast.success("Account Created!")

      setTimeout(() => {
        login()
      }, 500)
    }
  }

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button className="btn-primary">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className="btn-dark2-text"
            onClick={switchAuthMode}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <Link to="/reset" className="btn-dark2-text">
            Forgot Password
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
