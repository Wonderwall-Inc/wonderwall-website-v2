'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const [values, setValues] = useState({
    isNavOpen: false,
    isOpened: false,
  });

  const navToggleClick = () => {
    setValues({
      ...values,
      isNavOpen: !values.isNavOpen,
      isOpened: true
    });
  }

  return (
    <header className="font-thin container sticky top-0 z-50 flex items-center flex-col justify-start bg-color-primary text-white-100">
      <div className="flex items-center w-100p justify-between padding-10 lg:padding-y-15 lg:w-960">
        <div className="">
          <Link
            href="/"
          >
            <Image src="/wwg_logo_wide.svg" alt="WonderWall" width={194} height={40} priority={true} />
          </Link>
        </div>
        <div className='flex items-center'>
          <button
            onClick={navToggleClick}
            className={`menu-icon flex h-40 w-60 items-center justify-center rounded-sm hover:bg-green-250 md:hidden ${values.isNavOpen ? 'open' : values.isOpened ? 'close' : ''}`}
          >
            <span className='inline-block h-2 w-full bg-white-100'></span>
          </button>
          <ul className='hidden items-center justify-end gap-15 md:flex md:gap-30'>
            <HeaderNav header={header} isNavOpen={false} />
          </ul>
        </div>
      </div>
      {values.isNavOpen
        ?
        <div className='block w-100p md:hidden'>
          <ul className='text-left'>
            <HeaderNav header={header} isNavOpen={values.isNavOpen} />
          </ul>
        </div>
        : ''
      }
    </header>
  )
}
