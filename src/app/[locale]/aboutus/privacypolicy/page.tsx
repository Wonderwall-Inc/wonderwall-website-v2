import { generateMeta } from '@/utilities/generateMeta';
import { getPayload } from 'payload';
import configPromise from '@payload-config'
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { cache } from 'react';
import BreadCrumb from '@/components/ui/breadcrumb';
import { RenderBlocks } from '@/blocks/RenderBlocks';
import { setRequestLocale } from 'next-intl/server';
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap';

export const dynamic = 'force-static'

export default async function Page({ params }) {
  const locale = (await params).locale
  setRequestLocale(locale);
  const page = await queryPageBySlug({ locale })

  return (
    <div className="privacy-policy-container px-[15px] lg:px-0">
      <div className="w-100p lg:w-960 m-auto">
        <BreadCrumb breadcrumbs={page.breadcrumbs} path="/privacypolicy" />
      </div>
      <div className='w-100p lg:w-720 m-auto py-[15px] md:py-[30px]'>
        <RenderBlocks blocks={page.layout} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await queryPageBySlug((await params))
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: true,
    locale: urlLocaleToLangCodeMap.get(await locale),
    where: {
      slug: {
        equals: 'privacypolicy'
      }
    }
  })

  return result.docs?.[0] || null
})