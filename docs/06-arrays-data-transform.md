# 06. 配列操作・データ変換・実務的なコレクション処理

## 1. 学習対象

この単位では、JavaScript の配列操作と、実務でよく使うデータ変換を扱う。  
`map` / `filter` / `reduce` を中心に、API レスポンス、一覧表示、集計、検索条件、表示用データへの変換を想定した処理を確認する。

配列メソッドは、JavaScript、TypeScript、React のすべてで頻出する。  
特に React では、state の配列を非破壊で更新したり、API レスポンスを UI 表示用の配列へ変換したりする場面が多い。  
この単位では、単なるメソッド一覧ではなく、実務風の object 配列を使って、変換・絞り込み・集計・表示用加工の流れを確認する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- 配列リテラル
- index アクセス
- `length`
- `push`
- `pop`
- `shift`
- `unshift`
- `slice`
- `splice`
- `toSpliced`
- `map`
- `filter`
- `reduce`
- `find`
- `findIndex`
- `some`
- `every`
- `includes`
- `sort`
- `toSorted`
- `reverse`
- `toReversed`
- `flat`
- `flatMap`
- `forEach`
- `for...of`
- method chain
- 破壊的メソッド
- 非破壊的メソッド
- 配列からオブジェクトへの変換
- オブジェクトから配列への変換
- group by 風処理
- 集計
- 重複除去
- 配列内要素の更新
- 配列への追加
- 配列から削除
- 表示用データへの変換
- predicate 関数
- mapper 関数
- formatter 関数

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  06-arrays-data-transform/
    index.js
    sample-data.js
    array-basics.js
    destructive-methods.js
    non-destructive-methods.js
    for-of-and-foreach.js
    map-transform.js
    filter-predicate.js
    find-some-every-includes.js
    reduce-basics.js
    method-chain-intro.js
    sort-and-reverse.js
    flat-and-flatmap.js
    array-object-conversion.js
    group-by-aggregation.js
    deduplication.js
    immutable-array-update.js
    display-data-transform.js

docs/
  06-arrays-data-transform.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 06 のサンプルを順番に実行する入口。
- `sample-data.js`
  - 商品、注文、ユーザーのサンプルデータを定義する。
- `array-basics.js`
  - 配列リテラル、index アクセス、`length`、配列判定を確認する。
- `destructive-methods.js`
  - `push` / `pop` / `shift` / `unshift` / `splice` などの破壊的メソッドを確認する。
- `non-destructive-methods.js`
  - `slice` / `toSpliced` / spread による非破壊操作を確認する。
- `for-of-and-foreach.js`
  - `for...of` と `forEach` の違い、戻り値、途中終了の扱いを確認する。
- `map-transform.js`
  - `map` と mapper 関数による表示用データ変換を確認する。
- `filter-predicate.js`
  - `filter` と predicate 関数による絞り込みを確認する。
- `find-some-every-includes.js`
  - `find` / `findIndex` / `some` / `every` / `includes` を確認する。
- `reduce-basics.js`
  - `reduce` による合計、集計、object への変換の入口を確認する。
- `method-chain-intro.js`
  - `filter` / `map` / `join` などの method chain を確認する。
- `sort-and-reverse.js`
  - `sort` / `toSorted` / `reverse` / `toReversed` の破壊的・非破壊的な違いを確認する。
- `flat-and-flatmap.js`
  - `flat` / `flatMap` による配列の平坦化を確認する。
- `array-object-conversion.js`
  - `Object.fromEntries`、`Object.keys`、`Object.values`、`Object.entries` を使った配列と object の変換を確認する。
- `group-by-aggregation.js`
  - `reduce` による group by 風処理と集計を確認する。
- `deduplication.js`
  - `Set` や `Map` を使った重複除去を確認する。
- `immutable-array-update.js`
  - `map` / `filter` / spread / `toSpliced` による配列の非破壊更新を確認する。
