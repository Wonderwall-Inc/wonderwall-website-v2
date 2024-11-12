import BreadCrumb from '@/components/ui/breadcrumb';
import { generateMeta } from '@/utilities/generateMeta';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { cache } from 'react';
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks';

export default async function Page() {
  const page = await queryPageBySlug()


  return (
    <div className='px-[10px] lg:px-[0px] w-100p lg:w-960 m-auto'>
      <BreadCrumb path="/services" />
      <div className='services'>
        <section className="service">
          <RenderBlocks blocks={page.layout} />
        </section>
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
        equals: 'services'
      }
    }
  })

  return result.docs?.[0] || null
})