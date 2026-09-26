'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from '../lib/i18n'

export function TitleUpdater() {
  const { t } = useLocale()
  const pathname = usePathname()
  // Routes with their own static metadata (e.g. the PT-BR audit landing) keep their title.
  const ownTitle = pathname?.startsWith('/auditoria')

  useEffect(() => {
    if (ownTitle) return
    document.title = t.site_title
  }, [t.site_title, ownTitle])

  return null
}
