import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { RenderHero } from '@/heros/RenderHero'
import { setRequestLocale } from 'next-intl/server';
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import BreadCrumb from '@/components/ui/breadcrumb'

export const dynamic = 'force-static'

export default async function Page({ params }) {
  const { locale } = (await params)
  setRequestLocale(locale);

  const page = await queryPageBySlug({ locale, slug: 'home' })

  return (
    <div>
      <div className="w-100p lg:w-960 m-auto">
        <BreadCrumb breadcrumbs={page.breadcrumbs} path='/aboutus' />
      </div>
      <div className='about-us-container'>
        <RenderHero {...page.hero} />
      </div>
      <div className='w-100p px-[15px] lg:w-960 lg:px-0 m-auto'>
        <div className='w-100p about-us-links'>
          <RenderBlocks blocks={page.layout} />
        </div>
      </div>
    </div>
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
  const { locale } = (await params)
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: true,
    locale: urlLocaleToLangCodeMap.get(locale),
    where: {
      slug: {
        equals: 'aboutus',
      },
    },
  })

  return result.docs?.[0] || null
})