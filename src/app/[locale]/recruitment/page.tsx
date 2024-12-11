
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import BreadCrumb from '@/components/ui/breadcrumb'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap'
import { Link } from '@/i18n/routing'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }) {
  const locale = (await params).locale
  setRequestLocale(locale);
  const t = await getTranslations('recruitmentPage')
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()

  const result = await payload.find({
    collection: 'jobListings',
    draft,
    limit: 1,
    locale: urlLocaleToLangCodeMap.get(locale)
  })

  return (
    <article className="recruitment-container w-100p lg:w-960 m-auto">
      <BreadCrumb path="/recruitment" />
      <section className="text-center">
        <div className="py-15 text-left md:py-30">
          <p dangerouslySetInnerHTML={{ __html: t('summaryText') }} className='mb-3'></p>

          {result.docs.map(jobListing => (
            <div className='card' key={jobListing.id}>
              <div>
                <h3>{jobListing.jobTitle}</h3>
                <p>{jobListing.jobSummary}</p>
              </div>
              <div className='text-center'>
                <Link href={`/recruitment/${jobListing.slug}`}>
                  {t('buttonText')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: ``,
  }
}

