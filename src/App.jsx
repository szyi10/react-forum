import React, { useContext } from "react"
import { Route, Routes, Navigate, Link } from "react-router-dom"
import AuthContext from "./context/auth-context"

import {
  AllPosts,
  NewPost,
  PostDetail,
  NotFound,
  AuthPage,
  Profile,
} from "./pages"
import Layout from "./components/layout/Layout"
import Comments from "./components/comments/Comments"
import UserSettings from "./components/user/UserSettings"
import ResetForm from "./components/auth/ResetForm"
import { ToastContainer } from "react-toastify"

const App = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/posts" exact element={<AllPosts />} />
        <Route path="/posts/:postId" element={<PostDetail />}>
          <Route
            path=""
            element={
              <div className="centered">
                <Link className="btn-primary-reversed" to={`comments`}>
                  Load Comments
                </Link>
              </div>
            }
          ></Route>
          <Route path={`comments`} element={<Comments />} />
        </Route>
        <Route
          path="/new-post"
          element={
            isLoggedIn ? <NewPost /> : <Navigate replace to="/profile" />
          }
        />
        <Route
          path="/auth"
          element={
            !isLoggedIn ? <AuthPage /> : <Navigate replace to="/profile" />
          }
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate replace to="/auth" />}
        >
          <Route
            path=""
            element={
              <Link className="btn-primary" to={`settings`}>
                Account Settings
              </Link>
            }
          />
          <Route path={`settings`} element={<UserSettings />} />
        </Route>
        <Route path="/reset" element={<ResetForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Layout>
  )
}

export default App
