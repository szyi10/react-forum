import React from "react"
import { Link } from "react-router-dom"

import classes from "./NoPostsFound.module.scss"

const NoPostsFound = () => {
  return (
    <div className={classes.noposts}>
      <p>No posts found!</p>
      <Link className="btn-primary" to="/new-post">
        Add a Post
      </Link>
    </div>
  )
}

export default NoPostsFound
