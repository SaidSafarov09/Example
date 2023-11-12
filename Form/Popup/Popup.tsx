import React, { useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import { Question } from "../../images/Question"
import { Close } from "./Close"
import { PercentRates, StandartPlus, PrimeBenefical } from "./helpers"

import * as styles from "./popup.module.scss"

export function Popup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const openPopup = () => {
    setIsPopupOpen(true)
  }
  const closePopup = () => {
    setIsPopupOpen(false)
  }
  const isMobile = useMediaQuery("(max-width:960px)")

  return (
    <>
      <div>
        <button type="button" className={styles.showRate} onClick={openPopup}>
          <p>Узнать ставку</p>
          <div className={styles.question}>
            <Question />
          </div>
        </button>
      </div>
      {isPopupOpen && (
        <div className={styles.popupBackground}>
          <ClickAwayListener onClickAway={closePopup}>
            <div className={styles.popup}>
              <div className={styles.popupHeader}>
                <h1 className={styles.title}>Процентные ставки</h1>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={closePopup}
                >
                  <Close />
                </button>
              </div>
              <div className={styles.popupContent}>
                {isMobile ? (
                  <div className={styles.popupTableMob}>
                    <div>
                      <h1 className={styles.tableTitleMob}>
                        «Стандартный Плюс»
                      </h1>
                      {StandartPlus.map((item, index) => (
                        <ul className={styles.tableListMob} key={index}>
                          <p className={styles.tableTitlesMob}>{item.title}</p>
                          <li className={styles.tableSubtitlesMob}>
                            {item.subTitle}
                          </li>
                        </ul>
                      ))}
                    </div>
                    <div className={styles.line}>{}</div>
                    <div>
                      <h1 className={styles.tableTitleMob}>«Прайм Выгодный»</h1>
                      {PrimeBenefical.map((item, index) => (
                        <ul className={styles.tableListMob} key={index}>
                          <p className={styles.tableTitlesMob}>{item.title}</p>
                          <li className={styles.tableSubtitlesMob}>
                            {item.subTitle}
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.popupTable}>
                    {PercentRates.map((item, index) => (
                      <ul className={styles.tableList} key={index}>
                        <p className={styles.tableTitles}>{item.title}</p>
                        <li className={styles.tableSubtitles}>
                          {item.subTitle1}
                        </li>
                        <li className={styles.tableSubtitles}>
                          {item.subTitle2}
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ClickAwayListener>
        </div>
      )}
    </>
  )
}
