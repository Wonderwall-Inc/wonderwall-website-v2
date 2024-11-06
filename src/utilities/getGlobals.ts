import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache } from 'next/cache'
import { DataFromGlobalSlug } from 'payload'
import { getLocale } from './getLocale'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0): Promise<DataFromGlobalSlug<"footer" | "header">> {
  const payload = await getPayloadHMR({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale: getLocale() === 'ja-jp' ? 'ja' : 'en'
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), slug as any, {
    tags: [`global_${slug}`],
  })
