import { Post } from '@/payload-types';
import Link from 'next/link';
import React from 'react';

interface Props {
  newsPost: Post
}

const monthEn3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getNewsFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = monthEn3[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

export const HomeNewsItem = ({ newsPost }: Props) => {
  const classNames = ["inline-block", "w-[120px]", "text-center", 'bg-grey-200', 'text-textColor'];
  const category = newsPost?.externallink ? 'PRESS' : 'INFO'
  const linkClassNames = 'font-thin w-100 md:flex-1'

  let redirectLink

  if (newsPost.externallink) {
    redirectLink = (
      <a className={linkClassNames} href={newsPost.externallink} target='_blank'>{newsPost.title}</a>
    )
  } else if (!newsPost.content) {
    redirectLink = (
      <span className='font-thin w-100 md:flex-1'>{newsPost.title}</span>
    )
  } else {
    redirectLink = (
      <Link className={linkClassNames} href={`/news/${newsPost.slug?.length ? newsPost.slug : newsPost.id}`}>
        {newsPost.title}
      </Link>
    )
  }


  return (
    <li className='flex flex-wrap items-start justify-start gap-2 border-b border-dashed py-3'>
      <span className='inline-block w-[100px]'>{getNewsFormattedDate(new Date(newsPost.publishedAt))}</span>
      <span className={classNames.join(' ')}>{category}</span>
      {redirectLink || <span className='font-thin w-100 md:flex-1'>{newsPost.title}</span>}
    </li>
  )
}