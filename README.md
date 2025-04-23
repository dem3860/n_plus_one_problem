## N+1 問題の実際のパフォーマンスへの影響を確かめてみる

このプロジェクトでは、Hono + Prisma + neverThrow を用いて User とそれに紐づく Post の全件取得を実装し、include を用いる場合と比較して N+1 問題のパッフォーマンスへの影響を確かめてみます。

---

### 起動方法

1. `.env.example` を `.env` にコピーする

2. パッケージのインストール

```bash
npm install
```

3. Docker で PostgreSQL と API を起動(1 と 2 のどちらかの方法で実行してください。ログをターミナルに直接出したかったら 2 の方で実行してください。)

1.

```bash
docker compose up
```

2. データベースのみ Docker 上で起動させる

```bash
docker compose up pg

npm run dev
```

これで開発環境が立ち上がります。

---

### 初期データ

初期データ投入スクリプトは `seed.ts` にあります。

以下を実行してください：

```bash
npm run seed
```

これで User2000 件と Post が各 User に対して 5 件ずつ、計 10000 件登録されます。

### DB の中を見る

DB の中を見るには prisma studio を開きます。

以下を実行してください :

```bash
npx prisma studio
```

---

### 動作確認

動作確認は swagger からエンドポイントを叩いて確認します。  
データ取得部分に console.time を書いているので取得が終わった時にターミナル上の出力に結果が表示されます。

swagger ではクエリとして"include"と"n_plus_one"を選択するようにしました。これでどちらかを指定して実行することで性能を確かめられます。

---

### 参考資料

- https://hono.dev/examples/zod-openapi
- https://zenn.dev/praha/articles/d1d6462a27e37e
