import getCookie from "@ecom/ui/utils/getCookie"
import formatToRequest from "@ecom/ui/helpers/formatToRequest"

const fieldsType = {
  fio: "fio",
  birthDate: "date",
  region: "region",
}

export function formatValuesToRequest(values: any) {
  const valuesToRequest = formatToRequest(values, fieldsType)
  const { surname, name, patronymic } = valuesToRequest.fio

  delete valuesToRequest.fio

  return { surname, name, patronymic, ...valuesToRequest }
}

export const getGAFB = () => {
  const ga = getCookie("_ga")
  const ga_arr = ga ? ga.split(".") : []
  const gaClientID = ga_arr[2] && ga_arr[3] ? `${ga_arr[2]}.${ga_arr[3]}` : ""

  const fbp = getCookie("_fbp")
  const fbp_arr = fbp ? fbp.split(".") : []
  const fbClientID =
    fbp_arr[2] && fbp_arr[3] ? `${fbp_arr[2]}.${fbp_arr[3]}` : ""

  return { gaClientID, fbClientID }
}
