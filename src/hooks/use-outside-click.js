import { useRef, useEffect } from "react"

const useOutsideClick = (callback) => {
  const ref = useRef()

  useEffect(() => {
    const clickHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener("click", clickHandler, true)

    return () => {
      document.removeEventListener("click", clickHandler, true)
    }
  }, [ref])

  return ref
}

export default useOutsideClick
