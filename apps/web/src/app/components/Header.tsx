import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          騎空士ブロッカー
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/about">使い方</Link>
            </li>
            <li>
              <Link href="/dashboard">ダッシュボード</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
