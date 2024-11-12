import { getLocale } from '@/utilities/getLocale'
import * as React from 'react'

interface Props {
  message: string
}

export const Error: React.FC<Props> = (props) => {
  return <div className="leading-none text-red-500 font-bold text-sm">{props.message}</div>
}
