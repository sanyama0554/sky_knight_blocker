import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} 騎空士ブロッカー
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/privacy">プライバシーポリシー</Link>
            </li>
            <li>
              <Link href="/terms">利用規約</Link>
            </li>
            <li>
              <Link href="/contact">お問い合わせ</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
