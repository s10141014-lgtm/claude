# はじめての資産運用ノート

投資初心者向けに、新NISA・iDeCo・証券口座の選び方などを解説するアフィリエイトサイトです。
A8.net の広告を掲載して収益化することを目的にしています。

- サイト生成：Jekyll（記事は Markdown ファイルで書きます）
- 公開先：Cloudflare Pages（無料・商用利用OK）

> **GitHub Pages では公開しないでください。** GitHub の利用規約では、広告・宣伝が主な目的のサイトや商用サイトに GitHub Pages を使うことが認められていません。コードの保管場所として GitHub を使い、公開は Cloudflare Pages で行います。

---

## 1. サイトを公開する（Cloudflare Pages・初回のみ）

1. [Cloudflare](https://dash.cloudflare.com/sign-up) で無料アカウントを作る
2. ダッシュボードの「Workers & Pages」から、**Pages** のプロジェクトを作成し、「Git に接続」を選ぶ
3. GitHub と連携して、リポジトリ `s10141014-lgtm/claude` を選ぶ
4. ビルドの設定を次のようにする

   | 項目 | 設定する値 |
   |---|---|
   | プロジェクト名 | `shisan-note`（使えない場合は別の名前でOK） |
   | 本番ブランチ | `main` |
   | フレームワーク プリセット | Jekyll |
   | ビルドコマンド | `bundle exec jekyll build` |
   | ビルド出力ディレクトリ | `_site` |

5. 「保存してデプロイ」を押すと、数分で `https://（プロジェクト名）.pages.dev` で公開されます
6. 公開URLが `https://shisan-note.pages.dev` と違う場合は、`_config.yml` の `url` を実際のURLに書き換えます

以後は、GitHub の `main` ブランチを更新するたびに自動でサイトが更新されます。

**独自ドメイン（例：`shisan-note.com`）の取得もおすすめです。** 年1,000〜2,000円程度で、サイトの信頼感が上がり、検索エンジンからの評価も積み上げやすくなります。取得したら Cloudflare Pages の「カスタムドメイン」に設定し、`_config.yml` の `url` を書き換えてください。

---

## 2. A8.net に申し込む前のチェックリスト

- [ ] `_config.yml` の `contact_form_url`（Googleフォームなど）か `contact_email` を設定した
- [ ] `_config.yml` の `author.name` を自分のニックネームなどに変えた
- [ ] サイトが公開され、スマホで表示を確認した
- [ ] 記事の内容を一度読み、気になる点がないか確認した

チェックが終わったら、

1. [A8.net](https://www.a8.net/) でメディア会員に登録し、公開したサイトのURLを登録します（カテゴリは「マネー・金融」など）
2. 「プログラム検索」で「証券」「NISA」などと検索し、紹介したいプログラムに提携申請します
3. 広告主の審査に通ったら、広告リンクを作成します（次の「3」へ）

---

## 3. A8.net の広告リンクを貼る

`_data/brokers.yml` を開き、提携できた証券会社の `a8_text` に、A8 の **テキストリンク** の広告コードを貼り付けます。

```yaml
- id: sbi
  name: SBI証券
  ...
  a8_text: |
    <a href="https://px.a8.net/svt/ejp?a8mat=XXXXXX" rel="nofollow">SBI証券の口座開設はこちら</a>
    <img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=XXXXXX" alt="">
```

- `|` の次の行から、**行頭にスペース4つ**を入れて貼ります
- ボタンの文字は、`<a ...>` と `</a>` の間の文字です
- 貼るだけで、サイト内のその証券会社のボタンがすべて広告リンクに切り替わり、ボタンの近くに「PR」表示も自動で付きます
- 空欄のままの会社は、公式サイトへの通常リンクのままです
- A8 で提携できる証券会社が5社と違う場合は、カードを追加・削除してかまいません

**広告のルールに注意：** 広告主ごとに「使ってはいけない表現」などのルールがあります。プログラムの詳細ページで確認してください。「必ず儲かる」「元本保証」などの表現は使わないでください。

---

## 4. 記事を追加する

`_posts` フォルダに、`2026-11-05-記事の英語名.md` のような名前でファイルを作ります。
（ファイル名の英語部分が、そのまま記事のURLになります）

```markdown
---
title: 記事のタイトル
description: 検索結果に表示される説明文（100文字前後）
category: 新NISA
date: 2026-11-05 07:00:00 +0900
summary:
  - この記事でわかること1
  - この記事でわかること2
sources:
  - title: 参考にした公式情報の名前
    url: https://...
---

ここに本文を書きます。

## 見出し

本文…

{% include cta.html id="sbi" %}
```

記事の中で使える部品：

| 書き方 | 表示されるもの |
|---|---|
| `{% include cta.html id="sbi" %}` | 証券会社のボタン（`id` は brokers.yml の id） |
| `{% include broker-card.html id="rakuten" %}` | 証券会社の紹介カード1枚 |
| `{% include broker-section.html title="見出し" %}` | 見出し＋注意書き＋全社のカード |
| `<div class="box point" markdown="1">` ～ `</div>` | 緑色のポイント枠 |
| `<div class="box caution" markdown="1">` ～ `</div>` | 黄色の注意枠 |

Claude Code に「○○についての記事を追加して」と頼めば、このルールに沿って記事を書いてくれます。

---

## 5. 定期的にやること

- **制度・手数料情報の更新**：`_data/brokers.yml` の特徴や、記事中の制度情報（NISA・iDeCo）が古くなっていないか、数か月に1回は公式サイトで確認する
- **ステマ規制への対応を続ける**：広告を含むページには「PR」「広告」と分かる表示を残す（ヘッダーと記事冒頭に自動で表示されます）

---

## ファイル構成

```
_config.yml           サイト名・URL・お問い合わせ先などの設定
_data/brokers.yml     証券会社の情報と A8 広告コード
_data/navigation.yml  ヘッダーのメニュー
_posts/               記事（Markdown）
_includes/            ボタン・カードなどの部品
_layouts/             ページのひな形
assets/css/style.css  デザイン
assets/js/            目次・シミュレーターのプログラム
index.html            トップページ
simulator.html        積立シミュレーター
about.md / privacy-policy.md / contact.md  運営者情報・プライバシーポリシー・お問い合わせ
```

## 手元で表示を確認する（任意）

```bash
bundle install
bundle exec jekyll serve
```

ブラウザで http://localhost:4000 を開くと確認できます。
