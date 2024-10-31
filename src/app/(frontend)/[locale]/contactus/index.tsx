

import BreadCrumb from '@/components/ui/breadcrumb';
import { generateMeta } from '@/utilities/generateMeta';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config'
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { cache } from 'react';

export default async function Page() {
  const page = await queryPageBySlug()
  console.log({ page })
  return (
    <>
      <BreadCrumb path="/contactus" />
      <div className='w720 py-30 md:py-50'>
        <p className='mb-3'>お問い合わせはこちらのフォームより入力してください。<br />
          内容確認後、担当者よりメールにてご返答いたします。</p>
        <p className='mb-3'>なお、サービスのご案内に関するお問い合わせに関しましては、<br />
          ご返信できかねる場合もございますことをご了承ください。</p>
      </div>
    </>
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
    where: {
      slug: {
        equals: 'contactus'
      }
    }
  })

  return result.docs?.[0] || null
})