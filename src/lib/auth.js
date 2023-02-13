export async function fetchUser(url, user) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()

  if (!res.ok) {
    let errorMessage = "Authentication failed!"

    if (data && data.error && data.error.message) {
      errorMessage = data.error.message
    }

    throw new Error(errorMessage)
  }

  return data
}

export async function deleteUser(token) {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const data = await res.json()

  if (!res.ok) {
    let errorMessage = "Authentication failed!"

    if (data && data.error && data.error.message) {
      errorMessage = data.error.message
    }

    throw new Error(errorMessage)
  }
}

export async function resetPassword(email) {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA",
    {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const data = await res.json()

  console.log(data)
}

export async function changePassword(token, password) {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        password: password,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const data = await res.json()

  if (!res.ok) {
    let errorMessage = "Password change failed."

    if (data && data.error && data.error.message) {
      errorMessage = data.error.message
    }

    throw new Error(errorMessage)
  }
}

export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjustedExpirationTime = new Date(expirationTime).getTime()

  const remainingTime = adjustedExpirationTime - currentTime

  return remainingTime
}

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token")
  const storedExpirationTime = localStorage.getItem("expirationTime")

  const remainingTime = calculateRemainingTime(storedExpirationTime)

  if (remainingTime <= 60000) {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationTime")
    return null
  }

  return {
    token: storedToken,
    duration: remainingTime,
  }
}

export async function updateProfile(token, changes) {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        displayName: changes.displayName,
        photoUrl: changes.photoUrl,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const data = await res.json()

  if (!res.ok) {
    let errorMessage = "Profile update failed."

    if (data && data.error && data.error.message) {
      errorMessage = data.error.message
    }

    throw new Error(errorMessage)
  }
}

export async function getUserData(token) {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyATMHMQjR4H8oxOh0rLtQhLpVQmspY4dfA",
    {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const data = await res.json()

  if (!res.ok) {
    let errorMessage = "Fetching user data failed."

    if (data && data.error && data.error.message) {
      errorMessage = data.error.message
    }

    throw new Error(errorMessage)
  }

  return data
}