- `display-data-transform.js`
  - API レスポンス風データを UI 表示用データへ変換する流れを確認する。
- `06-arrays-data-transform.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:06
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

1. `src/06-arrays-data-transform/index.js`
2. `src/06-arrays-data-transform/sample-data.js`
3. `src/06-arrays-data-transform/array-basics.js`
4. `src/06-arrays-data-transform/destructive-methods.js`
5. `src/06-arrays-data-transform/non-destructive-methods.js`
6. `src/06-arrays-data-transform/for-of-and-foreach.js`
7. `src/06-arrays-data-transform/map-transform.js`
8. `src/06-arrays-data-transform/filter-predicate.js`
9. `src/06-arrays-data-transform/find-some-every-includes.js`
10. `src/06-arrays-data-transform/reduce-basics.js`
11. `src/06-arrays-data-transform/method-chain-intro.js`
12. `src/06-arrays-data-transform/sort-and-reverse.js`
13. `src/06-arrays-data-transform/flat-and-flatmap.js`
14. `src/06-arrays-data-transform/array-object-conversion.js`
15. `src/06-arrays-data-transform/group-by-aggregation.js`
16. `src/06-arrays-data-transform/deduplication.js`
17. `src/06-arrays-data-transform/immutable-array-update.js`
18. `src/06-arrays-data-transform/display-data-transform.js`

前半で配列操作の基本と `map` / `filter` / `reduce` の入口を確認し、後半で実務的な並び替え、集計、変換、非破壊更新、表示用加工を確認する。  
`index.js` から読むと、Unit 全体の実行順を把握しやすい。

## 6. 注目ポイント

### 6-1. 配列は順序を持つ値のまとまり

`array-basics.js` では、配列リテラル、index アクセス、`length` を確認している。

```js
const languages = ['JavaScript', 'TypeScript', 'React'];
const mixedValues = [1, 'text', true, { id: 1 }];
```

配列は順序を持つ。  
先頭要素は index `0` で参照し、最後の index は `length - 1` になる。

```js
const firstLanguage = languages[0];
const lastLanguage = languages[languages.length - 1];
```

存在しない index にアクセスすると `undefined` になる。  
この挙動は、API レスポンスや検索結果で要素が存在しない場合の扱いにもつながる。

### 6-2. 破壊的メソッドと非破壊的メソッドを分けて見る

`destructive-methods.js` では、元配列を直接変更するメソッドを扱っている。

```js
const queue = ['task-1', 'task-2'];

const pushedLength = queue.push('task-3');
const poppedTask = queue.pop();
const shiftedTask = queue.shift();
const unshiftedLength = queue.unshift('task-0');
```

`push` / `pop` / `shift` / `unshift` / `splice` は元の配列を変更する。  
一方、`non-destructive-methods.js` では、元配列を残す操作を確認している。

```js
const replacedTasks = tasks.toSpliced(2, 2, 'lint', 'format');
```

React の state や、関数の引数で受け取った配列を扱う場合、破壊的メソッドで元データを変更していないかを意識する必要がある。

### 6-3. `map` は同じ件数のまま形を変える

`map-transform.js` では、商品データを表示用データへ変換している。

```js
const productCards = sampleProducts.map(toProductCard);
```

`toProductCard` は、1 件の商品を 1 件の表示用 object へ変換する mapper 関数。

```js
function toProductCard(product) {
  return {
    id: product.id,
    title: product.name,
    priceLabel: formatCurrency(product.price),
    stockLabel: product.stock > 0 ? `在庫 ${product.stock} 件` : '在庫なし',
  };
}
```

`map` は、件数を変えずに各要素の形を変える処理に向いている。  
API レスポンスを UI 表示用データへ変換する場面で頻出する。

### 6-4. `filter` は条件に合う要素だけを残す

`filter-predicate.js` では、predicate 関数を使って商品を絞り込んでいる。

```js
function isInStock(product) {
  return product.stock > 0;
}

