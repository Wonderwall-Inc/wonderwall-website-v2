import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import RichText from '@/components/RichText'
import BreadCrumb from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap'

export const dynamic = 'force-static'

export default async function Page({ params }) {
  const locale = (await params).locale
  setRequestLocale((await params).locale);
  const t = await getTranslations('recruitmentPage')
  const { slug } = (await params)

  const page = await queryPageBySlug({
    locale,
    slug,
  })

  return (
    <article className="w-100p lg:w-960 px-[15px] lg:m-auto">
      <BreadCrumb path="/recruitment" jobPage={page.jobTitle} />
      < section className="pb-12 text-center" >
        <div className="py-15 text-left md:py-30 lg:py-0">
          <div className="position">
            <h3>{t('jobPageHeader')}</h3>
            <dl>
              <dt>{t('jobSummaryLabel')}</dt>
              <dd>
                <RichText content={page.jobDescription} />
              </dd>
            </dl>
            <dl>
              <dt>{t('jobResponsibilitiesLabel')}</dt>
              <dd>
                <RichText content={page.responsibilities} />
              </dd>
            </dl>
            <dl>
              <dt>{t('jobDesiredSkillsLabel')}</dt>
              <dd>
                <RichText content={page.requiredSkills} />
              </dd>
            </dl>
            <dl>
              <dt>{t('jobNiceToHaveSkillsLabel')}</dt>
              <dd>
                <RichText content={page.niceToHaveSkills} />
              </dd>
            </dl>
            <dl>
              <dt>{t('jobWorkLocationLabel')}</dt>
              <dd>
                <RichText content={page.workLocation} />
              </dd>
            </dl>
            <dl>
              <dt>{t('jobWorkHoursLabel')}</dt>
              <dd>
                <RichText content={page.workHours} />
              </dd>
            </dl>
            <dl>
              <dt>{t('jobSalaryLabel')}</dt>
              <dd>{page.salary}</dd>
            </dl>
            <dl>
              <dt>{t('jobInsuranceLabel')}</dt>
              <dd>
                <RichText content={page.insurance} />
              </dd>
            </dl>
          </div>

          <div className="entry">
            <p className="mb-3">{t('jobContactLabel')}</p>
            <Link href={"/contactus"}>{t('jobContactLinkText')}</Link>
          </div>
        </div>
      </section >
    </article >
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
  const { locale, slug } = (await params)
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobListings',
    draft,
    limit: 1,
    overrideAccess: true,
    locale: urlLocaleToLangCodeMap.get(locale),
    where: {
      slug
    },
  })

  return result.docs?.[0] || null
})