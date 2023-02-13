import React, { useContext, useRef, useState, useEffect } from "react"
import { toast } from "react-toastify"
// import { Prompt } from "react-router-dom"
import { getUserData } from "../../lib/auth"
import AuthContext from "../../context/auth-context"

import classes from "./PostForm.module.scss"

const PostForm = ({ onAddPost, isLoading }) => {
  const [focused, setFocused] = useState(false)
  const [author, setAuthor] = useState("")

  const authCtx = useContext(AuthContext)

  const textInputRef = useRef()
  const titleInputRef = useRef()

  useEffect(() => {
    getUserData(authCtx.token)
      .then((res) => {
        setAuthor(res)
      })
      .catch((err) => console.log(err))
  }, [setAuthor, getUserData])

  const submitFormHandler = (e) => {
    e.preventDefault()

    const user = author.users[0].displayName
    const enteredTitle = titleInputRef.current.value
    const enteredText = textInputRef.current.value

    onAddPost({
      author: user ? user : author.users[0].email,
      title: enteredTitle,
      text: enteredText,
    })

    toast.success("Post added.")
  }

  const finishFoucsHandler = () => setFocused(false)

  const formFocusHandler = () => setFocused(true)

  return (
    <>
      <div className={classes.card}>
        <form
          className={classes.form}
          onFocus={formFocusHandler}
          onSubmit={submitFormHandler}
        >
          {isLoading && (
            <div>
              <p>Loading...</p>
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn-primary" onClick={finishFoucsHandler}>
              Add Post
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PostForm
