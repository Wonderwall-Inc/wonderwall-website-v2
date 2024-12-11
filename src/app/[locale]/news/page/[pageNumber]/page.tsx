import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import React, { cache } from 'react'
import { getPayload } from 'payload'
import { setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap'
import BreadCrumb from '@/components/ui/breadcrumb'
import { HomeNewsItem } from '@/components/Home/HomeNews/NewsItem'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false
  })

  const pages: number[] = []

  for (let i = 1; i <= posts.totalPages; i++) {
    pages.push(i)
  }

  return []
}

const queryPosts = cache(async (params) => {
  const { isEnabled: draft } = await draftMode()
  const { locale, pageNumber } = await params

  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection: 'posts',
    draft,
    depth: 1,
    limit: 2,
    sort: '-publishedAt',
    locale: urlLocaleToLangCodeMap.get(locale),
    page: pageNumber,
    where: {
      'categories.title': {
        equals: 'News'
      }
    }
  })

  return page
})

export default async function Page({ params }) {
  const { locale, pageNumber = 2 } = await params
  setRequestLocale(locale);
  const posts = await queryPosts({ locale, pageNumber })

  if (typeof posts.page === 'string') {
    posts.page = parseInt(posts.page)
  }

  return (
    <div className='w-100p px-[15px] lg:p-0 lg:w-960 m-auto'>
      <div className="w-100p lg:w-960 m-auto">
        <BreadCrumb path="/news" />
      </div>
      <div>
        <section className="text-center">
          <div className="px-[15px] py-[15px] m-auto lg:px-0 text-left md:py-[30px]">
            <h2 className="mb-3 text-2xl text-color-primary md:text-3xl lg:text-4xl">News</h2>
            <ul className='mb-5'>
              {posts.docs.map((newsPost, index) => (
                <HomeNewsItem key={index} newsPost={newsPost} />
              ))}
            </ul>
          </div>
        </section>

        <div className="container">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} locale={locale} />
          )}
        </div>
      </div>
    </div>
  )
}
