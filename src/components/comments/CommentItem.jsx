import React from "react"

import classes from "./CommentItem.module.scss"

const CommentItem = ({ author, photo, text }) => {
  return (
    <li className={classes.item}>
      <div className={classes.user}>
        {photo && <img src={photo} className={classes.img} />}
        {!photo && <div className={classes.img} />}
        <p>{author}</p>
      </div>
      <p>{text}</p>
    </li>
  )
}

export default CommentItem
