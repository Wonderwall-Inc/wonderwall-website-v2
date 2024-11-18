import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug | 'jobListings', string>> = {
  posts: 'news',
  pages: '',
  jobListings: 'job-listings',
}

type Props = {
  locale: 'en-us' | 'ja'
  collection: keyof typeof collectionPrefixMap
  slug: string
  parentSlug?: string
}

export const generatePreviewPath = ({ locale, collection, slug, parentSlug }: Props): string => {
  let path = ''
  const pathLocale = locale === 'ja' ? 'ja-jp' : locale

  switch (collection) {
    case 'pages':
      path = `/${pathLocale}/${parentSlug ?? ''}/${slug}`
      break
    case 'posts':
      path = `/${pathLocale}/${collectionPrefixMap[collection]}/${parentSlug ?? ''}/${slug}`
      break
    case 'jobListings':
      path = `/${pathLocale}/recruitment/${parentSlug ?? ''}/${slug}`
    default:
      break
  }

  const params = {
    locale,
    slug,
    collection,
    path,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  return `/next/preview?${encodedParams.toString()}`
}
