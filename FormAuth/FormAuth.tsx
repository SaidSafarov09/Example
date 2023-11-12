/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef } from "react"
import Container from "@ecom/ui/components/Container"
import FormLanding from "@ecom/ui/components/FormLanding"
import AccepmentPartner from "@ecom/ui/components/FormLanding/fields/AccepmentPartner"
import SubmitButton from "@ecom/ui/components/FormLanding/fields/SubmitButton"
import TextField from "@ecom/ui/components/FormLanding/fields/TextField"
import EmailField from "@ecom/ui/components/FormLanding/fields/EmailField"
import { Agreement } from "./AgreementCheck/Agreement"
import * as styles from "./form.module.scss"
import { IFormValues } from "./types"
import { loginPassword } from "./helpers"
import { sendRequest } from "./dataService"

type FormProps = {
  btnText?: string
  subTitle?: string
  checkIsAgreement?: boolean
}

const getSubTitle = (subTitle?: string) =>
  subTitle && <h3 className={styles.subTitle} dangerouslySetInnerHTML={{ __html: subTitle }} />

export const FormAuth = ({ btnText = "Войти", subTitle, checkIsAgreement = false }: FormProps) => {
  const isSubmitting = false
  const [isAgreement, setIsAgreement] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const refForm = useRef<HTMLFormElement | null>(null)
  const handleSubmit = (values: IFormValues) => {
    sendRequest(`/stat/partnership/signin`, { firstStage: { ...values } }, setErrorMessage)
  }

  return (
    <section className={styles.section}>
      {getSubTitle(subTitle)}
      <Container>
        <FormLanding
          ref={refForm}
          onSubmit={handleSubmit}
          name="firstStage"
          initialValues={{ firstStage: { email: "", password: "" } }}
        >
          <div className={styles.rouble_icon} />
          <EmailField name="email" label="Email" placeholder="example@example.ru" />
          <TextField
            validate={loginPassword}
            fullWidth
            label="Пароль"
            name="password"
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
            <Agreement isAgreement={isAgreement} setIsAgreement={setIsAgreement} />
          )}
          <div className={styles.submitButtonContainer}>
            <SubmitButton
              disabled={isSubmitting}
              className={styles.submitButton}
              type="submit"
              color="secondary"
            >
              {btnText}
            </SubmitButton>
          </div>
        </FormLanding>
      </Container>
    </section>
  )
}
