# 要件定義書

## 1. プロジェクト概要

本プロジェクトは、ソーシャルゲーム「グランブルーファンタジー」のマルチバトルにおいて、迷惑行為を行うユーザーを個別に管理・通知する仕組みを提供することを目的とする。  
ユーザーごとにブロックリストを作成・管理し、対象ユーザーが自分のバトルに参加した際にアラート通知を行う。将来的にはスマートフォンアプリ版の実装も視野に入れる。

---

## 2. 開発フェーズ

### フェーズ1：ブロックリスト管理機能
- ユーザーが自由にブロックリストを作成・編集・削除できる
- ブロックリストはローカルまたはクラウド上に保存
- UI/UXはシンプルで直感的なものとする

### フェーズ2：ブラウザ拡張機能
- ブラウザ拡張機能として動作
- マルチバトル参加者一覧を自動取得し、ブロックリスト該当者が参加した場合にアラート通知
- 対応ブラウザ：Google Chrome（初期対応）、他ブラウザは今後検討
- 通知方法：ブラウザのネイティブ通知、または画面上へのポップアップ

### フェーズ3：スマホアプリ版
- スマートフォンアプリとしてブロックリスト管理・通知機能を実装
- iOS/Android両対応を目指す
- ブラウザ版とのデータ連携も検討

---

## 3. 機能要件

- ブロックリストの作成・編集・削除
- ブロックリストのインポート・エクスポート
- ブラウザ拡張機能による自動監視・通知
- スマホアプリでのブロックリスト管理・通知

---

## 4. 非機能要件

- データの安全な保存（ローカルストレージ/クラウドストレージ）
- プライバシー保護
- 拡張機能・アプリの安定動作
- UI/UXの一貫性

---

## 5. 技術的前提・制約

- 技術スタックは今後選定（現時点で未定）
- ブラウザ拡張機能はChrome拡張APIを利用
- スマホアプリはクロスプラットフォーム（例：Flutter, React Native等）も検討
- ゲーム側の仕様変更や利用規約に抵触しない範囲で開発を行う

---

## 6. 今後の課題・検討事項

- ブロックリストの共有・同期方法
- 他ブラウザ・他プラットフォーム対応
- ゲーム運営側の規約遵守
- ユーザーインターフェースの改善

---

## 7. ディレクトリ構成（案）

- 今後の開発フェーズに応じて適宜設計・記載

---

## 8. 参考・備考

- 本要件定義は初期ドラフトであり、今後の開発・運用状況に応じて随時更新する 