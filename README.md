# 個人用ブックシェルフアプリ

個人の本棚を管理するためのWebアプリケーションです。書籍情報をAmazonから自動取得し、簡単に本の管理ができます。本の表紙画像付きで見やすく、検索機能も備えています。

## 主な機能

- 書籍の登録・表示・削除
- AmazonのURLから書籍情報を自動取得
  - タイトル、著者、表紙画像
  - 出版年、ジャンル（利用可能な場合）
  - ISBN番号
- タイトル、著者、ジャンルによる検索
- レスポンシブデザイン（スマートフォン対応）
- 美しいグリッドレイアウトでの本棚表示

## 技術スタック

### フロントエンド
- **React 18.3.1** + **TypeScript 5.6.3**
  - 最新のReact機能（Hooks, Suspense）を活用
  - 型安全性の確保とコード品質の向上
- **TanStack Query v5**
  - 効率的なデータフェッチングと状態管理
  - サーバーサイドの状態をクライアントで自動同期
  - キャッシュ管理とリアルタイム更新
- **shadcn/ui**
  - 高品質なUIコンポーネントライブラリ
  - RadixUIをベースにした堅牢なアクセシビリティ
  - カスタマイズ可能なテーマシステム
- **Tailwind CSS v3.4**
  - ユーティリティファーストのCSS設計
  - JIT（Just-In-Time）コンパイラによる最適化
  - レスポンシブデザインの容易な実装
- **Wouter v3.3**
  - 軽量なルーティングライブラリ（1.5KB gzipped）
  - React RouterのAPI互換性
  - シンプルで直感的なルーティング設定
- **Zod v3.23**
  - TypeScriptファーストなバリデーションライブラリ
  - ランタイムでの型チェックと検証
  - スキーマベースのフォームバリデーション

### バックエンド
- **Express v4.21 (Node.js)**
  - RESTful APIの実装
  - ミドルウェアベースのアーキテクチャ
  - エラーハンドリングとルーティング
- **Amazon Product Advertising API v5**
  - 商品情報の自動取得
  - 日本のAmazonマーケットプレイス対応
  - エラー時のフォールバック機能
- **MemStorage（開発用インメモリストレージ）**
  - 高速な開発サイクルの実現
  - インターフェースベースの設計
  - 将来的なデータベース移行を考慮

### 開発ツール
- **Vite v5.4**
  - 高速な開発サーバー
  - 最適化されたビルドプロセス
  - HMR（Hot Module Replacement）対応
- **ESLint & TypeScript**
  - 静的コード解析
  - コーディング規約の自動チェック
  - 型の整合性検証
- **React Hook Form v7**
  - パフォーマンスを考慮したフォーム管理
  - Zodとの統合によるバリデーション
  - 非制御コンポーネントの活用

### アーキテクチャ & デザインパターン
- モジュラーなコンポーネント設計
- フロントエンドとバックエンドの明確な責務分離
- インターフェースベースの抽象化
- サービスレイヤーパターンの採用
- リアクティブな状態管理
- コンポーネントの再利用性を重視

## セットアップ

### 方法1: ローカル環境での実行

1. リポジトリのクローン
```bash
git clone https://github.com/sumikawa/bookshelf-app.git
cd bookshelf-app
```

2. 依存パッケージのインストール
```bash
npm install
```

3. 環境変数の設定
`.env.example`を`.env`にコピーして必要な環境変数を設定：
```bash
cp .env.example .env
```

4. アプリケーションの起動
```bash
npm run dev
```

### 方法2: Dockerを使用した実行

1. リポジトリのクローン
```bash
git clone https://github.com/sumikawa/bookshelf-app.git
cd bookshelf-app
```

2. 環境変数の設定
```bash
cp .env.example .env
```
必要に応じて`.env`ファイルを編集し、Amazon APIの認証情報を設定してください。

3. Dockerコンテナのビルドと起動
```bash
docker-compose up --build
```

アプリケーションは http://localhost:5000 で起動します。

## Amazon APIの設定方法

1. [Amazon Product Advertising API](https://webservices.amazon.com/paapi5/documentation/register-for-pa-api.html) に登録
2. アクセスキーとシークレットキーを取得
3. [Amazonアソシエイトプログラム](https://affiliate.amazon.co.jp/) に登録してパートナータグを取得

## 使用方法

1. 「Add Book」ボタンをクリックして新規書籍登録画面を開く
2. AmazonのURLを入力すると、書籍情報が自動で取得される
   - URLが無い場合は、手動で情報を入力可能
   - タイトル、著者、表紙画像URLは必須項目
   - ISBN、出版年、ジャンルは任意項目
3. 必要に応じて情報を編集し、「Add Book」ボタンをクリック
4. 登録した書籍は一覧画面で確認可能
   - グリッド表示で見やすく整理
   - 表紙画像にマウスオーバーで削除ボタンを表示
5. 検索バーを使用して、タイトル、著者、ジャンルで書籍を検索
   - リアルタイムで検索結果が更新

## 注意事項

- Amazon APIの認証情報が設定されていない場合、書籍情報の自動取得時にはモックデータが返されます
- 本番環境での使用時は、必ずAmazon APIの認証情報を設定してください
- 現在はシングルユーザー用のアプリケーションとして実装されています

## 開発者向け情報

- TypeScriptを使用し、型安全性を確保
- shadcn/uiとTailwind CSSで一貫したデザインシステムを実現
- TanStack Queryによる効率的なデータフェッチングと状態管理
- Zodによる堅牢なバリデーション

## ライセンス

MIT