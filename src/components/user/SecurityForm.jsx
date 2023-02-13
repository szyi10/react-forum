import React, { useContext, useState } from "react"
import { toast } from "react-toastify"
import { changePassword } from "../../lib/auth"
import AuthContext from "../../context/auth-context"

import classes from "./UserSettings.module.scss"

const SecurityForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailEditing, setEmailEditing] = useState(false)
  const [passwordEditing, setPasswordEditing] = useState(false)

  const authCtx = useContext(AuthContext)

  const editEmail = () => {
    setEmail("")
    setEmailEditing(true)
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }

  const saveEmail = () => {
    if (email.includes("@")) {
      toast.success("Email changed!")
      setEmailEditing(false)
    } else {
      toast.error("Incorrect email.")
    }
  }

  const editPassword = () => {
    setPassword("")
    setPasswordEditing(true)
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const savePassword = () => {
    if (password.length >= 6) {
      changePassword(authCtx.token, password)
      toast.success("Password changed!")
      setPasswordEditing(false)
      setPassword("")
    } else {
      toast.error("Too short password!")
    }
  }

  return (
    <div className={classes.security}>
      <form className={classes.email}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailHandler}
            disabled={!emailEditing}
          />
        </div>
        <div className={classes.actions}>
          {!emailEditing && (
            <button type="button" className="btn-dark1" onClick={editEmail}>
              Change Email
            </button>
          )}

          {emailEditing && (
            <button type="button" className="btn-success" onClick={saveEmail}>
              Save Email
            </button>
          )}
        </div>
      </form>
      <form className={classes.password}>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordHandler}
            disabled={!passwordEditing}
          />
        </div>
        <div className={classes.actions}>
          {!passwordEditing && (
            <button type="button" className="btn-dark1" onClick={editPassword}>
              Change Password
            </button>
          )}

          {passwordEditing && (
            <button
              type="button"
              className="btn-success"
              onClick={savePassword}
            >
              Save Password
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SecurityForm
