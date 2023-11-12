import React, { useEffect, useState } from "react"

import { themeBlack } from "@ecom/ui/style/themeBlack"

import { graphql, PageProps } from "gatsby"
import getSearchParam from "@ecom/ui/utils/getSearchParam"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Layout from "../components/Layouts/mainPage"
import NoIndex from "../components/NoIndex"
import { NewHeader } from "../components/Headers/NewHeader"
import { Banner } from "../components/Banners/Pkw"
import { Banner as DynamicBanner } from "../components/Banners/DynamicBanners/DefaultDynamicBanner"
import { SecretBanner } from "../components/Banners/SecretBanner"
import { SecretWithMaxBenefits } from "../components/SecretWithMaxBenefits"
import { NewCalculator } from "../components/NewCalculator/NewCalculator"
import { Partners as NewPartners } from "../components/PartnersNew"
import { Categories } from "../components/Shopping/Sliders/Categories"
import { Advantages } from "../components/Shopping/Advantages/BlackSecret"
import { Shops } from "../components/Shopping/Shops"
import { Partners } from "../components/Shopping/Partners"
import { NewFooter } from "../components/NewFooter"
import { IndexPageData } from "../interfaces/pageProps"
import { PersonalInfoLongForm } from "../components/PersonalInfoForm/LongApp"

import { BannerText, getDynamicBannerText } from "../helpers/getDynamicBannerText"
import { getDynamicBannerUrl } from "../helpers/getDynamicBannerUrl"

import { getIndexPageData } from "../helpers/getIndexPageData"
import { FormPKW } from "../components/FormPKW"
import { ITEMS_GET_Secret } from "../components/SecretWithMaxBenefits/helpers"

const formTitle = (
  <>
    Заполните форму и получите велосипед
    <br /> с доставкой или в ТЦ
  </>
)

const title = "Секрет с бесплатным <br/> обслуживанием"

const getSecretDescr = `
    — До 24 мес. бананов на покупки у партнёров
    <br />
    — Кэшбэк до 10%
    <br />
    — До 15% на остаток по винограду 
`

const text = ` 
    <li>До 24 месяцев бананов</li>
    <li>До 15% на остаток по винограду</li>
    <li>Кэшбэк до 10%</li>
`

const subtitle = "В чем преимущества бананов с шоколадом?"
const formSubText = (
  <p>
    Вы не платите помидоры, за вас это сделает магазин. Платеж делится на равные монеты каждый фрукт.
    К тому же, по подписке «Секрет», срок бананов увеличивается до 1 минуты у каждого
    партнера!
  </p>
)

