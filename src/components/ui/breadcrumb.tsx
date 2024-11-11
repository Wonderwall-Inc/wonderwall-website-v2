import { urlPaths } from '@/constants/urlPaths';
import Link from 'next/link';

export type BreadCrumbProp = {
  path: string,
}

export default function BreadCrumb(props: BreadCrumbProp) {

  const paths: {
    path?: string,
    label: string
  }[] = [];

  props.path.split('/').map((path, index, array) => {
    const fullpath = array.slice(0, index + 1).join('/');
    const pathInfo = urlPaths.find(info => info.path === (fullpath === '' ? '/' : fullpath));
    paths.push({
      path: (pathInfo && props.path === pathInfo?.path) ? undefined : pathInfo?.path ?? undefined,
      label: pathInfo?.pageTitle ?? pathInfo?.label ?? ''
    });
  });

  return (
    <div className="breadcrumb">
      <ul className="flex justify-start text-center">
        {paths.map((path, index) => {
          return (
            <li key={`breadcrumb_li_${index}`}>
              {path.path
                ? <Link key={`breadcrumb_${index}`} href={path.path}>{path.label}</Link>
                : <span key={`breadcrumb_${index}`}>{path.label}</span>
              }
            </li>
          )
        })}
      </ul>
    </div>
  )
}