import React from 'react';

type NewsItemProp = {
  newsItem: any
}

const monthEn3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getNewsFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = monthEn3[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

export const HomeNewsItem = (props: NewsItemProp) => {

  return (
    <li className='flex flex-wrap items-start justify-start gap-2 border-b border-dashed py-3'>
      <span className='inline-block w-[100px]'>{getNewsFormattedDate(props.newsItem.published)}</span>
      {props.newsItem.categories?.map((category, index) => {

        const bgColor = category.bgColor ? `bg-[${category.bgColor}]` : 'bg-gray-200';
        const textColor = category.textColor ? `text-[${category.textColor}]` : 'text-textColor';
        const classNames = ["inline-block", "w-[120px]", "text-center", bgColor, textColor];

        return (
          <span
            key={index}
            className={classNames.join(' ')}
          >{category.name}</span>
        )
      })}
      {props.newsItem.path != null
        ? <a className='font-thin w-100 md:flex-1' href={props.newsItem.path} target={props.newsItem.target ?? '_self'}>{props.newsItem.title}</a>
        : <span className='font-thin w-100 md:flex-1'>{props.newsItem.title}</span>
      }
    </li>
  )
}