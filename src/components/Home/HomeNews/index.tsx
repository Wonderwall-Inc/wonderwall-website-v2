import Link from 'next/link';
import { HomeNewsItem } from './NewsItem';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config'

export const HomeNews = async () => {
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
    <section className="text-center">
      <div className="w-100p lg:w-960 px-[10px] py-[15px] m-auto lg:px-0 text-left md:py-[30px]">
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
  )
}