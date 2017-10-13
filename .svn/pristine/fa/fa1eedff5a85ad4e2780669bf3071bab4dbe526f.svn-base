# 開発ガイド(草稿)

雛形アプリをカスタマイズする際に必要な環境構築、設計方針、大枠のディレクトリ戦略についてまとめたもの、、
の、草案です。完成次第docs/PDF等に落とします。

## ディレクトリ構造

```
▸ lib/                                      # npm以外の自作ライブラリ等
▸ scripts/                                  # 開発用スクリプトファイルを格納する
▾ src/                                      # ソースディレクトリ
  ▾ css/                                    # スタイルシートディレクトリ
    ▸ hinagata/                             # 雛形アプリ用のCSSディレクトリ
      application.scss                      # コンパイルの機転となるsassファイル
      base.scss                             
  ▾ js/                                     # jsファイルを格納
    ▾ hinagata/                             # 雛形アプリ固有のロジック用ディレクトリ
      ▸ features/                           # クーポン、スタンプ等の機能単位で、主にviewを格納
      ▸ header/                             # アプリのヘッダ関連のjsファイル
      ▸ login/                              # ログイン画面
      ▸ main_nav/                           # TOP画面(暫定)
      ▸ models/                             # BackboneModel/BackboneCollectionディレクトリ
      ▸ utils/                              # アプリ内で定義したutilファイルディレクトリ
      ▸ views/                              # 共通veiw等を格納するディレクトリ
        app.js                              # グローバルに配置する App オブジェクトの実装
        main.js                             # メイン処理を記述
        main_layout.html          
        main_layout.js
        progress_screen.html        
        router.js                           
      application.js                        # jsコンパイルの機転となるディレクトリ
      vendor.js                             # jquery/backbone等のライブラリ群をまとめてコンパイルするためのjsファイル
▾ web/                                      # applican用webコンテンツ : これをzipに固めてuploadする
  ▸ css/
  ▸ image/
  ▸ js/
  ▸ scratch/
  ▸ slide_menu/
    applican-config.xml
    index.html
    tutorial.html
    whitelist.xml
```

## GetStarted

### ブラウザで動かす

まずはWeb.zipをブラウザで動かします。雛形アプリはAPIをajaxで叩いているので、通常ではCross-Origin制約ではじかれてしまいます。
これを回避するため、ブラウザのセキュリティオプションを変更して起動します。このままの状態でネットサーフィンをするのはおすすめできません。

```
# macの場合
open "/Applications/Google Chrome.app" --args --disable-web-security
```

[参考](http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome)

ブラウザが起動したら、 `web/index.html`を開きます。
初回は「使い方」画面が表示されると思いますので、ブラウザの戻るボタンで戻ってください。



### 雛形アプリの開発をする

雛形アプリの開発/カスタマイズは、以下の三つに分類されます（営業視点ではありません）。
当開発ガイドでは1,2について解説します。

1. web.zipのみの変更 : カラーリングの変更 / 画像の差し替え / 各種URLの変更 / (機能ON-OFF:理想)
2. js及びテンプレートファイル(HTML)の変更
3. ネイティブ部分の変更（SDKの組込み等)

#### 1. web.zipのみの変更

特別な環境構築は必要ありません。zipの圧縮/解答、UTF-8が扱えるテキストエディタさえあれば編集が可能です。

#### 2. JS,テンプレートファイルの変更

###### Requirements

* ruby
    - sassのコンパイルに必要
    - 1.9.7以上推奨
* bundler
    - rubyのパッケージマネージャ:sassコンパイルのライブラリDLに必要
* node.js
* npm
    - node.jsのパッケージマネージャ:各種jsライブラリのDLに必要
* grunt-cli
    - ファイルの修正を監視してビルドする等、ファークフローを提供

以下のコマンドでバージョンが取れれば問題ないです。

```
ruby -v
bundler -v
node -v
npm -v
grunt --version
```

###### 必要ライブラリのDownload/install

プロジェクトディレクトリ(hinagata)直下にて下記コマンドを実行し、必要ライブラリをインストール

```bash
bundle install --path vendor/bundle
npm install
```

新たにvendor,node_modulesディレクトリが作成されていれば成功。

###### リアルタイムビルド開始

下記コマンドを発行すると、 src 以下のファイル変更の監視を始めます。

```
grunt
```

* src/js 以下のファイルを変更すると、jsビルドが走り、 web/js/app.js が更新されます。
* src/css 以下のファイルを変更すると、cssビルドが走り、web/css/app.css が更新されます。

* Gruntで"Fatal error: EMFILE: Too many opened files."と言われる場合は
  * http://yuzuemon.hatenablog.com/entry/2013/10/15/230642

### アプリカンへの配置

以下のコマンドで、既存のWeb.zipを破棄して新しいWeb.zipを作る事ができます。

```
. scripts/create_web_zip.sh
```

## 全体構造

**TODO : 下記を図示**
>
Marionette.jsとUndersocre.js(template)で記述したjsファイル群及び、
SCSSで記述したstyle sheetファイル群をbrowserifyでビルドし、
それぞれ app.js / vendor.js(ライブラリ群) / app.css の３ファイルを出力する。
web.zip内ではこの３ファイルを読み込む。

これとは別にカラーリング変更用のcssファイル`template.css`、
アプリの汎用的な設定を記述する`app_conf.js`はプレーンなjs/cssファイルとしてweb.ip内に配置して読み込む。
こうすることで、カスタマイズ範囲が、先述の変更範囲１に収まる場合、特別な環境を用意する事がなくなる。

## 開発メモ

* 格画面ごとにBackbone.Marionette.LayoutViewを親コントローラとして利用しています。
* ロケーションハッシュの変更を`src/js/hinagata/router.js`及び `src/js/hinagata/features/****/***_router.js'で検知して、対応するレイアウトビューのインスタンスを生成、レンダリングをしています。
* アプリの情報はローカルストレージに保管しています。
* テンプレートはunderscore.jsのテンプレートを用いています。


    ulimit -n 1024
