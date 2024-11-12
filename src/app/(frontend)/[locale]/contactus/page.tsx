

import { generateMeta } from '@/utilities/generateMeta';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config'
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { cache } from 'react';
import BreadCrumb from '@/components/ui/breadcrumb';
import { RenderBlocks } from '@/blocks/RenderBlocks';

export default async function Page() {
  const page = await queryPageBySlug()
  return (
    <div className="px-[15px] lg:px-0">
      <div className="w-960 m-auto">
        <BreadCrumb path="/contactus" />
      </div>
      <div className='contact-form w-100p lg:w-720 m-auto py-[15px] md:py-[30px]'>
        <RenderBlocks blocks={page.layout} />
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug()

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: true,
    locale: 'ja',
    where: {
      slug: {
        equals: 'contactus'
      }
    }
  })

  return result.docs?.[0] || null
})