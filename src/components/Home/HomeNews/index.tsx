import Link from 'next/link';
import { HomeNewsItem } from './NewsItem';

export type NewsItem = {
  published: Date,
  updated: Date,
  title: string,
  path?: string,
  target?: '_self' | '_blank',
  categories?: NewsCategory[]
}

export type NewsCategory = {
  name: string,
  bgColor?: string,
  textColor?: string,
  path?: string
}

const category_info: NewsCategory = {
  name: 'INFO'
}
/*
const category_event: NewsCategory = {
  name: 'EVENT'
}
*/

const category_press: NewsCategory = {
  name: 'PRESS'
}

export const newsItems: NewsItem[] = [
  {
    published: new Date('2024-08-01'),
    updated: new Date('2024-08-01'),
    title: '新たに正社員として3名が加わり、11カ国から集まるメンバーになりました',
    categories: [category_info],
  },
  {
    published: new Date('2024-03-07'),
    updated: new Date('2024-03-07'),
    title: '開発を手がけるゴルフゲームがテレビアニメ「オーイ！とんぼ」とコラボ',
    categories: [category_press],
    path: 'https://prtimes.jp/main/html/rd/p/000000008.000128440.html',
    target: '_blank',
  },
  {
    published: new Date('2024-03-06'),
    updated: new Date('2024-03-06'),
    title: 'ゲームUIデザイナー, Flutterエンジニア, ブロックチェーンエンジニアの中途採用情報を公開しました。',
    categories: [category_info],
    path: '/recruitment',
  },
  {
    published: new Date('2024-03-11'),
    updated: new Date('2024-03-11'),
    title: '東京の新橋に新オフィスを開設しました',
    categories: [category_info],
  },
  {
    published: new Date('2024-03-06'),
    updated: new Date('2024-03-06'),
    title: 'Unityエンジニア, ゲームプランナー, WEBエンジニアの中途採用情報を公開しました。',
    categories: [category_info],
    path: '/recruitment',
  },
  {
    published: new Date('2023-11-17'),
    updated: new Date('2023-11-17'),
    title: 'GOLFINプロジェクトにて大西翔太プロコーチとアンバサダー契約を締結いたしました',
    categories: [category_press],
    path: 'https://prtimes.jp/main/html/rd/p/000000004.000128440.html',
    target: '_blank',
  },
  {
    published: new Date('2023-11-02'),
    updated: new Date('2023-11-02'),
    title: 'SBINFT株式会社とパートナーシップ契約を締結いたしました',
    categories: [category_press],
    path: 'https://prtimes.jp/main/html/rd/p/000000002.000128440.html',
    target: '_blank',
  },
  {
    published: new Date('2023-07-19'),
    updated: new Date('2023-07-19'),
    title: 'Zaif INOを運営する株式会社カイカフィナンシャルホールディングスと業務提携契約を締結いたしました',
    categories: [category_press],
    path: 'https://prtimes.jp/main/html/rd/p/000000166.000097511.html',
    target: '_blank',
  },
  /*
    // closed
    {
        published: new Date('2023-05-29'),
        updated: new Date('2023-05-29'),
        title: '本日よりアメリカからのインターン生2名を受け入れました',
        categories: [category_info],
    },
    {
        published: new Date('2023-03-27'),
        updated: new Date('2023-03-27'),
        title: 'ホームページをリニューアルしました',
        categories: [category_info]
    },
   */
];

export const HomeNews = () => {
  return (
    <section className="text-center">
      <div className="w-100p lg:w-960 px-[10px] py-[15px] m-auto lg:px-0 text-left md:py-[30px]">
        <h2 className="mb-3 text-2xl text-color-primary md:text-3xl lg:text-4xl">News</h2>
        <ul className='mb-5'>
          {newsItems.map((newsItem, index) => (
            <HomeNewsItem key={index} newsItem={newsItem} />
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