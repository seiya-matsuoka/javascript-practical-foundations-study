# 07. Map・Set・文字列・正規表現・数値・Date・Intl

## 1. 学習対象

この単位では、JavaScript 標準組み込みオブジェクトと、実務でよく使う基本処理をまとめて扱う。  
`Map` / `Set`、文字列処理、正規表現、数値処理、`Date`、`Intl` は、API レスポンス処理、入力値検証、表示用データ整形、日付表示などで頻出する。

特に、標準組み込み機能の中でも実務で出会いやすいものを省略せず扱う。  
単体の API 名を覚えるというより、「どの場面でどの標準機能を使うか」を確認する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- `Set`
- 重複除去
- `Map`
- object との違い
- key にオブジェクトを使えること
- `WeakMap`
- `WeakSet`
- template literal
- `includes`
- `startsWith`
- `endsWith`
- `slice`
- `split`
- `replace`
- `replaceAll`
- `trim`
- `padStart`
- `padEnd`
- 正規表現リテラル
- `RegExp`
- `test`
- `match`
- `replace` と正規表現
- named capture group
- 入力値の簡単な検証
- `Number`
- 小数計算の誤差
- `Math.round`
- `Math.floor`
- `Math.ceil`
- `Math.random`
- `Date`
- timestamp
- ISO 文字列
- timezone の注意
- 日付の比較
- 日付表示
- `Intl.DateTimeFormat`
- `Intl.NumberFormat`

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  07-builtins-string-regexp-date/
    index.js
    set-deduplication.js
    map-basics.js
    weak-map-and-weakset.js
    string-operations.js
    regexp-basics.js
    number-and-math.js
    date-and-intl.js

docs/
  07-builtins-string-regexp-date.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 07 のサンプルを順番に実行する入口。
- `set-deduplication.js`
  - `Set`、重複除去、存在確認、object の重複判定を確認する。
- `map-basics.js`
  - `Map`、object との違い、object key、配列から `Map` への変換を確認する。
- `weak-map-and-weakset.js`
  - `WeakMap` / `WeakSet` の概要と、object だけを key / value として扱う特徴を確認する。
- `string-operations.js`
  - template literal、検索、分割、置換、trim、padding を確認する。
- `regexp-basics.js`
  - 正規表現リテラル、`RegExp`、`test`、`match`、`replace`、named capture group、簡単な検証を確認する。
- `number-and-math.js`
  - `Number`、小数誤差、丸め処理、`Math.random`、整数中心の金額計算を確認する。
- `date-and-intl.js`
  - `Date`、timestamp、ISO 文字列、日付比較、timezone、`Intl.DateTimeFormat`、`Intl.NumberFormat` を確認する。
- `07-builtins-string-regexp-date.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:07
```

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

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/07-builtins-string-regexp-date/index.js`
2. `src/07-builtins-string-regexp-date/set-deduplication.js`
3. `src/07-builtins-string-regexp-date/map-basics.js`
4. `src/07-builtins-string-regexp-date/weak-map-and-weakset.js`
5. `src/07-builtins-string-regexp-date/string-operations.js`
6. `src/07-builtins-string-regexp-date/regexp-basics.js`
7. `src/07-builtins-string-regexp-date/number-and-math.js`
8. `src/07-builtins-string-regexp-date/date-and-intl.js`

前半で `Set` / `Map` などのコレクションを確認し、後半で文字列、正規表現、数値、日付、表示用フォーマットを確認する。

## 6. 注目ポイント

### 6-1. `Set` は primitive 値の重複除去で使いやすい

`set-deduplication.js` では、配列から重複を除去している。

```js
const categoryNames = ['book', 'movie', 'book', 'music', 'movie', 'game'];
const uniqueCategoryNames = [...new Set(categoryNames)];
```

`Set` は同じ値を重複して持たない。  
配列に戻したい場合は、spread syntax を使って `[...]` で展開できる。

ただし、object の重複判定では注意が必要。

```js
const firstUser = { id: 1, name: 'Alice' };
const secondUser = { id: 1, name: 'Alice' };
const users = new Set([firstUser, secondUser, firstUser]);
```

`firstUser` と `secondUser` は中身が同じに見えても別 object のため、`Set` では別の値として扱われる。

### 6-2. `Map` は任意の値を key にできる

`map-basics.js` では、object を key にして `Map` に値を保存している。

```js
const alice = { id: 1, name: 'Alice' };
const bob = { id: 2, name: 'Bob' };

const loginCountsByUser = new Map();

loginCountsByUser.set(alice, 3);
loginCountsByUser.set(bob, 1);
```

通常の object は key が文字列や `Symbol` として扱われる。  
一方、`Map` は object そのものを key にできる。

ただし、同じ中身に見える別 object は別 key になる。

```js
const anotherAlice = { id: 1, name: 'Alice' };
const missingLoginCount = loginCountsByUser.get(anotherAlice);
```

参照の同一性で key が判定される点は、Unit 03 の参照共有ともつながる。

### 6-3. 文字列処理は表示用データ加工で頻出する

`string-operations.js` では、検索、分割、置換、trim、padding を扱っている。

```js
const articleTitle = 'JavaScript standard built-in objects';

