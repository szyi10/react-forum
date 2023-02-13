const FIREBASE_DOMAIN =
  "https://react-http-a3a7d-default-rtdb.europe-west1.firebasedatabase.app"

export async function getAllPosts() {
  const res = await fetch(`${FIREBASE_DOMAIN}/posts.json`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not fetch posts.")
  }

  const transformedPosts = []

  for (const key in data) {
    const postObj = {
      id: key,
      ...data[key],
    }

    transformedPosts.push(postObj)
  }

  return transformedPosts
}

export async function getSinglePost(postId) {
  const res = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not fetch post.")
  }

  const loadedPost = {
    id: postId,
    ...data,
  }

  return loadedPost
}

export async function addPost(postData) {
  const res = await fetch(`${FIREBASE_DOMAIN}/posts.json`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not create post.")
  }

  return null
}

export async function addComment(reqData) {
  const res = await fetch(
    `${FIREBASE_DOMAIN}/comments/${reqData.postId}.json`,
    {
      method: "POST",
      body: JSON.stringify(reqData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not add comment.")
  }

  return { commentId: data.name }
}

export async function getAllComments(postId) {
  const res = await fetch(`${FIREBASE_DOMAIN}/comments/${postId}.json`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Could not get comments.")
  }

  const transformedComments = []

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    }

    transformedComments.push(commentObj)
  }

  return transformedComments
}
