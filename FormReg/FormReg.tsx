import React, { useState, useRef, ChangeEvent } from "react"
import Container from "@ecom/ui/components/Container"
import FormLanding from "@ecom/ui/components/FormLanding"
import AccepmentPartner from "@ecom/ui/components/FormLanding/fields/AccepmentPartner"
import SubmitButton from "@ecom/ui/components/FormLanding/fields/SubmitButton"
import RadioGroupField from "@ecom/ui/components/FormLanding/fields/RadioGroupField"
import EmailField from "@ecom/ui/components/FormLanding/fields/EmailField"
import TextField from "@ecom/ui/components/FormLanding/fields/TextField"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { sendRequest } from "../../helpers/sendRequest"
import { Agreement } from "./AgreementCheck/Agreement"
import * as styles from "./form.module.scss"
import { Popup } from "../Popup"
import { switcherHelper } from "./utils"
import { IFormValues, StatusType } from "./types"
import { checkedPassword, сonfirmedPassword } from "./helpers"

type FormProps = {
  btnText?: string
  subTitle?: string
  checkIsAgreement?: boolean
}

const getSubTitle = (subTitle?: string) =>
  subTitle ? (
    <h3 className={styles.subTitle} dangerouslySetInnerHTML={{ __html: subTitle }} />
  ) : undefined

export const FormReg = ({
  btnText = "Зарегистрироваться",
  subTitle,
  checkIsAgreement = false,
}: FormProps) => {
  const [isAgreement, setIsAgreement] = useState<boolean>(false)
  const refForm = useRef<HTMLFormElement | null>(null)
  const isMobile = useMediaQuery("(max-width:600px)")
  const [emailValue, setEmailValue] = useState("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const onChangeFields = {
    email: ({ value }: { value: string }) => {
      setEmailValue(value)
    },
  }

  const peoplestatus = [
    {
      value: "physical",
      label: isMobile ? "Физ. лицо" : "Физическое лицо",
    },
    {
      value: "layer",
      label: isMobile ? "Юр. лицо" : "Юридическое лицо",
    },
  ]

  const [selectedStatus, setSelectedStatus] = useState<StatusType>("physical")

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value as StatusType)
  }

  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = (values: IFormValues) => {
    const result = switcherHelper(values)

    sendRequest("/stat/partnership/signup", { ...result }, false)
      .then(({ status }: { status: string }) => {
        if (["pending", "repeated", "reject", "approve"].includes(status)) {
          return Promise.resolve(status)
        }
        if (status === "email_exists") {
          setErrorMessage("Пользователь уже зарегистрирован")
          throw new Error()
        } else {
          setIsOpen(true)
          throw new Error(status)
        }
      })
      .then(() => {
        if (refForm.current) {
          refForm.current.reset()
        }
      })
      .catch(() => {})
  }

  return (
    <section className={styles.section}>
      {getSubTitle(subTitle)}
      <Container>
        <FormLanding
          ref={refForm}
          onSubmit={handleSubmit}
          onChangeFields={onChangeFields}
          emailValue={emailValue}
        >
          <div className={styles.rouble_icon} />
          <RadioGroupField
            items={peoplestatus}
            label="Выберите ваш правовой статус:"
            name="isIndividual"
            isIndividual
            value={selectedStatus}
            onChange={handleStatusChange}
            key="status"
            classes={{
              formControlLabel: styles.formControlLabel,
            }}
          />
          <EmailField name="email" label="Email" placeholder="example@example.ru" />
          <TextField
            fullWidth
            label="Пароль"
            name="password"
            type="Password"
            validate={(value: string) => checkedPassword(value)}
          />
          <TextField
            validate={(value: string) =>
              сonfirmedPassword(value, refForm.current?.state?.fields?.password?.value)
            }
            fullWidth
            label="Пароль еще раз"
            name="confirm"
            type="password"
          />
          <div className={styles.personalData}>
            <AccepmentPartner
              name="policiesAgree"
              className={styles.accept}
              defaultValue
              validateOnBlur={false}
            />
          </div>
          {errorMessage && <div className={styles.loginError}> {errorMessage}</div>}
          {checkIsAgreement && (
            <Agreement
              isAgreement={isAgreement}
              setIsAgreement={setIsAgreement}
              className={styles.accept}
            />
          )}
          <div className={styles.submitButtonContainer}>
            <SubmitButton className={styles.submitButton} type="submit" color="secondary" refForm>
              {btnText}
            </SubmitButton>
          </div>
          {isOpen && (
            <div className={styles.formPopup}>
              <Popup handleClose={handleClose} emailValue={emailValue} />
            </div>
          )}
        </FormLanding>
      </Container>
    </section>
  )
}
