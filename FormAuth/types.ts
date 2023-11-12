export interface IFormValues {
  email: string
  password: string
  policiesAgree: boolean
  isIndividual: boolean
}
export interface IFirstStage {
  firstStage: IFirstStageItem
}

interface IFirstStageItem {
  email: string
  password: string
  policiesAgree: boolean
}
