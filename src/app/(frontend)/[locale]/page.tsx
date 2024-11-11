import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { HomeHeader } from '@/components/Home/HomeHeader'
import { HomeWorks } from '@/components/Home/HomeWorks'
import { HomeNews } from '@/components/Home/HomeNews'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const locales = ['en-us', 'ja-jp'];
  return locales.map((locale) => ({ locale }));
}

export default async function Page({ params }) {
  const { slug = 'home' } = (await params)
  const url = '/' + slug

  return (
    <article>
      <PayloadRedirects disableNotFound url={url} />
      <HomeHeader />
      <HomeWorks />
      <HomeNews />
    </article>
  )
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = (await params)
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async (params) => {
  const { slug } = (await params)
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})