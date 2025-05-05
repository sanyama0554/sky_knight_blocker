import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div>
        <div>© {new Date().getFullYear()} 騎空士ブロッカー</div>
        <nav>
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
