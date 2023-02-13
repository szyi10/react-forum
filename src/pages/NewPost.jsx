import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import PostForm from "../components/posts/PostForm"
import useHttp from "../hooks/use-http"
import { addPost } from "../lib/api"

const NewPost = () => {
  const { sendRequest, status } = useHttp(addPost)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === "completed") {
      navigate("/posts")
    }
  }, [status, history])

  const addPostHandler = (postData) => {
    sendRequest(postData)
  }

  return (
    <PostForm isLoading={status === "pending"} onAddPost={addPostHandler} />
  )
}

export default NewPost
