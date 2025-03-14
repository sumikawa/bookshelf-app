# Node.js 20をベースイメージとして使用
FROM node:20-slim

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# 開発サーバーのポートを公開
EXPOSE 5000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
