import { getLocale } from "./getLocale"

interface Props {
  label?: string
  errorType: 'required'
}

export const getErrorMessage = ({ errorType, label }: Props) => {
  const locale = getLocale()

  if (errorType === 'required') {

    if (locale === 'ja-jp') {
      return `${label}を入力してください。`
    }

    if (locale === 'en') {
      return `${label} field is required.`
    }
  }

  return ''
}
