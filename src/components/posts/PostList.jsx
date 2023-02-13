import React from "react"
import { useNavigate, useLocation } from "react-router-dom"

import PostItem from "./PostItem"
import classes from "./PostList.module.scss"

const sortPosts = (posts, ascending) => {
  return posts.sort((postA, postB) => {
    if (ascending) {
      return postA.id > postB.id ? 1 : -1
    } else {
      return postA.id < postB.id ? 1 : -1
    }
  })
}

const PostList = ({ posts }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)

  const isSortingAsc = queryParams.get("sort") === "asc"

  const sortedPosts = sortPosts(posts, isSortingAsc)

  const changeSortingHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isSortingAsc ? "desc" : "asc"}`,
    })
  }

  return (
    <>
      <div className={classes.sorting}>
        <button className="btn-dark2" onClick={changeSortingHandler}>
          Sort {isSortingAsc ? "Descendnig" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedPosts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            author={post.author}
            title={post.title}
          />
        ))}
      </ul>
    </>
  )
}

export default PostList
