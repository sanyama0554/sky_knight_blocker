# 技術スタック

## 共通
- バージョン管理：Git（GitHub）
- CI/CD：GitHub Actions
- ドキュメント：Markdown

## フェーズ1：Webアプリ
- フロントエンド：Next.js（TypeScript）
- UIフレームワーク：MUI または Chakra UI
- 状態管理：Redux Toolkit または React Context
- データ保存：Supabase（無料枠利用、PostgreSQLベース、RLSでセキュリティ管理）
- SSR/SSG：必要に応じて活用

## フェーズ2：ブラウザ拡張機能
- Chrome拡張（Manifest V3対応）
- フレームワーク：React（TypeScript）
- ビルド：Vite または Webpack
- 通知：Chrome拡張API
- データアクセス：SupabaseのREST/GraphQL API

## フェーズ3：スマホアプリ
- クロスプラットフォーム：React Native（TypeScript）またはFlutter（Dart）
- データ同期：Supabase Auth＋DB

## バックエンド
- Hono（Supabase Edge Functions上で運用、Deno/Node.js/Cloudflare Workers等にも対応、軽量・高速なWebフレームワーク）
- Supabase Edge Functions（Honoと組み合わせてサーバーレスAPIを実現、無料枠あり、DB/認証と親和性高）
- Next.js API Routes（Webアプリと一体運用したい場合の補助的選択肢）
- Node.js（Express, Fastify等、必要に応じて拡張）
