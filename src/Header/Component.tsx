import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import configPromise from '@payload-config'

import type { Header } from '@/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getLocale } from '@/utilities/getLocale'

export async function Header() {

  const payload = await getPayloadHMR({ config: configPromise })

  const header = await payload.findGlobal({
    slug: 'header',
    depth: 1,
    locale: getLocale() === 'ja-jp' ? 'ja' : 'en'
  })


  return <HeaderClient header={header} />
}
