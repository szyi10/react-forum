import React, { useEffect } from "react"
import useHttp from "../hooks/use-http"
import { getAllPosts } from "../lib/api"

import PostList from "../components/posts/PostList"
import NoPostsFound from "../components/posts/NoPostsFound"

const AllPosts = () => {
  const {
    sendRequest,
    status,
    data: loadedPosts,
    error,
  } = useHttp(getAllPosts, true)

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  if (status === "pending") {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  if (status === "completed" && (!loadedPosts || loadedPosts.length === 0)) {
    return <NoPostsFound />
  }

  return <PostList posts={loadedPosts} />
}

export default AllPosts
