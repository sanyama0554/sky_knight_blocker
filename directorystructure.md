# ディレクトリ構成案

/
├── apps/
│   ├── web/                # Next.js (TypeScript) Webアプリ本体
│   ├── extension/          # ブラウザ拡張（React, TypeScript, Vite/Webpack）
│   └── mobile/             # スマホアプリ（React Native or Flutter）
│
├── packages/
│   ├── api/                # Hono（Supabase Edge Functions）API
│   ├── shared/             # 共通ロジック・型定義・ユーティリティ
│   └── ui/                 # 共通UIコンポーネント（必要に応じて）
│
├── docs/                   # ドキュメント（要件定義・設計・運用手順等）
│
├── .github/                # GitHub Actions等CI/CD設定
├── node_modules/
├── package.json
├── pnpm-workspace.yaml     # モノレポ管理用（pnpmの場合）
├── turbo.json              # タスクランナー設定（Turborepo等利用時）
├── tsconfig.base.json      # 共通TypeScript設定
├── README.md
├── requirement.md
├── technologystack.md
├── directorystructure.md
└── ...（その他設定ファイル）
