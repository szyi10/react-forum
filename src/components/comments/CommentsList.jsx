import React from "react"

import CommentItem from "./CommentItem"
import classes from "./CommentsList.module.scss"

const CommentsList = ({ comments }) => {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          author={comment.author}
          photo={comment.photo}
          text={comment.text}
        />
      ))}
    </ul>
  )
}

export default CommentsList
