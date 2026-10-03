import type { Metadata } from 'next'
import Link from 'next/link'
import Brand from './Brand'
import styles from './landing.module.css'

export const metadata: Metadata = {
  title: 'Página não encontrada — Bronze Engenharia de Energia',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link href="/" className={styles.brandLink} aria-label="Bronze Engenharia de Energia — página inicial">
            <Brand />
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
