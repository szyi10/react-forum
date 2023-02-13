import React, { useRef, useEffect, useContext, useState } from "react"
import { toast } from "react-toastify"
import useHttp from "../../hooks/use-http"
import { addComment } from "../../lib/api"
import { getUserData } from "../../lib/auth"
import AuthContext from "../../context/auth-context"

import classes from "./NewCommentFrom.module.scss"

const NewCommentForm = ({ onAddedComment, postId, setIsAddingComment }) => {
  const [user, setUser] = useState()

  const commentTextRef = useRef()

  const authCtx = useContext(AuthContext)
  const { sendRequest, status, error } = useHttp(addComment)

  useEffect(() => {
    getUserData(authCtx.token).then((res) => setUser(res.users[0]))
    if (status === "completed" && !error) {
      setIsAddingComment(false)
      onAddedComment()
    }
  }, [status, error, onAddedComment])

  const submitFormHandler = (e) => {
    e.preventDefault()

    const enteredText = commentTextRef.current.value

    sendRequest({
      commentData: {
        author: user.displayName ? user.displayName : user.email,
        photo: user.photoUrl,
        text: enteredText,
      },
      postId: postId,
    })

    toast.success("Added comment.")
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn-primary">Add Comment</button>
      </div>
    </form>
  )
}

export default NewCommentForm
