import { IFormValues } from "./types"

export const switcherHelper = (values: IFormValues) => {
  if (values.isIndividual.toString() === "layer") {
    return { ...values, isIndividual: false }
  }

  return { ...values, isIndividual: true }
}
