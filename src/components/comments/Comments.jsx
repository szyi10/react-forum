import React, { useState, useEffect, useCallback, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import useHttp from "../../hooks/use-http"
import { getAllComments } from "../../lib/api"
import AuthContext from "../../context/auth-context"

import NewCommentForm from "./NewCommentForm"
import CommentsList from "./CommentsList"

import classes from "./Comments.module.scss"

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false)
  const params = useParams()

  const authCtx = useContext(AuthContext)

  const { postId } = params

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)

  useEffect(() => {
    sendRequest(postId)
  }, [sendRequest, postId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true)
  }

  const addedCommentHandler = useCallback(() => {
    sendRequest(postId)
  }, [sendRequest, postId])

  let comments

  if (status === "pending") {
    comments = (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} />
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <div className="centered">
          {authCtx.isLoggedIn && (
            <button className="btn-primary" onClick={startAddCommentHandler}>
              Add a Comment
            </button>
          )}
          {!authCtx.isLoggedIn && (
            <Link to="/auth" className="btn-primary">
              Add a Comment
            </Link>
          )}
        </div>
      )}
      {isAddingComment && (
        <NewCommentForm
          postId={postId}
          onAddedComment={addedCommentHandler}
          setIsAddingComment={setIsAddingComment}
        />
      )}
      {comments}
    </section>
  )
}

export default Comments
