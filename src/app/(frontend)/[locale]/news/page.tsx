import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap'
import { HomeNewsItem } from '@/components/Home/HomeNews/NewsItem'
import Link from 'next/link'
import BreadCrumb from '@/components/ui/breadcrumb'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }) {
  const payload = await getPayloadHMR({ config: configPromise })

  const newsPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 5,
    sort: '-publishedAt',
    locale: 'ja',
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
          <div className="px-[10px] py-[15px] m-auto lg:px-0 text-left md:py-[30px]">
            <h2 className="mb-3 text-2xl text-color-primary md:text-3xl lg:text-4xl">News</h2>
            <ul className='mb-5'>
              {newsPosts.docs.map((newsPost, index) => (
                <HomeNewsItem key={index} newsPost={newsPost} />
              ))}
            </ul>
            <div className="text-center">
              <Link
                href="/news"
                className="mx-auto flex h-40 w-100 items-center justify-center rounded-md border border-gray-500 text-color-primary md:w-[240px]"
              >
                MORE
              </Link>
            </div>
          </div>
        </section>

        <div className="container">
          {newsPosts.totalPages > 1 && newsPosts.page && (
            <Pagination page={Number(newsPosts.page)} totalPages={newsPosts.totalPages} locale={(await params).locale} />
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
