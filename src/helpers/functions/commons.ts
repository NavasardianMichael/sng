import { string } from 'yup'

export const generateRequiredStringSchema = (fieldName: string) => {
  return string().required(`${fieldName} is required`)
}

export const sleep = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms))
}

export const combineClassNames = (...classNames: ReadonlyArray<string | undefined | boolean>) => {
  return classNames.filter((className) => !!className).join(' ')
}
