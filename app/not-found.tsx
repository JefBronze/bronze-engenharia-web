import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './landing.module.css'

export const metadata: Metadata = {
  title: 'Página não encontrada — Data Joule',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link href="/" className={styles.brandLink} aria-label="Data Joule — página inicial">
            <svg width={26} height={26} viewBox="0 0 36 36" aria-hidden="true" style={{ flex: 'none' }}>
              <rect x="4" y="22" width="6" height="10" fill="#1A1917" />
              <rect x="13" y="16" width="6" height="16" fill="#1A1917" />
              <rect x="22" y="12" width="6" height="20" fill="#1A1917" />
              <rect x="2" y="5" width="32" height="3" fill="#B5561A" />
            </svg>
            <span className={styles.wordmark}>
              Data<span className={styles.wordmarkAccent}>_</span>Joule
            </span>
          </Link>
        </div>
      </header>

      <main className={`${styles.container} ${styles.notFound}`}>
        <p className={styles.notFoundCode}>404</p>
        <h1 className={styles.notFoundTitle}>Esta página não existe.</h1>
        <p className={styles.notFoundText}>
          O endereço pode ter mudado ou nunca ter existido. Tudo o que oferecemos está na página inicial.
        </p>
        <Link href="/" className={styles.ctaPrimary}>
          Ir para a página inicial
        </Link>
      </main>
    </div>
  )
}
