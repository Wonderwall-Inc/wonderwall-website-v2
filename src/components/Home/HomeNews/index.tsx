import Link from 'next/link';
import { HomeNewsItem } from './NewsItem';
import { getPayload } from 'payload';
import configPromise from '@payload-config'
import { getLocale, getTranslations } from 'next-intl/server';
import { urlLocaleToLangCodeMap } from '@/constants/urlLocaleToLangCodeMap';

export const HomeNews = async () => {
  const locale = await getLocale()
  const t = await getTranslations('homePage')
  const payload = await getPayload({ config: configPromise })

  const newsPosts = await payload.find({
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
    <section className="text-center">
      <div className="w-100p lg:w-960 px-[15px] py-[15px] m-auto lg:px-0 text-left md:py-[30px]">
        <h2 className="mb-3 text-2xl text-color-primary md:text-3xl lg:text-4xl">{t('newsLabel')}</h2>
        <ul className='mb-5'>
          {newsPosts.docs.map((newsPost, index) => (
            <HomeNewsItem key={index} newsPost={newsPost} />
          ))}
        </ul>
        <div className="text-center">
          <Link
            href="/news"
            className="mx-auto flex items-center justify-center rounded-md border border-gray-500 text-color-primary md:w-[240px]"
          >
            MORE
          </Link>
        </div>
      </div>
    </section>
  )
}