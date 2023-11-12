import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import clsx from "clsx"

import * as styles from "./check.module.scss"

export const Agreement = ({ isAgreement, setIsAgreement }: any) => {
  const onChange = () => {
    setIsAgreement(!isAgreement)
  }

  return (
    <div className={styles.secondCheckBlock}>
      <div className={styles.secondCheck}>
        <Checkbox onChange={onChange} color="primary" checked={isAgreement} />
        <p className={styles.agreement}>
          Я даю согласие &quot;Совкомбанк страхование&quot; (АО) на обработку персональных
          данных&nbsp;
          <a
            target="_blank"
            className={styles.agreementLink}
            href="https://secretins.ru/upload/personal/soglasie_na_obrabotky_pd.pdf"
            rel="noreferrer"
          >
            для целей оказания страховых услуг
          </a>
          &nbsp;и&nbsp;
          <a
            target="_blank"
            className={styles.agreementLink}
            href="https://secretins.ru/upload/personal/pdn-klient-reklama.pdf"
            rel="noreferrer"
          >
            для целей рекламы
          </a>
          &nbsp;и ознакомлен (-а) с&nbsp;
          <a
            target="_blank"
            className={styles.agreementLink}
            href="https://secretins.ru/upload/raskrytie_informacii/pdpp.pdf"
            rel="noreferrer"
          >
            Политикой обработки персональных данных
          </a>
        </p>
      </div>
      <p className={clsx(styles.helperText, isAgreement && styles.displayNone)}>
        Необходимо согласие с условиями
      </p>
    </div>
  )
}