function isBook(product) {
  return product.category === 'book';
}
```

```js
const availableBookProducts = sampleProducts.filter(
  (product) => isBook(product) && isInStock(product),
);
```

predicate 関数を小さく分けると、条件名として読める。  
複数条件を組み合わせる場合も、何を判定しているかが追いやすくなる。

### 6-5. `reduce` は配列を 1 つの値へ畳み込む

`reduce-basics.js` では、価格の合計や注文合計を計算している。

```js
const totalPrice = prices.reduce((total, price) => total + price, 0);
```

`reduce` は合計、件数集計、object への変換などに使える。  
ただし、何でも `reduce` にすると読みづらくなるため、変換なら `map`、絞り込みなら `filter`、検索なら `find` を優先し、集約したいときに使うと意図が伝わりやすい。

### 6-6. `sort` / `reverse` と `toSorted` / `toReversed` の違いを押さえる

`sort-and-reverse.js` では、破壊的な `sort` / `reverse` と、非破壊的な `toSorted` / `toReversed` を比較している。

```js
const pricesForSort = [...prices];
const sortReturnValue = pricesForSort.sort((left, right) => left - right);
```

`sort` は元配列を直接並び替える。  
元配列を変更したくない場合は、`toSorted` を使う。

```js
const sortedPrices = prices.toSorted((left, right) => left - right);
```

一覧表示用の並び替えでは、元の API レスポンスや state を変更しないことが重要になる。

### 6-7. `flatMap` は実務データの明細展開で使いやすい

`flat-and-flatmap.js` では、注文ごとの `items` を 1 つの明細一覧へ変換している。

```js
const orderLineItems = sampleOrders.flatMap((order) => {
  return order.items.map((item) => ({
    orderId: order.id,
    userId: order.userId,
    status: order.status,
    ...item,
  }));
});
```

注文一覧、カテゴリ一覧、タグ一覧など、各要素の中にさらに配列がある場合、`flatMap` は `map` + `flat` をまとめて表現できる。

### 6-8. 配列と object の変換は正規化の入口になる

`array-object-conversion.js` では、ユーザー配列を id key の object へ変換している。

```js
const usersById = Object.fromEntries(sampleUsers.map((user) => [user.id, user]));
```

配列を object に変換すると、id で値を引きやすくなる。  
React や TypeScript の実務でも、一覧データを id key の object に正規化して扱うことがある。

## 7. 引っかかりやすい点

### 7-1. `forEach` は新しい配列を返さない

`for-of-and-foreach.js` では、`forEach` の戻り値を確認している。

```js
const forEachResult = sampleProducts.forEach((product, index) => {
  printedLabels.push(`${index + 1}. ${product.name}`);
});
```

`forEach` の戻り値は常に `undefined`。  
新しい配列を作りたい場合は、`map` を使う方が意図が伝わりやすい。

### 7-2. `includes` は object の中身ではなく参照を見る

`find-some-every-includes.js` では、object 配列に対する `includes` の注意点を確認している。

```js
const firstUser = sampleUsers[0];
const includesSameReference = sampleUsers.includes(firstUser);
const includesSameShapeObject = sampleUsers.includes({
  id: 'u-001',
  name: 'Alice',
  active: true,
  role: 'admin',
});
```

同じ形の object を新しく作っても、参照が違えば `includes` は `false` になる。  
object 配列では、`id` などの key で `some` や `find` を使うことが多い。

### 7-3. `sort` は比較関数を渡さないと数値順にならない

`sort` は元配列を変更するだけでなく、比較関数を渡さない場合の挙動にも注意が必要。

```js
pricesForSort.sort((left, right) => left - right);
```

数値を並び替える場合は、比較関数を明示する。  
文字列順、数値順、日付順など、何を基準に並び替えるかを読み手に伝えることが重要になる。

### 7-4. `flat` は指定した深さまでしか平坦化しない

`flat-and-flatmap.js` では、`flat()` と `flat(2)` の違いを確認している。

```js
const deeplyNestedValues = [1, [2, [3, [4]]]];
const flatOneLevel = deeplyNestedValues.flat();
const flatTwoLevels = deeplyNestedValues.flat(2);
```

`flat()` の既定の深さは `1`。  
ネストが深いデータを扱う場合は、どの深さまで平坦化するかを明示する必要がある。

### 7-5. `reduce` は便利だが読みづらくなりやすい

`group-by-aggregation.js` では、`reduce` で group by 風の object を作っている。

```js
const productSummaryByCategory = sampleProducts.reduce((summary, product) => {
  const currentSummary = summary[product.category] ?? { count: 0, stock: 0 };

  return {
    ...summary,
    [product.category]: {
      count: currentSummary.count + 1,
      stock: currentSummary.stock + product.stock,
    },
  };
}, {});
```

`reduce` は強力だが、処理の意図が分かりにくくなりやすい。  
合計、集計、object への変換など、配列を 1 つの結果にまとめるときに使うとよい。

### 7-6. 非破壊更新では、対象外の要素と対象要素の扱いを分ける

`immutable-array-update.js` では、対象外の要素はそのまま返し、対象要素だけ新しい object を返している。

```js
return products.map((product) => {
  if (product.id !== targetProductId) {
    return product;
  }

  return {
    ...product,
    stock: nextStock,
  };
});
```

この書き方は React の state 更新でも頻出する。  
どの要素が同じ参照のままで、どの要素だけ新しくなるかを意識する。

## 8. 実務でよく使う場面

### 8-1. API レスポンスを一覧表示用データへ変換する

`display-data-transform.js` では、注文データを表示用の row へ変換している。

```js
const orderRows = sampleOrders
  .toSorted((left, right) => {
    return calculateOrderTotal(right) - calculateOrderTotal(left);
  })
  .map(toOrderRow);
