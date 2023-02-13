import React, { useEffect } from "react"
import { useParams, Outlet } from "react-router-dom"
import useHttp from "../hooks/use-http"
import { getSinglePost } from "../lib/api"

import HighlightedPost from "../components/posts/HighlightedPost"

const PostDetail = () => {
  const params = useParams()

  const { postId } = params

  const {
    sendRequest,
    status,
    data: loadedPost,
    error,
  } = useHttp(getSinglePost, true)

  useEffect(() => {
    sendRequest(postId)
  }, [sendRequest, postId])

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

  if (!loadedPost.text) {
    return <p>No qoute found!</p>
  }

  return (
    <div>
      <HighlightedPost
        title={loadedPost.title}
        text={loadedPost.text}
        author={loadedPost.author}
      />
      <Outlet />
    </div>
  )
}

export default PostDetail