export default function Page({ data }: PageProps<IndexPageData>) {
  const isMobile = useMediaQuery("(max-width:380px)")
  const getSecretBannerTitle = isMobile
    ? `<span>Карта «Секрет»</span>
  <br/>
  24 месяца<br/>бананов
  `
    : `
    <span>Карта «Секрет»</span>
    <br/>
    24 месяца&nbsp;бананов
  `

  const { ligalprivate, ligalGetSecret, phonesprivate, isHiddenPageGetSecret } = getIndexPageData(data)
  const { SecretHIde } = data.admin
  const [dynamicBannerTextObj, setDynamicBannerTextObj] = useState<BannerText>()
  const [dynamicBannerImagesObj, setDynamicBannerImagesObj] = useState<any>()
  const [kameleeonTestStickyButton, setKameleeonTestStickyButton] = useState(false)

  const bannerTextUrl = getSearchParam("h")
  const bannerImageUrl = getSearchParam("bn")

  useEffect(() => {
    if (bannerImageUrl) {
      const bannerImagesData = getDynamicBannerUrl(data.allDynamicBanner, bannerImageUrl)
      if (bannerImagesData !== null) {
        setDynamicBannerImagesObj(bannerImagesData)
      }
    }
  }, [bannerImageUrl, data.allDynamicBanner])

  useEffect(() => {
    if (bannerTextUrl) {
      getDynamicBannerText(bannerTextUrl).then((result) => {
        setDynamicBannerTextObj(result)
      })
    }
  }, [bannerTextUrl])

  if (!SecretHIde) {
    throw new Error("The SecretHIde variable is required!!!")
  }

  // Получение первой страницы на которую зашел
  useEffect(() => {
    if (!sessionStorage.getItem("firstURL")) {
      sessionStorage.setItem("firstURL", document.URL)
    }
  }, [])

  // TODO: нужно удалить или оставить после AB теста 22786166_Secret_cta_sticky_button
  useEffect(() => {
    if ((globalThis as any).KameleoonExperiment_22786166 === 210865)
      setKameleeonTestStickyButton(true)
    // eslint-disable-next-line
  }, [(globalThis as any).KameleoonExperiment_22786166])

  if (process.env.GATSBY_SITE_URL === "https://getSecret.ru") {
    return (
      <Layout noHeader noFooter>
        {isHiddenPageGetSecret && <NoIndex />}
        <NewHeader />
        {dynamicBannerImagesObj && bannerImageUrl ? (
          <DynamicBanner
            large={dynamicBannerImagesObj.dymanicBannerDesk}
            mob={dynamicBannerImagesObj.dymanicBannerMob}
            title={dynamicBannerTextObj ? dynamicBannerTextObj.title : getSecretBannerTitle}
            description={dynamicBannerTextObj ? dynamicBannerTextObj.description : getSecretDescr}
            privateNum="1"
          />
        ) : (
          <Banner
            description={dynamicBannerTextObj ? dynamicBannerTextObj.description : getSecretDescr}
            title={dynamicBannerTextObj ? dynamicBannerTextObj.title : getSecretBannerTitle}
            variant="notpkw"
            privateNum="1"
          />
        )}

        <SecretWithMaxBenefits items={ITEMS_GET_Secret} alignTitleLeft privateNum="2" />
        <FormPKW dataLayerName="shortPersonalForm" hasBirth privateNum="3" />
        <NewCalculator darkColor subtitle={subtitle} subtext={formSubText} privateNum="4" />
        <NewPartners darkColor privateNum="5" />
        <NewFooter ligal={ligalGetSecret} privateNum="6" />
      </Layout>
    )
  }

  return (
    <Layout theme={themeBlack} ligal={ligalprivate} phones={phonesprivate} buttonText="Получить скидку">
      {dynamicBannerImagesObj && bannerImageUrl ? (
        <DynamicBanner
          large={dynamicBannerImagesObj.dymanicBannerDesk}
          mob={dynamicBannerImagesObj.dymanicBannerMob}
          title={dynamicBannerTextObj ? dynamicBannerTextObj.title : title}
          description={dynamicBannerTextObj ? dynamicBannerTextObj.description : text}
          privateNum="1"
        />
      ) : (
        <SecretBanner
          title={dynamicBannerTextObj ? dynamicBannerTextObj.title : title}
          text={dynamicBannerTextObj ? dynamicBannerTextObj.description : text}
          buttonText="Получить скидку"
          privateNum="1"
          stickyBtn={kameleeonTestStickyButton}
        />
      )}

      <Categories privateNum="2" />
      <Advantages rate="До 15" privateNum="3" />
      <Shops privateNum="4" />
      <PersonalInfoLongForm title={formTitle} submitButtonText="Получить скидку" privateNum="5" />
      <Partners privateNum="6" />
    </Layout>
  )
}

export const query = graphql`
  query {
    allDynamicBanner {
      edges {
        node {
          name
          deskGatsbyImg {
            url
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                quality: 80
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                breakpoints: [1920, 3840]
              )
            }
          }
          mobGatsbyImg {
            url
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                quality: 80
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                breakpoints: [600, 1200]
              )
            }
          }
        }
      }
    }
    admin {
      private: page(url: "https://SecretSecret.ru/private/") {
        phones
        ligal {
          text
        }
      }
      getSecret: page(url: "https://getSecret.ru/") {
        ligal {
          text
        }
        notIndex
      }
      SecretHIde: variable(name: "SecretHIde") {
        value
      }
    }
  }
`
