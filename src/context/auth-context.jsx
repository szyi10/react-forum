import { useState, useEffect, useCallback, createContext } from "react"
import { calculateRemainingTime, retrieveStoredToken } from "../lib/auth"

let logoutTimer

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken()
  let initialToken

  if (tokenData) {
    initialToken = tokenData.token
  }

  const [token, setToken] = useState(initialToken)

  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)

    localStorage.removeItem("token")
    localStorage.removeItem("expirationTime")

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expirationTime) => {
    setToken(token)

    localStorage.setItem("token", token)
    localStorage.setItem("expirationTime", expirationTime)

    const remainingTime = calculateRemainingTime(expirationTime)

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration)
    }
  }, [tokenData, logoutHandler])

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
