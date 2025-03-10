# 個人用ブックシェルフアプリ

個人の本棚を管理するためのWebアプリケーションです。書籍情報をAmazonから自動取得し、簡単に本の管理ができます。

## 主な機能

- 書籍の登録・表示・削除
- AmazonのURLから書籍情報を自動取得
- タイトル、著者、ジャンルによる検索
- レスポンシブデザイン（スマートフォン対応）

## 技術スタック

- フロントエンド
  - React
  - TypeScript
  - TanStack Query
  - shadcn/ui
  - Tailwind CSS
  - Wouter（ルーティング）

- バックエンド
  - Express
  - Node.js
  - Amazon Product Advertising API

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
3. 必要に応じて情報を編集し、「Add Book」ボタンをクリック
4. 登録した書籍は一覧画面で確認可能
5. 検索バーを使用して、タイトル、著者、ジャンルで書籍を検索

## 注意事項

- Amazon APIの認証情報が設定されていない場合、書籍情報の自動取得時にはモックデータが返されます
- 本番環境での使用時は、必ずAmazon APIの認証情報を設定してください

## ライセンス

MIT
