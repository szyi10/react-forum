import React from "react"
import { Link } from "react-router-dom"

import classes from "./PostItem.module.scss"

const PostItem = ({ title, author, id }) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{title}</p>
        </blockquote>
        <figcaption>
          <p>Created by: {author}</p>
        </figcaption>
      </figure>
      <Link className="btn-primary" to={`/posts/${id}/`}>
        Read Post
      </Link>
    </li>
  )
}

export default PostItem
