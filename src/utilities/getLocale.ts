import acceptLanguage from 'accept-language';
acceptLanguage.languages(['ja-jp', 'en', 'en-US']);

type SupportedLocales = 'ja-jp' | 'en'

export const getLocale = (): SupportedLocales => {
  const language = acceptLanguage.get('ja-jp') ?? 'en-US'

  let locale: SupportedLocales = 'ja-jp'

  switch (language) {
    case 'en-US':
      locale = 'en'
      break
    default:
      break
  }

  return locale
}
