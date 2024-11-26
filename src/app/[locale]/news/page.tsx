import type { Metadata } from 'next/types'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { HomeNewsItem } from '@/components/Home/HomeNews/NewsItem'
import Link from 'next/link'
import BreadCrumb from '@/components/ui/breadcrumb'
import { setRequestLocale } from 'next-intl/server'
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }) {
  const locale = (await params).locale
  setRequestLocale(locale);
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 5,
    sort: '-publishedAt',
    locale: urlLocaleToLangCodeMap.get(locale),
    where: {
      'categories.title': {
        equals: 'News'
      }
    }
  })

  return (
    <div className='w-100p lg:w-960 m-auto'>
      <BreadCrumb path="/news" />
      <div>
        <section className="text-center">
          <div className="px-[15px] py-[15px] m-auto lg:px-0 text-left md:py-[30px]">
            <h2 className="mb-3 text-2xl text-color-primary md:text-3xl lg:text-4xl">News</h2>
            <ul className='mb-5'>
              {page.docs.map((newsPost, index) => (
                <HomeNewsItem key={index} newsPost={newsPost} />
              ))}
            </ul>
          </div>
        </section>

        <div className="container">
          {page.totalPages > 1 && page.page && (
            <Pagination page={Number(page.page)} totalPages={page.totalPages} locale={(await params).locale} />
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: ``,
  }
}
