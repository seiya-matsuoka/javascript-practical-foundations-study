# JavaScript Practical Foundations Study

<p>
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES202x-F7DF1E?logo=javascript&logoColor=000000">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-Study-F7DF1E?logo=javascript&logoColor=000000">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=ffffff">
  <img alt="npm" src="https://img.shields.io/badge/npm-Scripts-CB3837?logo=npm&logoColor=ffffff">
</p>

JavaScript の基礎を、コードリーディング中心で体系的に学習するためのリポジトリ。  
基本構文だけでなく、**値・型 / スコープ / 参照 / 関数 / オブジェクト / 配列 / 標準組み込み object / エラー処理 / 非同期処理 / class / DOM / Node.js / JSON** を扱う。  
各 Unit ごとにソースコードとドキュメントを用意し、コード、コメント、出力、確認用の `assert`、ドキュメントを対応づけながら見返せる形で整理している。

---

## このリポジトリの位置づけ

このリポジトリは、TypeScript / React の学習に進む前に、JavaScript の基礎、JavaScript らしい書き方、実務で頻出する標準機能を整理するための `javascript-practical-foundations-study` である。

JavaScript は、ブラウザ側でも Node.js 側でも使われる。  
そのため、このリポジトリでは、言語仕様の基本だけでなく、実務でコードを読むときに頻出する次の要素もまとめて扱う。

- ES Modules
- npm scripts
- 値・型・比較・型変換
- 参照共有と shallow copy
- callback / 高階関数 / closure
- object / array のデータ変換
- Promise / async / await / fetch
- DOM / event / form / storage
- Node.js 基本 API
- JSON / API レスポンス処理
- 実務的な小さな関数分割
- JavaScript の落とし穴

このリポジトリは、TypeScript や React の前提になる JavaScript の土台を、コードを読みながら確認できる形で残すことを目的とする。

---

## 学習目的

このリポジトリでは、主に次の内容を目的として学習を行う。

- JavaScript の実行環境、Node.js、ブラウザ、ES Modules、npm scripts の基本を理解する
- 値、型、比較、型変換、truthy / falsy を説明できるようにする
- `let` / `const`、スコープ、巻き上げ、TDZ、参照共有を理解する
- 関数、callback、高階関数、closure を読めるようにする
- object、分割代入、spread、非破壊更新、shallow copy を理解する
- `map` / `filter` / `reduce` など、配列を使った実務的なデータ変換を読めるようにする
- Map、Set、文字列、正規表現、数値、Date、Intl の基本を理解する
- エラー処理、validation、失敗を戻り値として扱う設計を確認する
- Promise、async / await、event loop、fetch の基本を理解する
- class、prototype、`this`、iterable、generator の概要を理解する
- DOM、event、form、storage などブラウザ環境の基礎を押さえる
- Node.js 基本 API、JSON、実務的な小さな設計パターン、JavaScript の落とし穴を整理する
- ソースコード、コメント、出力結果、`assert`、ドキュメントを対応させながら処理を追えるようにする

---

## 学習範囲

このリポジトリで扱う Unit は次の通り。

| Unit | 内容                                                               |
| ---- | ------------------------------------------------------------------ |
| 01   | JavaScript の実行環境・リポジトリ基礎・モジュール入門              |
| 02   | 値・型・比較・型変換                                               |
| 03   | 変数宣言・スコープ・巻き上げ・参照                                 |
| 04   | 関数・コールバック・高階関数・クロージャ                           |
| 05   | オブジェクト・分割代入・スプレッド・非破壊更新                     |
| 06   | 配列操作・データ変換・実務的なコレクション処理                     |
| 07   | Map・Set・文字列・正規表現・数値・Date・Intl                       |
| 08   | エラー処理・バリデーション・失敗の扱い                             |
| 09   | Promise・async/await・イベントループ・fetch                        |
| 10   | class・prototype・this・iterable・generator                        |
| 11   | ブラウザ JavaScript・DOM・イベント・フォーム・ストレージ           |
| 12   | Node.js 基本 API・JSON・実務的な小さな設計パターン・落とし穴まとめ |

### 各 Unit の位置づけ

