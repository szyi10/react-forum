import React from "react"

import classes from "./HighlightedPost.module.scss"

const HighlightedPost = ({ title, text, author }) => {
  return (
    <figure className={classes.post}>
      <h1>{title}</h1>
      <figcaption>@{author}</figcaption>
      <p>{text}</p>
    </figure>
  )
}

export default HighlightedPost
