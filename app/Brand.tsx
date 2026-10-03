import styles from './landing.module.css'

/** Text wordmark "Bronze Engenharia · de Energia" (no logo mark for now, by request). */
export default function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={styles.brand} style={{ alignItems: 'baseline', gap: 10 }}>
      <span className={footer ? `${styles.brandName} ${styles.footerBrandName}` : styles.brandName}>Bronze Engenharia</span>
      <span className={footer ? `${styles.brandSub} ${styles.footerBrandSub}` : styles.brandSub}>de Energia</span>
    </span>
  )
}
