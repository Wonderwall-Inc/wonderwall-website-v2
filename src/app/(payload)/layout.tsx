/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react'


import config from '@payload-config'

import './custom.scss'
import { importMap } from './admin/importMap'
import { ServerFunctionClient } from 'payload'

type Args = {
  children: React.ReactNode
}

const serverFunctions: ServerFunctionClient = async args => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout importMap={importMap} config={configPromise} serverFunction={serverFunctions}>
    {children}
  </RootLayout>
)

export default Layout
