import React, { useState, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { updateProfile, getUserData } from "../../lib/auth"
import AuthContext from "../../context/auth-context"

import classes from "./UserSettings.module.scss"

const ProfileForm = () => {
  const [editingProfile, setEditingProfile] = useState(false)
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    getUserData(authCtx.token)
      .then((res) => {
        setName(res.users[0].displayName)
        setPhoto(res.users[0].photoUrl)
      })
      .catch((err) => console.log(err))
  }, [getUserData])

  const editProfile = () => setEditingProfile(true)

  const nameChangeHandler = (e) => {
    setName(e.target.value)
  }

  const photoChangeHandler = (e) => {
    setPhoto(e.target.value)
  }

  const saveProfile = () => {
    const changes = {
      displayName: name,
      photoUrl: photo,
    }

    updateProfile(authCtx.token, changes)

    toast.success("Profile updated!")
    setEditingProfile(false)
  }

  return (
    <form className={classes.profile}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="name">Display Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={nameChangeHandler}
            disabled={!editingProfile}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="photo">Photo URL</label>
          <input
            type="text"
            id="photo"
            value={photo}
            onChange={photoChangeHandler}
            disabled={!editingProfile}
          />
        </div>
      </div>
      <div className={classes.actions}>
        {!editingProfile && (
          <button type="button" className="btn-primary" onClick={editProfile}>
            Update Profile
          </button>
        )}
        {editingProfile && (
          <button type="button" className="btn-success" onClick={saveProfile}>
            Save Changes
          </button>
        )}
      </div>
    </form>
  )
}

export default ProfileForm
