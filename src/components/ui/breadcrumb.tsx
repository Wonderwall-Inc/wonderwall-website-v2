import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export type BreadCrumbProp = {
  path: string
  jobPage?: string
}

export default function BreadCrumb(props: BreadCrumbProp) {
  const t = useTranslations('urlPaths')

  const paths: {
    path?: string,
    label: string
  }[] = [];

  props.path.split('/').map((path, index, array) => {
    const pathInfo = path !== '' ? path : undefined
    if (!pathInfo) return

    const isLastElement = index + 1 === array.length

    paths.push({
      path: isLastElement && !props.jobPage ? '/' : t(`${pathInfo}.path`),
      label: t(`${pathInfo}.label`),
    })
  });

  return (
    <div className="breadcrumb">
      <ul className="flex justify-start text-center">
        <li>
          <Link href="/">
            {t('home.label')}
          </Link>
        </li>
        {paths.map((path, index) => {
          return (
            <li key={index}>
              {path.path?.length
                ? <Link href={path.path}>{path.label}</Link>
                : <span>{path.label}</span>
              }
            </li>
          )
        })}
        {props.jobPage && (
          <li>
            <span>{props.jobPage}</span>
          </li>
        )}
      </ul>
    </div>
  )
}