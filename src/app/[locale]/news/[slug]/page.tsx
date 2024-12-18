import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'
import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { setRequestLocale } from 'next-intl/server'
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false
  })

  return posts.docs?.map(({ slug }) => ({ slug }))
}

export default async function Post({ params }) {
  const { locale, slug } = await params
  setRequestLocale(locale);
  const post = await queryPost({ locale, slug })

  return (
    <article className="news-slug-article pt-16 pb-16">
      <PageClient />
      <PostHero post={post} />
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container news-slug-container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          {post.content && (
            <RichText
              className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
              content={post.content}
              enableGutter={false}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({
  params
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await queryPost({ locale, slug })
  return generateMeta({ doc: post })
}

const queryPost = cache(async (params) => {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug } = await params

  const payload = await getPayload({ config: configPromise })

  const isSlugAnId = Number(slug)

  const idQuery = { id: { equals: parseInt(slug) } }
  const slugQuery = { slug: { equals: slug } }

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: true,
    locale: urlLocaleToLangCodeMap.get(locale),
    where: isSlugAnId ? idQuery : slugQuery
  })

  return result.docs?.[0] || null
})
