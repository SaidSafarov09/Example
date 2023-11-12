export interface IPercentRates {
  title: string
  subTitle1: string
  subTitle2: string
}

export interface IStandartPlus {
  title: string
  subTitle: string
}

export const PercentRates: IPercentRates[] = [
  {
    title: "Название кредита",
    subTitle1: "«Стандартный Плюс»",
    subTitle2: "«Прайм Выгодный» ",
  },
  {
    title: "Сумма",
    subTitle1: "50 тыс. – 300 тыс.",
    subTitle2: "300 тыс. – 5 млн",
  },
  {
    title: "Полная стоимость кредита",
    subTitle1: "9,402% – 9,893%",
    subTitle2: "6,885% – 6,894%",
  },
  {
    title: "Базовая ставка",
    subTitle1: "9,9%",
    subTitle2: "6,9%",
  },
]

export const StandartPlus: IStandartPlus[] = [
  {
    title: "Сумма кредита",
    subTitle: "50 тыс. – 300 тыс.",
  },
  {
    title: "Полная стоимость кредита",
    subTitle: "9,402% – 9,893%",
  },
  {
    title: "Базовая ставка",
    subTitle: "9,9%",
  },
]

export const PrimeBenefical: IStandartPlus[] = [
  {
    title: "Сумма кредита",
    subTitle: "300 тыс. – 5 млн",
  },
  {
    title: "Полная стоимость кредита",
    subTitle: "6,885% – 6,894%",
  },
  {
    title: "Базовая ставка",
    subTitle: "6,9%",
  },
]
