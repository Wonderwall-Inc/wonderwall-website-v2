
import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import RichText from '@/components/RichText'

export const dynamic = 'force-static'

export default async function Page({ params }) {
  const { slug = 'home' } = (await params)
  const url = '/' + slug

  const page = await queryPageBySlug({
    slug,
  })

  let richTextFields: any[] = []

  // grab every richtext field to render on the page
  for (let [_, value] of Object.entries(page)) {
    if (value.root) richTextFields = [...richTextFields, value]
  }

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      {richTextFields.map((field, index) => <RichText key={index} content={field} />)}
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
    collection: 'jobListings',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: 'unity-engineer',
      },
    },
  })

  return result.docs?.[0] || null
})