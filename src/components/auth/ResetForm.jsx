import React, { useRef } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { resetPassword } from "../../lib/auth"

import classes from "./ResetForm.module.scss"

const ResetForm = () => {
  const emailRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    resetPassword(emailRef.current.value)
    toast.info("You recieved link to reset your password on your email!")
    // toast.("You recieved link to reset your password on your email!")
  }

  return (
    <div className={classes.reset}>
      <h1>Forgot password?</h1>
      <p>No worries, we'll send you reset instructions.</p>
      <p>If you didn't recieved any mail - check spam folder.</p>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div className={classes.actions}>
          <button className="btn-primary">Reset password</button>
        </div>
      </form>
      <Link to="/auth" className="btn-dark2-text">
        Back to log in
      </Link>
    </div>
  )
}

export default ResetForm