- **Unit 01: JavaScript の実行環境・リポジトリ基礎・モジュール入門**  
  Node.js で JavaScript を実行する流れ、`package.json`、npm scripts、ES Modules、named export / default export、module scope を確認する。

- **Unit 02: 値・型・比較・型変換**  
  primitive / object、`typeof`、`null` / `undefined`、`NaN`、strict equality、loose equality、明示的な型変換、truthy / falsy を確認する。

- **Unit 03: 変数宣言・スコープ・巻き上げ・参照**  
  `let` / `const`、scope、hoisting、TDZ、primitive と object の違い、object / array の参照共有、shallow copy、`Object.freeze` を確認する。

- **Unit 04: 関数・コールバック・高階関数・クロージャ**  
  function declaration / expression、arrow function、default parameter、rest parameter、callback、高階関数、pure function、副作用、lexical scope、closure を確認する。

- **Unit 05: オブジェクト・分割代入・スプレッド・非破壊更新**  
  object literal、computed property、分割代入、nested destructuring、rest property、options object、spread、structured clone、immutable update を確認する。

- **Unit 06: 配列操作・データ変換・実務的なコレクション処理**  
  破壊的 / 非破壊的な配列操作、`for...of`、`forEach`、`map`、`filter`、`find`、`some`、`every`、`reduce`、method chain、group by、deduplication を確認する。

- **Unit 07: Map・Set・文字列・正規表現・数値・Date・Intl**  
  Set による重複除去、Map の基本、WeakMap / WeakSet、文字列操作、正規表現、数値処理、Date、Intl を確認する。

- **Unit 08: エラー処理・バリデーション・失敗の扱い**  
  `throw`、`try...catch...finally`、custom error、validation result object、fail fast、error boundary、async try-catch、Promise rejection、API response failure を確認する。

- **Unit 09: Promise・async/await・イベントループ・fetch**  
  同期処理と非同期処理、event loop、task queue、microtask queue、callback、Promise、`then` / `catch` / `finally`、async / await、逐次実行、並列実行、fetch、AbortController を確認する。

- **Unit 10: class・prototype・this・iterable・generator**  
  `this` の決まり方、`bind` / `call` / `apply`、class、private field、getter / setter、extends、prototype、object literal / factory function / class の違い、iterable、iterator、generator を確認する。

- **Unit 11: ブラウザ JavaScript・DOM・イベント・フォーム・ストレージ**  
  `window`、`document`、DOM ツリー、要素取得、`textContent`、`classList`、`dataset`、style 操作、要素作成、event、event delegation、form、storage、ブラウザでの fetch、URL を確認する。

- **Unit 12: Node.js 基本 API・JSON・実務的な小さな設計パターン・落とし穴まとめ**  
  `process`、環境変数、コマンドライン引数、`node:fs/promises`、`node:path`、JSON、API レスポンス処理、mapper / predicate / validator / formatter / normalizer、JavaScript の落とし穴を確認する。

---

## 学習の進め方

基本的な進め方は次の通り。

1. `docs/` の対象 Unit の Markdown を読む
2. `npm run unit:XX` で対象 Unit を実行する
3. `src/<unit>/index.js` から呼び出される各テーマ別ファイルを読む
4. ソースコード内のコメントと出力結果を対応させながら処理を追う
5. 各ファイルの `assert` で、期待値との対応を確認する
6. 必要に応じて値を書き換え、再実行して挙動を確認する

このリポジトリでは、ソースコード単体でも処理を追えるようにコメントを記載している。  
ドキュメントは、各 Unit の学習対象、読む順番、注目ポイント、引っかかりやすい点、実務でよく使う場面、TypeScript / React につながるポイントを確認するための補助資料として使う。

Unit 11 はブラウザ実行前提のため、`npm run unit:XX` ではなく、HTML ファイルをブラウザで開いて確認する。

---

## 前提環境

- Node.js 24 系
- npm
- VS Code
- ESLint
- Prettier
- ブラウザ

このリポジトリでは、Node.js 24 系を前提にする。  
ソースコードは ES Modules として実行する。  
テストフレームワークは使わず、Node.js 標準の `node:assert/strict` を使って期待値を確認する。

---

## セットアップ

### 1. Node.js のバージョンを確認

