export function checkedPassword(password: string) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?!.*\s)[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/
  const hasCyrillic = /[а-яА-ЯёЁ]/.test(password)

  if (!hasCyrillic) {
    return re.test(password)
      ? null
      : "Пароль должен быть не меньше 8 символов, без пробелов, содержать хотя бы одну большую и маленькую латинскую букву, хотя бы одну цифру и спецсимвол"
  }
  return "Пароль не должен содержать кириллические символы"
}

export function сonfirmedPassword(repeatPassword: string, mainPassword: string) {
  return String(repeatPassword) === String(mainPassword) ? null : "Пароли не совпадают"
}
