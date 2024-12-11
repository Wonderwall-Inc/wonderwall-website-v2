import BreadCrumb from '@/components/ui/breadcrumb';
import { generateMeta } from '@/utilities/generateMeta';
import { getPayload } from 'payload';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { cache } from 'react';
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks';
import { setRequestLocale } from 'next-intl/server';
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap';

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }) {
  const locale = (await params).locale
  setRequestLocale(locale);
  const page = await queryPageBySlug({ locale })


  return (
    <div className='px-[15px] lg:px-[0px] w-100p lg:w-960 m-auto'>
      <BreadCrumb breadcrumbs={page.breadcrumbs} path="/services" />
      <div className='services'>
        <section className="service">
          <RenderBlocks blocks={page.layout} />
        </section>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await queryPageBySlug((await params).locale)

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
    locale: urlLocaleToLangCodeMap.get(locale),
    where: {
      slug: {
        equals: 'services'
      }
    }
  })

  return result.docs?.[0] || null
})