```bash
node -v
```

想定するメジャーバージョンは次の通り。

```text
v24.x.x
```

### 2. npm のバージョンを確認

```bash
npm -v
```

### 3. `.nvmrc` を使って Node.js を切り替える

nvm を使っている場合は、リポジトリ直下で次を実行する。

```bash
nvm use
```

### 4. 依存関係をインストール

```bash
npm ci
```

---

## 実行方法

### Unit 01: JavaScript の実行環境・リポジトリ基礎・モジュール入門

```bash
npm run unit:01
```

### Unit 02: 値・型・比較・型変換

```bash
npm run unit:02
```

### Unit 03: 変数宣言・スコープ・巻き上げ・参照

```bash
npm run unit:03
```

### Unit 04: 関数・コールバック・高階関数・クロージャ

```bash
npm run unit:04
```

### Unit 05: オブジェクト・分割代入・スプレッド・非破壊更新

```bash
npm run unit:05
```

### Unit 06: 配列操作・データ変換・実務的なコレクション処理

```bash
npm run unit:06
```

### Unit 07: Map・Set・文字列・正規表現・数値・Date・Intl

```bash
npm run unit:07
```

### Unit 08: エラー処理・バリデーション・失敗の扱い

```bash
npm run unit:08
```

### Unit 09: Promise・async/await・イベントループ・fetch

```bash
npm run unit:09
```

### Unit 10: class・prototype・this・iterable・generator

```bash
npm run unit:10
```

### Unit 11: ブラウザ JavaScript・DOM・イベント・フォーム・ストレージ

Unit 11 はブラウザで確認する。

```text
src/11-browser-dom-events-form/index.html
```

### Unit 12: Node.js 基本 API・JSON・実務的な小さな設計パターン・落とし穴まとめ

```bash
npm run unit:12
```

---

## Lint / Format

ESLint を確認する場合は次を実行する。

```bash
npm run lint
```

Prettier の整形チェックを行う場合は次を実行する。

```bash
npm run format:check
```

整形が必要な場合は次を実行する。

```bash
npm run format
```

---

## リポジトリ構成

主要な構成は次の通り。

```text
.
├─ docs/
│  ├─ 01-runtime-module-basics.md
│  ├─ 02-values-types-comparison.md
│  ├─ 03-variables-scope-reference.md
│  ├─ 04-functions-callbacks-closure.md
│  ├─ 05-objects-destructuring-immutability.md
│  ├─ 06-arrays-data-transform.md
│  ├─ 07-builtins-string-regexp-date.md
│  ├─ 08-error-handling-validation.md
│  ├─ 09-async-promise-fetch.md
│  ├─ 10-class-prototype-this-iterable.md
│  ├─ 11-browser-dom-events-form.md
│  └─ 12-node-json-practical-patterns.md
│
├─ src/
│  ├─ 01-runtime-module-basics/
│  ├─ 02-values-types-comparison/
│  ├─ 03-variables-scope-reference/
│  ├─ 04-functions-callbacks-closure/
│  ├─ 05-objects-destructuring-immutability/
│  ├─ 06-arrays-data-transform/
│  ├─ 07-builtins-string-regexp-date/
│  ├─ 08-error-handling-validation/
│  ├─ 09-async-promise-fetch/
│  ├─ 10-class-prototype-this-iterable/
│  ├─ 11-browser-dom-events-form/
│  └─ 12-node-json-practical-patterns/
│
├─ .vscode/
├─ .nvmrc
├─ eslint.config.js
├─ package.json
├─ package-lock.json
└─ README.md
```

### 各ディレクトリ・ファイルの役割

- `docs/`
  - 各 Unit の学習対象、実行方法、読む順番、注目ポイント、引っかかりやすい点、実務でよく使う場面、TypeScript / React につながるポイントをまとめる。
- `src/`
  - 各 Unit のソースコードを配置する。
- `src/<unit>/index.js`
  - 各 Unit の実行入口。
- `src/<unit>/*.js`
  - Unit 内のテーマ別サンプル。
- `src/<unit>/fixtures/`
  - JSON や表示用データなど、対象 Unit で使う固定データを配置する。
- `.vscode/`
  - VS Code での編集、保存時整形、推奨拡張機能などの設定を配置する。