const searchResults = {
  includesScript: articleTitle.includes('Script'),
  startsWithJava: articleTitle.startsWith('Java'),
  endsWithObjects: articleTitle.endsWith('objects'),
};
```

文字列の検索では、`includes`、`startsWith`、`endsWith` を使う。  
CSV のような単純な文字列分割では `split` を使える。

```js
const csvLine = 'book,JavaScript Primer,3200';
const [category, title, priceText] = csvLine.split(',');
```

入力値の前後空白を落とす場合は `trim`、表示桁数をそろえる場合は `padStart` / `padEnd` を使う。

### 6-4. 正規表現は検証・抽出・置換に使う

`regexp-basics.js` では、email の簡単な検証をしている。

```js
const emailPattern = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/;

const emailValidationResults = {
  validEmail: emailPattern.test(validEmail),
  invalidEmail: emailPattern.test(invalidEmail),
};
```

`test` は一致するかどうかを boolean で返す。  
`match` は一致した文字列を取り出すときに使う。

```js
const issueText = 'Refs #123 and closes #456';
const issueMatches = issueText.match(/#\d+/g);
```

named capture group を使うと、抽出した値を名前で読める。

```js
const logPattern = /^(?<date>\d{4}-\d{2}-\d{2}) (?<level>INFO|WARN|ERROR) (?<event>[\w-]+)$/;
```

正規表現は便利だが、複雑にしすぎると読みづらくなる。  
実務では、簡単な形式チェック、抽出、置換に使い、複雑な仕様は関数に分ける方が追いやすい。

### 6-5. 小数計算には誤差が出る場合がある

`number-and-math.js` では、`0.1 + 0.2` の結果を確認している。

```js
const floatingPointResult = 0.1 + 0.2;
const roundedFloatingPointResult = Math.round(floatingPointResult * 100) / 100;
```

JavaScript の `number` は浮動小数点数として扱われる。  
そのため、小数計算では見た目通りの結果にならない場合がある。

金額計算では、最小単位の整数として扱う設計が使われることがある。

```js
const itemPrices = [1200, 800, 500];
const subtotal = itemPrices.reduce((total, itemPrice) => total + itemPrice, 0);
const taxIncluded = Math.floor(subtotal * 1.1);
```

### 6-6. `Date` は timezone と表示形式に注意する

`date-and-intl.js` では、`Date` から timestamp と ISO 文字列を取り出している。

```js
const createdAt = new Date('2026-05-29T12:34:56.000Z');

const timestamp = createdAt.getTime();
const isoString = createdAt.toISOString();
```

ISO 文字列の末尾 `Z` は UTC を表す。  
表示するときは、`Intl.DateTimeFormat` に `timeZone` を指定すると意図した timezone で表示しやすい。

```js
const tokyoDateFormatter = new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Tokyo',
});
```

## 7. 引っかかりやすい点

### 7-1. `Set` は object の中身で重複判定しない

`Set` は object の中身を比較して重複判定するわけではない。

```js
const firstUser = { id: 1, name: 'Alice' };
const secondUser = { id: 1, name: 'Alice' };
const users = new Set([firstUser, secondUser, firstUser]);
```

`firstUser` と `secondUser` は別の参照なので、別の値として扱われる。  
`id` を基準に重複除去したい場合は、`Set` に `id` を記録しながら処理する。

### 7-2. `Map` の object key も参照で判定される

`Map` で object を key にできるが、同じ中身の別 object は同じ key にならない。

```js
const anotherAlice = { id: 1, name: 'Alice' };
const missingLoginCount = loginCountsByUser.get(anotherAlice);
```

この挙動は object の参照同一性によるもの。  
API レスポンスの `id` で引きたい場合は、object 自体ではなく `id` を key にする方が扱いやすい。

### 7-3. `replace` と `replaceAll` は置換範囲が違う

`replace` は最初に一致した部分だけを置換する。

```js
const firstReplacedPath = routePath.replace(':userId', '10');
```

同じ文字列をすべて置換したい場合は `replaceAll` を使う。

```js
const allReplacedText = 'draft draft published'.replaceAll('draft', '下書き');
```

正規表現を使う場合は、global flag `g` の有無にも注意する。

### 7-4. `Number(value)` と `parseInt` / `parseFloat` は挙動が違う

Unit 02 でも扱った通り、`Number(value)` は文字列全体を数値として解釈する。  
一方、`parseInt` / `parseFloat` は先頭から数値として読める部分を変換する。

Unit 07 では `Number` と `Math` を中心に扱っているが、フォーム入力や単位付き文字列を扱う場合は、この違いを意識する必要がある。

### 7-5. `Date` の local time と UTC を混同しやすい

`Date` は内部的には時点を表すが、年月日を取り出す API には local timezone の影響を受けるものと UTC 系のものがある。

```js
const utcParts = {
  year: createdAt.getUTCFullYear(),
  month: createdAt.getUTCMonth() + 1,
  date: createdAt.getUTCDate(),
  hour: createdAt.getUTCHours(),
};
```

日付だけを扱いたい処理では、どの timezone で解釈するかを明確にする必要がある。

### 7-6. `Intl` の表示結果は locale と option に依存する

`Intl.DateTimeFormat` や `Intl.NumberFormat` の結果は、locale と option によって変わる。

```js
const yenFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
});
```

画面表示では便利だが、内部データとして保存する値と、表示用に format した文字列は分けて考える。  
保存や比較には元の値、画面表示には `Intl` で format した値を使う。

## 8. 実務でよく使う場面

### 8-1. API レスポンスから重複を除去する

`set-deduplication.js` では、`id` を基準に重複除去している。

```js
const seenUserIds = new Set();
const uniqueUsersById = apiUsers.filter((user) => {
  if (seenUserIds.has(user.id)) {
    return false;
  }

  seenUserIds.add(user.id);
  return true;
});
```

API レスポンスや複数ソースのデータを統合するとき、重複除去はよく出る処理。

### 8-2. `Map` で id からデータを引ける形にする

配列を `Map` に変換すると、`id` から値を引きやすくなる。

```js
const usersById = new Map(users.map((user) => [user.id, user]));
const editor = usersById.get(3);
```

一覧データと詳細データを紐づける処理や、参照用の辞書を作る処理で使える。

### 8-3. 文字列を表示用に整形する

`string-operations.js` では、template literal、`trim`、`padStart` などを扱っている。

```js
const paddedOrderId = String(42).padStart(6, '0');
```

注文番号、ユーザー表示名、検索キーワード、URL path など、文字列整形は実務で多い。

### 8-4. 入力値を正規表現で簡単に検証する

`regexp-basics.js` では、email や slug の簡単な検証を扱っている。

```js
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
```

正規表現は入力値検証で使えるが、仕様が複雑な場合は専用ライブラリや明示的な関数で分ける方がよい。

### 8-5. 日付と数値を表示用に format する

`Intl.DateTimeFormat` と `Intl.NumberFormat` は、画面表示向けの整形で使う。

```js
const formattedTokyoDate = tokyoDateFormatter.format(createdAt);
const formattedPrice = yenFormatter.format(123456);
```

保存値や API 送信用の値と、表示用の文字列を分けて扱うことが重要。

## 9. TS / Reactにつながるポイント

### 9-1. `Set` / `Map` は状態管理やデータ正規化にもつながる

React の state では `Set` / `Map` そのものを扱う場合もあるが、更新時には新しい instance を作ることが重要になる。

```js
const nextSelectedIds = new Set(selectedIds);
nextSelectedIds.add(104);
```

Unit 06 の非破壊更新と同じく、既存の値を直接変更しない考え方につながる。

### 9-2. 文字列処理は props や表示コンポーネントで頻出する

React では、props として受け取った値を表示用に整形する場面が多い。

```jsx
function OrderLabel({ orderId }) {
  return <span>{String(orderId).padStart(6, '0')}</span>;
}
```

template literal、`trim`、`replace`、`padStart` などは表示ロジックの基礎になる。

### 9-3. 正規表現は form validation の入口になる

React の form では、入力値の簡単な検証で正規表現を使うことがある。

```js
const isValidSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
```

ただし、複雑な validation は関数や schema validation に分けた方が保守しやすい。

### 9-4. `Intl` は UI 表示の format 処理につながる

TypeScript / React でも、日付や金額の表示には `Intl` を使える。

```js
const priceFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
});
```

表示用 format は UI の責務として切り出すと、コンポーネントやユーティリティ関数で再利用しやすい。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `Set` を使って primitive 値の重複除去ができるか
- `Set` が object の中身ではなく参照で判定することを説明できるか
- `Map` と object の違いを概要レベルで説明できるか
- `Map` の key に object を使えることを説明できるか
- `WeakMap` / `WeakSet` が列挙 API を持たない理由を概要レベルで説明できるか
- template literal を使って表示用文字列を作れるか
- `includes`、`startsWith`、`endsWith` の使いどころを説明できるか
- `slice`、`split`、`replace`、`replaceAll` を使えるか
- `trim`、`padStart`、`padEnd` を表示用整形に使えるか
- 正規表現リテラルと `RegExp` の使い分けを概要レベルで説明できるか
- `test`、`match`、`replace` と正規表現を組み合わせられるか
- named capture group で値を取り出せるか
- `Number(value)` で文字列を数値に変換できるか
- 小数計算で誤差が出る場合があることを説明できるか
- `Math.round`、`Math.floor`、`Math.ceil` の違いを説明できるか
- `Math.random` の戻り値の範囲を説明できるか
- `Date` の timestamp と ISO 文字列を説明できるか
- `Date` の比較に timestamp を使えることを説明できるか
- timezone の影響を受ける表示処理に注意できるか
- `Intl.DateTimeFormat` と `Intl.NumberFormat` を使って表示用文字列を作れるか