```

API レスポンスをそのまま画面に渡すのではなく、表示に必要な label、整形済み金額、関連データの名前などを付けた形へ変換することが多い。

### 8-2. predicate / mapper / formatter 関数に名前を付ける

`filter-predicate.js` では、条件判定を predicate 関数として分けている。

```js
function isInStock(product) {
  return product.stock > 0;
}
```

`map-transform.js` では、表示用 object への変換を mapper 関数として分けている。

```js
function toProductCard(product) {
  return {
    id: product.id,
    title: product.name,
    priceLabel: formatCurrency(product.price),
    stockLabel: product.stock > 0 ? `在庫 ${product.stock} 件` : '在庫なし',
  };
}
```

小さな関数に名前を付けると、method chain の各段階が読みやすくなる。

### 8-3. 集計結果を summary object として作る

`group-by-aggregation.js` では、カテゴリごとの商品件数や在庫数を集計している。

```js
const productSummaryByCategory = sampleProducts.reduce((summary, product) => {
  const currentSummary = summary[product.category] ?? { count: 0, stock: 0 };

  return {
    ...summary,
    [product.category]: {
      count: currentSummary.count + 1,
      stock: currentSummary.stock + product.stock,
    },
  };
}, {});
```

一覧表示だけでなく、ダッシュボード、件数表示、カテゴリ別集計などでも同じ考え方を使える。

### 8-4. React の state 配列を非破壊で更新する

`immutable-array-update.js` では、`map` / `filter` / spread を使って新しい配列を作っている。

```js
const updatedProducts = updateProductStock(sampleProducts, 'p-002', 8);
const appendedProducts = appendProduct(sampleProducts, {
  id: 'p-005',
  name: 'CSS設計メモ',
  category: 'book',
  price: 2400,
  stock: 4,
  tags: ['css', 'frontend'],
});
const removedProducts = removeProductById(sampleProducts, 'p-004');
```

React では既存 state を直接変更せず、新しい配列や object を返す書き方が基本になる。  
Unit 03〜05 で扱った参照共有、shallow copy、非破壊更新の考え方がここでもつながる。

## 9. TS / Reactにつながるポイント

### 9-1. TypeScript では mapper / predicate の引数と戻り値が型で見える

JavaScript では、`map` や `filter` の callback が何を受け取り、何を返すかはコードを読んで判断する。  
TypeScript では、引数と戻り値の型が補完やエラーとして見える。

```ts
function isInStock(product: Product): boolean {
  return product.stock > 0;
}

