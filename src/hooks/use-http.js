import { useReducer, useCallback } from "react"

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    }
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.resData,
      error: null,
      status: "completed",
    }
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    }
  }

  return state
}

function useHttp(reqFunc, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  })

  const sendRequest = useCallback(
    async function (reqData) {
      dispatch({ type: "SEND" })

      try {
        const resData = await reqFunc(reqData)
        dispatch({ type: "SUCCESS", resData })
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        })
      }
    },
    [reqFunc]
  )

  return {
    sendRequest,
    ...httpState,
  }
}

export default useHttp