- `.nvmrc`
  - 使用する Node.js のメジャーバージョンを示す。
- `eslint.config.js`
  - ESLint Flat Config を定義する。
- `package.json`
  - npm scripts、ES Modules 設定、開発用依存関係を定義する。
- `package-lock.json`
  - npm の lock ファイル。

---

## ドキュメント

各 Unit の詳細は次の Markdown にまとめている。

- JavaScript の実行環境・リポジトリ基礎・モジュール入門: [`docs/01-runtime-module-basics.md`](docs/01-runtime-module-basics.md)
- 値・型・比較・型変換: [`docs/02-values-types-comparison.md`](docs/02-values-types-comparison.md)
- 変数宣言・スコープ・巻き上げ・参照: [`docs/03-variables-scope-reference.md`](docs/03-variables-scope-reference.md)
- 関数・コールバック・高階関数・クロージャ: [`docs/04-functions-callbacks-closure.md`](docs/04-functions-callbacks-closure.md)
- オブジェクト・分割代入・スプレッド・非破壊更新: [`docs/05-objects-destructuring-immutability.md`](docs/05-objects-destructuring-immutability.md)
- 配列操作・データ変換・実務的なコレクション処理: [`docs/06-arrays-data-transform.md`](docs/06-arrays-data-transform.md)
- Map・Set・文字列・正規表現・数値・Date・Intl: [`docs/07-builtins-string-regexp-date.md`](docs/07-builtins-string-regexp-date.md)
- エラー処理・バリデーション・失敗の扱い: [`docs/08-error-handling-validation.md`](docs/08-error-handling-validation.md)
- Promise・async/await・イベントループ・fetch: [`docs/09-async-promise-fetch.md`](docs/09-async-promise-fetch.md)
- class・prototype・this・iterable・generator: [`docs/10-class-prototype-this-iterable.md`](docs/10-class-prototype-this-iterable.md)
- ブラウザ JavaScript・DOM・イベント・フォーム・ストレージ: [`docs/11-browser-dom-events-form.md`](docs/11-browser-dom-events-form.md)
- Node.js 基本 API・JSON・実務的な小さな設計パターン・落とし穴まとめ: [`docs/12-node-json-practical-patterns.md`](docs/12-node-json-practical-patterns.md)

---

## このリポジトリで確認できること

このリポジトリでは、次の内容をコードとドキュメントで確認できる。

- JavaScript の実行環境、ES Modules、npm scripts の基本
- 値、型、比較、型変換、truthy / falsy
- `let` / `const`、scope、hoisting、TDZ
- primitive と object の違い
- object / array の参照共有、shallow copy、非破壊更新
- function、callback、高階関数、closure
- object、分割代入、spread、options object
- 配列操作と実務的なデータ変換
- Map、Set、文字列、正規表現、数値、Date、Intl
- エラー処理、validation、失敗の扱い
- Promise、async / await、event loop、fetch、AbortController
- class、prototype、`this`、iterable、generator
- DOM、event、form、storage、URL
- Node.js 基本 API、JSON、API レスポンス処理
- mapper / predicate / validator / formatter / normalizer
- guard clause、lookup object、strategy object 的な分岐、データ変換パイプライン
- `==`、truthy / falsy、`NaN`、`sort`、`forEach` と async、Date、timezone などの落とし穴

---

## TypeScript / React への接続

このリポジトリで扱う内容は、TypeScript / React の学習にもつながる。

- TypeScript では、JavaScript の値、object、array、function を前提に型を付ける
- React では、分割代入、spread、非破壊更新、array method、callback、closure が頻出する
- API 通信では、Promise、async / await、fetch、JSON、response handling が必要になる
- form や event を扱う場面では、ブラウザ JavaScript の event object や input の基本が前提になる
- class を直接使う機会が少なくても、prototype、`this`、iterable の知識は既存コードや標準 API の理解に役立つ
- Node.js 側の JavaScript を知ることで、開発環境、npm scripts、JSON、ファイル操作、ツール実行の流れを追いやすくなる

JavaScript の基礎を一通り確認したうえで、TypeScript では型の付け方、React では UI と state の扱いに進む。
