import React, { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import Acceptment from "@ecom/ui/components/FormLanding/fields/AcceptmentField"
import FormLanding from "@ecom/ui/components/FormLanding"
import DadataFio from "@ecom/ui/components/FormLanding/fields/DadataFields/DadataFio"
import getAdditionalData from "@ecom/ui/helpers/getAdditionalData"
import pushToDataLayer from "@ecom/ui/utils/pushToDataLayer"
import PhoneField from "@ecom/ui/components/FormLanding/fields/PhoneField"
import SubmitButton from "@ecom/ui/components/FormLanding/fields/SubmitButton"
import ButtonBase from "@material-ui/core/ButtonBase"
import DateField from "@ecom/ui/components/FormLanding/fields/DateField"
import { DocsBlock } from "../DocsBlock/DocsBlock"

import { FormControl } from "./FormControl"
import { getFormattedValue } from "../helpers"
import { CalculatorData, FormValues, CalculatorMode, FormProps } from "../types"
import { formatValuesToRequest, getGAFB } from "./helper"
import { getIDBValue, setIDBValue } from "../../../utils/idbUtils"
import { termAction, paymentAction } from "../actions"
import { sendDataRest } from "../../../helpers/sendDataRest"
import { disableWebvisor } from "../../../helpers/disableWebvisor"

import { Plus } from "../images/Plus"
import { Minus } from "../images/Minus"

import * as styles from "./form.module.scss"
import { Popup } from "./Popup/Popup"

export function Form({
  showDocument,
  monthlyPayment,
  monthlyPayments,
  checkAcceptment,
  withPopup,
  productName = "Cash Loan",
  dispatch,
  withFieldBirthDate = false,
  grey,
  savingsMoney,
  setCreditTerm,
  terms,
}: FormProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [plusDisableButton, setPlusDisableButton] = useState(false)
  const [minusDisableButton, setMinusDisableButton] = useState(false)
  const [showEconomy, setShowEconomy] = useState(0)

  useEffect(() => {
    setShowEconomy(savingsMoney - monthlyPayment)
  }, [monthlyPayment, savingsMoney])

  // отключение записи ПД в вебвизоре
  useEffect(() => {
    if (ref && ref.current) {
      disableWebvisor(ref.current)
    }
  }, [ref])

  const handleSubmit = (values: FormValues) => {
    if (checkAcceptment) {
      pushToDataLayer({
        event: "buttonClick",
        name: "Получить кредит",
        placement: "appl_cash",
      })
      setIsSubmitting(true)
      const cliend_ids = getGAFB()
      const valuesToRequest = formatValuesToRequest(values)
      const additionalData = getAdditionalData()

      setIDBValue("phone", valuesToRequest.phone)
      getIDBValue<CalculatorData>("calcState").then((calcState) => {
        const includeCalcData = Boolean(
          document.querySelector("[data-calculator]")
        )
        const newCalcState = includeCalcData ? calcState : {}
        const data = {
          ...newCalcState,
          ...valuesToRequest,
          ...cliend_ids,
          additionalData,
          productName,
        }

        sendDataRest(data)
      })
    }
  }
  const handleChange = (name: CalculatorMode) => (value: number) => {
    if (name === "term") {
      dispatch(
        termAction({
          searchValue: value,
        })
      )
      return
    }

    dispatch(
      paymentAction({
        searchValue: value,
      })
    )
  }

  const onChangeFields = {
    agree: ({ value }: { value: any }) => {
      setIsSubmitting(!value)
    },
  }

  function handleChangeLoanTerm(type: "dec" | "inc") {
    const rightCond = type === "dec" ? monthlyPayments.length - 1 : 0
    const num = type === "dec" ? 1 : -1

    const result = terms?.filter(
      (_, i) => i === monthlyPayments.indexOf(monthlyPayment)
    )
    setCreditTerm(result[0])

    return () => {
      const index = monthlyPayments.indexOf(monthlyPayment)

      if (index === rightCond) {
        return
      }

      handleChange("monthlyPayment")(monthlyPayments[index + num])
    }
  }

  useEffect(() => {
    const leastTerm =
      monthlyPayments.indexOf(monthlyPayment) === monthlyPayments.length - 1
    const mostTerm = monthlyPayments.indexOf(monthlyPayment) === 0

    setPlusDisableButton(leastTerm)
    setMinusDisableButton(mostTerm)
  }, [monthlyPayment, plusDisableButton, minusDisableButton, monthlyPayments])

  return (
    <div className={styles.form} ref={ref} id="short-form">
      {withPopup ? (
        <div className={styles.infoWithPopup}>
          <div className={styles.numberWrap}>
            <div className={styles.monthlyWrap}>
              <p className={styles.infoDescr}>Ежемесячный платеж</p>
              <div className={styles.rateNumber}>
                <p className={styles.number}>
                  <ButtonBase
                    className={styles.iconButton}
                    onClick={handleChangeLoanTerm("dec")}
                    disabled={plusDisableButton}
                  >
                    <Minus disableButton={plusDisableButton} />
                  </ButtonBase>
                  <div>
                    {getFormattedValue(monthlyPayment)}
                    <span className={styles.infoSuffix}>&nbsp;₽</span>
                  </div>
                  <ButtonBase
                    className={styles.iconButton}
                    onClick={handleChangeLoanTerm("inc")}
                    disabled={minusDisableButton}
                  >
                    <Plus disableButton={minusDisableButton} />
                  </ButtonBase>
                </p>
                <Popup />
              </div>
            </div>
          </div>
          {showEconomy > 0 && (
            <div>
              <p className={clsx(styles.infoDescr, styles.infoDescrScd)}>
                Экономия в месяц
              </p>
              <div>
                <p className={styles.number}>
                  <div className={styles.individualNumber}>
                    {getFormattedValue(showEconomy)}
                    <span className={styles.infoSuffix}>&nbsp;₽</span>
                  </div>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.info}>
          <div className={styles.numberWrap}>
            <div className={styles.monthlyWrap}>
              <p className={styles.infoDescr}>Ежемесячный платёж</p>
              <div>
                <p className={styles.number}>
                  <ButtonBase
                    className={styles.iconButton}
                    onClick={handleChangeLoanTerm("dec")}
                    disabled={plusDisableButton}
                  >
                    <Minus disableButton={plusDisableButton} />
                  </ButtonBase>
                  <div>
                    {getFormattedValue(monthlyPayment)}
                    <span className={styles.infoSuffix}>&nbsp;₽</span>
                  </div>
                  <ButtonBase
                    className={styles.iconButton}
                    onClick={handleChangeLoanTerm("inc")}
                    disabled={minusDisableButton}
                  >
                    <Plus disableButton={minusDisableButton} />
                  </ButtonBase>
                </p>
              </div>
            </div>
          </div>
          {showEconomy > 0 && (
            <div>
              <p className={clsx(styles.infoDescr, styles.infoDescrScd)}>
                Экономия в месяц
              </p>
              <div>
                <p className={styles.number}>
                  <div className={styles.individualNumber}>
                    {getFormattedValue(showEconomy)}
                    <span className={styles.infoSuffix}>&nbsp;₽</span>
                  </div>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <FormLanding
        onSubmit={handleSubmit}
        onChangeFields={onChangeFields}
        name="personalForm"
        classes={{ container: clsx({ [styles.grey]: grey }) }}
      >
        <FormControl>
          <DadataFio
            label="Фамилия Имя Отчество"
            name="fio"
            className={styles.textareaCustom}
          />
        </FormControl>
        <FormControl>
          <PhoneField name="phone" className={styles.phoneCustom} />
        </FormControl>
        {withFieldBirthDate && (
          <FormControl>
            <DateField
              name="birthDate"
              label="Дата рождения"
              placeholder="дд.мм.гггг"
              max={new Date()}
              validAgeMin={18}
              validAgeMax={85}
            />
          </FormControl>
        )}

        <Acceptment name="agree" defaultValue validateOnBlur={false} />

        <div className={styles.btn}>
          <SubmitButton disabled={isSubmitting}>Получить кредит</SubmitButton>
        </div>
      </FormLanding>
      <DocsBlock showDesc showSecondDocumentImg={showDocument} />
    </div>
  )
}
