import Link from 'next/link';

export function Header() {
  return (
    <header>
      <div>
        <Link href="/">騎空士ブロッカー</Link>
        <nav>
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