function toProductCard(product: Product): ProductCard {
  return {
    id: product.id,
    title: product.name,
    priceLabel: `${product.price.toLocaleString('ja-JP')}円`,
  };
}
```

JavaScript の段階で predicate 関数や mapper 関数を意識しておくと、TypeScript の型注釈も理解しやすい。

### 9-2. React では配列の非破壊更新が頻出する

React の state 配列を更新するときは、既存配列を直接変更せず、新しい配列を作る。

```jsx
setProducts((currentProducts) => {
  return currentProducts.map((product) => {
    if (product.id !== targetProductId) {
      return product;
    }

    return {
      ...product,
      stock: nextStock,
    };
  });
});
```

`map`、`filter`、spread、`toSpliced` のような非破壊操作は、React の state 更新と相性がよい。

### 9-3. API レスポンス処理では method chain がよく使われる

API レスポンスを画面表示用に変換する場合、`filter`、`toSorted`、`map` を組み合わせることが多い。

```js
const productCards = sampleProducts
  .filter((product) => product.stock > 0)
  .toSorted((left, right) => right.price - left.price)
  .map((product) => ({
    id: product.id,
    title: product.name,
    priceLabel: formatCurrency(product.price),
  }));
```

chain が長くなった場合は、predicate 関数や mapper 関数に分けると読みやすくなる。

### 9-4. 配列から object への変換は状態管理にもつながる

`array-object-conversion.js` では、配列を id key の object へ変換している。

```js
const usersById = Object.fromEntries(sampleUsers.map((user) => [user.id, user]));
```

React や TypeScript の実務では、一覧データを id key の object と id 配列に分けて持つような正規化をすることがある。  
配列と object の相互変換に慣れておくと、状態管理やデータ取得後の整形を理解しやすい。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- 配列リテラル、index アクセス、`length` を説明できるか
- `push` / `pop` / `shift` / `unshift` / `splice` が破壊的メソッドであることを説明できるか
- `slice` / `toSpliced` / `toSorted` / `toReversed` が非破壊的に使えることを説明できるか
- `for...of` と `forEach` の違いを説明できるか
- `forEach` が新しい配列を返さないことを説明できるか
- `map` が同じ件数のまま形を変える処理に向いていることを説明できるか
- `filter` が条件に合う要素だけを残す処理に向いていることを説明できるか
- `find` / `findIndex` が見つからない場合の戻り値を説明できるか
- `some` / `every` の違いを説明できるか
- `includes` が object では参照同一性を見ることを説明できるか
- `reduce` の初期値を指定する理由を説明できるか
- `sort` / `reverse` が元配列を変更することを説明できるか
- `flat` の深さ指定を説明できるか
- `flatMap` が `map` + `flat(1)` に近い処理であることを説明できるか
- 配列から object へ変換する目的を説明できるか
- `Object.fromEntries` / `Object.entries` の使いどころを説明できるか
- group by 風処理や集計を `reduce` で書けるか
- `Set` による primitive 値の重複除去を説明できるか
- object 配列の重複除去で id などの key を使う理由を説明できるか
- `map` / `filter` / spread / `toSpliced` を使った非破壊更新を説明できるか
- API レスポンスを表示用データへ変換する流れを説明できるか
- predicate 関数、mapper 関数、formatter 関数の役割を説明できるか
