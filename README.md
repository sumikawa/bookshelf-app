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
- React + TypeScript
- TanStack Query（データフェッチング）
- shadcn/ui（UIコンポーネント）
- Tailwind CSS（スタイリング）
- Wouter（ルーティング）
- Zod（フォームバリデーション）

### バックエンド
- Express（Node.js）
- Amazon Product Advertising API
- MemStorage（開発用インメモリストレージ）

## セットアップ

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
以下の環境変数を`.env`ファイルに設定してください：

```env
# Amazon Product Advertising API credentials
AMAZON_ACCESS_KEY=your_access_key
AMAZON_SECRET_KEY=your_secret_key
AMAZON_PARTNER_TAG=your_partner_tag
```

4. アプリケーションの起動
```bash
npm run dev
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