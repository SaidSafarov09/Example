import { navigate } from "gatsby"
import { IFirstStage } from "./types"

const API = process.env.GATSBY_HOST_API || "https://api-app.secret.ru"

export const sendRequest = (
  url = `/stat/partnership/signin`,
  data: IFirstStage,
  setErrorMessage: (errorMessage: string) => void
) => {
  fetch(`${API}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status !== 200) {
        setErrorMessage("Неправильное имя пользователя или пароль")
        throw new Error()
      }
      return res.json()
    })
    .then((result) => {
      if (result?.needEmailConfirmation) {
        return setErrorMessage("Необходимо подтвердить почту")
      }
      if (result?.isPasswordValid === false) {
        return setErrorMessage("Неправильное имя пользователя или пароль")
        // throw new Error();
      }
      localStorage?.setItem("partnership_token", result?.token)
      setErrorMessage("")

      return navigate("/dashboard/profile/")
    })
    .catch((error) => {
      setErrorMessage("Неправильное имя пользователя или пароль")
      return Promise.reject(error)
    })
}
