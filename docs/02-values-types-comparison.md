# 02. 値・型・比較・型変換

## 1. 学習対象

この単位では、JavaScript で不安になりやすい値、型、比較、型変換、truthy / falsy を扱う。  
JavaScript は動的型付けの言語であり、値の型は実行時に決まる。  
そのため、`typeof`、`Array.isArray`、`===`、`Number.isNaN`、`??` などを使い分けて、値の状態を明示的に読む力が重要になる。

この単位は、TypeScript / React に進む前の土台としても重要な位置づけとなる。  
props、state、API レスポンス、フォーム入力、初期値処理では、`null`、`undefined`、空文字、`0`、`false`、`NaN` などを扱う場面が多い。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- primitive
  - `number`
  - `string`
  - `boolean`
  - `null`
  - `undefined`
  - `bigint`
  - `symbol`
- object
- 配列は object であること
- 関数も値であること
- `typeof`
- `Array.isArray`
- `NaN`
- `Infinity`
- `Number.isNaN`
- `Number.isFinite`
- `Object.is`
- `null` と `undefined`
- `===`
- `!==`
- `==`
- `!=`
- 暗黙の型変換
- 明示的な型変換
  - `Boolean(value)`
  - `Number(value)`
  - `String(value)`
  - `parseInt`
  - `parseFloat`
- truthy / falsy
- `||`
- `&&`
- `??`
- optional chaining `?.`
- nullish coalescing `??`

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  02-values-types-comparison/
    index.js
    primitive-values.js
    object-and-function-values.js
    type-inspection.js
    null-and-undefined.js
    number-special-values.js
    object-is.js
    strict-equality.js
    loose-equality-and-coercion.js
    explicit-conversion.js
    truthy-falsy.js
    logical-operators.js
    optional-chaining.js

docs/
  02-values-types-comparison.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 02 のサンプルを順番に実行する入口。
- `primitive-values.js`
  - primitive 値と、文字列などの immutable な性質を確認する。
- `object-and-function-values.js`
  - object、array、function が値として扱えることを確認する。
- `type-inspection.js`
  - `typeof` と `Array.isArray` の使い分けを確認する。
- `null-and-undefined.js`
  - `null` と `undefined` が現れる場面と default parameter の挙動を確認する。
- `number-special-values.js`
  - `NaN`、`Infinity`、`Number.isNaN`、`Number.isFinite` を確認する。
- `object-is.js`
  - `Object.is` と `===` の違い、object の参照同一性を確認する。
- `strict-equality.js`
  - `===` / `!==` による厳密比較を確認する。
- `loose-equality-and-coercion.js`
  - `==` / `!=` と暗黙の型変換の注意点を確認する。
- `explicit-conversion.js`
  - `Boolean(value)`、`Number(value)`、`String(value)`、`parseInt`、`parseFloat` を確認する。
- `truthy-falsy.js`
  - truthy / falsy と条件式での値の扱いを確認する。
- `logical-operators.js`
  - `||`、`&&`、`??` による値の選択と default 値の違いを確認する。
- `optional-chaining.js`
  - optional chaining `?.` と nullish coalescing `??` の組み合わせを確認する。
- `02-values-types-comparison.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:02
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

1. `src/02-values-types-comparison/index.js`
2. `src/02-values-types-comparison/primitive-values.js`
3. `src/02-values-types-comparison/object-and-function-values.js`
4. `src/02-values-types-comparison/type-inspection.js`
5. `src/02-values-types-comparison/null-and-undefined.js`
6. `src/02-values-types-comparison/number-special-values.js`
7. `src/02-values-types-comparison/object-is.js`
8. `src/02-values-types-comparison/strict-equality.js`
9. `src/02-values-types-comparison/loose-equality-and-coercion.js`
10. `src/02-values-types-comparison/explicit-conversion.js`
11. `src/02-values-types-comparison/truthy-falsy.js`
12. `src/02-values-types-comparison/logical-operators.js`
13. `src/02-values-types-comparison/optional-chaining.js`

前半で値の種類と型確認を押さえ、後半で比較、型変換、truthy / falsy、default 値の扱いを確認する。  
`index.js` から読むと、Unit 全体の実行順を把握しやすい。

## 6. 注目ポイント

### 6-1. primitive 値と object の違いを分けて見る

`primitive-values.js` では、JavaScript の primitive 値を並べて確認している。

```js
const numberValue = 42;
const stringValue = 'JavaScript';
const booleanValue = true;
const nullValue = null;
const undefinedValue = undefined;
const bigintValue = 9007199254740993n;
const symbolValue = Symbol('unit-02');
```

primitive 値は、値そのものとして扱う基本的な値となる。  
一方、`object-and-function-values.js` では、object、array、function を扱っている。

```js
const user = { id: 1, name: 'Alice', active: true };
const tags = ['javascript', 'nodejs', 'browser'];
const formatter = createDisplayName;
```

JavaScript では function も値として扱える。  
変数に代入したり、引数に渡したり、戻り値にしたりできる点は、後続の関数・コールバック・高階関数の理解につながる。

### 6-2. `typeof` だけでは array と `null` を正確に見分けられない

`type-inspection.js` では、`typeof` と `Array.isArray` の結果を並べて確認している。

```js
const inspectionResults = values.map(({ label, value }) => ({
  label,
  typeofResult: typeof value,
  isArray: Array.isArray(value),
}));
```

`typeof null` は `"object"` になる。  
配列も `typeof` では `"object"` になる。

```js
console.log('typeof null:', typeof nullValue);
console.log('null === null:', nullValue === null);
console.log('typeof array:', typeof arrayValue);
console.log('Array.isArray(array):', Array.isArray(arrayValue));
```

`null` を判定する場合は `value === null` を使う。  
配列を判定する場合は `Array.isArray(value)` を使う。

### 6-3. `null` と `undefined` は default 値の扱いで差が出る

`null-and-undefined.js` では、default parameter に `undefined` と `null` を渡したときの違いを確認している。

```js
function createProfile({ nickname = '未設定' } = {}) {
  return { nickname };
}
```

```js
const omittedProfile = createProfile();
const undefinedProfile = createProfile({ nickname: undefined });
const nullProfile = createProfile({ nickname: null });
```

`undefined` は「値が渡されていない」扱いになり、既定値が使われる。  
一方、`null` は値として明示的に渡されているため、既定値にはならない。

### 6-4. `NaN`、`Infinity`、`Object.is` は比較で特殊な挙動を持つ

`number-special-values.js` では、`NaN` と `Infinity` を確認している。

```js
const invalidNumber = Number('not-a-number');
const invalidCalculation = Math.sqrt(-1);

const positiveInfinity = 1 / 0;
const negativeInfinity = -1 / 0;
```

`NaN` は number 型の特殊な値だが、通常の比較では自分自身とも等しくならない。

`object-is.js` では、`===` と `Object.is` の違いを確認している。

```js
const strictComparisonResults = {
  nanStrictEqual: NaN === NaN,
  zeroStrictEqual: 0 === -0,
};

const objectIsResults = {
  nanObjectIs: Object.is(NaN, NaN),
  zeroObjectIs: Object.is(0, -0),
  sameString: Object.is('JavaScript', 'JavaScript'),
  differentObjects: Object.is({ id: 1 }, { id: 1 }),
};
```

`Object.is(NaN, NaN)` は `true` になる。  
一方、`Object.is(0, -0)` は `false` になる。

### 6-5. 基本は `===` / `!==` を使い、`==` / `!=` の暗黙変換を避ける

`strict-equality.js` では、`===` / `!==` を使った比較を確認している。

```js
const sameNumber = 100 === 100;
const numberAndString = 100 === '100';
const trueAndOne = true === 1;
const nullAndUndefined = null === undefined;
```

`100` と `'100'` は、見た目は近くても型が違うため `===` では `false` になる。  
一方、`loose-equality-and-coercion.js` では、`==` によって暗黙の型変換が起きる例を確認している。

```js
const looseEqualityResults = {
  numberAndString: 100 == '100',
  falseAndZero: false == 0,
  emptyStringAndZero: '' == 0,
  nullAndUndefined: null == undefined,
  zeroAndNull: 0 == null,
};
```

このような比較は、結果だけ見ると便利に見えるが、読み手が変換規則を追う必要がある。  
実務では、明示的に型変換したうえで `===` / `!==` を使う方が読みやすい。

### 6-6. `||` と `??` は default 値の扱いが違う

`logical-operators.js` では、`||` と `??` の違いを確認している。

```js
const fallbackByOr = {
  displayName: formValues.displayName || '匿名',
  retryCount: formValues.retryCount || 3,
  receiveMail: formValues.receiveMail || true,
};

const fallbackByNullish = {
  displayName: formValues.displayName ?? '匿名',
  retryCount: formValues.retryCount ?? 3,
  receiveMail: formValues.receiveMail ?? true,
};
```

`||` は左辺が falsy の場合に右辺を返す。  
そのため、空文字、`0`、`false` も default 値に置き換わる。

`??` は左辺が `null` または `undefined` の場合だけ右辺を返す。  
フォーム入力、設定値、API レスポンスなどで `0` や `false` を有効な値として扱う場合は `??` が向いている。

## 7. 引っかかりやすい点

### 7-1. `typeof null` が `"object"` になる

`type-inspection.js` では、`null` の `typeof` 結果を確認している。

```js
const nullValue = null;

console.log('typeof null:', typeof nullValue);
console.log('null === null:', nullValue === null);
```

`typeof null` は `"object"` になる。  
これは JavaScript の歴史的な仕様として残っている挙動であり、`null` が通常の object という意味ではない。

`null` を判定したい場合は、`value === null` のように比較する。

### 7-2. 配列は `typeof` では `"object"` になる

配列も `typeof` では `"object"` になる。

```js
const arrayValue = ['JavaScript', 'TypeScript'];

console.log('typeof array:', typeof arrayValue);
console.log('Array.isArray(array):', Array.isArray(arrayValue));
```

配列かどうかを判定したい場合は、`Array.isArray(value)` を使う。  
`typeof` だけで object と array を分けようとすると誤判定しやすい。

### 7-3. `NaN === NaN` は `false` になる

`object-is.js` では、`NaN` の比較を確認している。

```js
const strictComparisonResults = {
  nanStrictEqual: NaN === NaN,
  zeroStrictEqual: 0 === -0,
};
```

`NaN` は自分自身とも `===` で等しくならない。  
`NaN` 判定には `Number.isNaN(value)` を使う。

```js
Number.isNaN(invalidNumber);
```

`Number.isNaN` は、値が本当に `NaN` かどうかを判定する。  
文字列などを勝手に数値変換しないため、意図が読みやすい。

### 7-4. `==` は暗黙の型変換を含むため結果を予測しにくい

`loose-equality-and-coercion.js` では、`==` の挙動を確認している。

```js
const looseEqualityResults = {
  numberAndString: 100 == '100',
  falseAndZero: false == 0,
  emptyStringAndZero: '' == 0,
  nullAndUndefined: null == undefined,
  zeroAndNull: 0 == null,
};
```

`100 == '100'` や `false == 0` は `true` になる。  
このような比較は暗黙の型変換に依存するため、コードを読む人が変換規則を追う必要がある。

基本的には、明示的に変換したうえで `===` を使う方がよい。

### 7-5. 空の配列や空の object は truthy になる

`truthy-falsy.js` では、空の配列や空の object が truthy になることを確認している。

```js
const truthyValues = [
  { label: 'non-empty string', value: 'JavaScript' },
  { label: '1', value: 1 },
  { label: 'empty array', value: [] },
  { label: 'empty object', value: {} },
  { label: 'function', value: () => 'value' },
];
```

空の配列や空の object は、中身が空でも `Boolean(value)` は `true` になる。  
「空かどうか」を確認したい場合は、`array.length === 0` や `Object.keys(object).length === 0` のように別途確認する必要がある。

### 7-6. `||` で default 値を入れると `0`、空文字、`false` も置き換わる

`logical-operators.js` では、`||` と `??` の違いを確認している。

```js
const formValues = {
  displayName: '',
  retryCount: 0,
  receiveMail: false,
};
```

```js
const fallbackByOr = {
  displayName: formValues.displayName || '匿名',
  retryCount: formValues.retryCount || 3,
  receiveMail: formValues.receiveMail || true,
};
```

この場合、空文字、`0`、`false` はすべて default 値に置き換わる。  
これらを有効な値として扱いたい場合は、`??` を使う。

```js
const fallbackByNullish = {
  displayName: formValues.displayName ?? '匿名',
  retryCount: formValues.retryCount ?? 3,
  receiveMail: formValues.receiveMail ?? true,
};
```

### 7-7. optional chaining を付けすぎると不具合を見逃しやすい

`optional-chaining.js` では、存在しないプロパティを安全に読む例を扱っている。

```js
const missingCity = userWithoutProfile.profile?.address?.city;
```

optional chaining は便利だが、必ず存在すべき値にまで付けると、設定漏れやデータ不整合に気づきにくくなる。  
必須の設定は通常通り参照し、optional な値だけ `?.` や `??` で扱う方がよい。

## 8. 実務でよく使う場面

### 8-1. API レスポンスの `null` / `undefined` を扱う

`null-and-undefined.js` では、API レスポンス風の object に `null` を含めている。

```js
const userFromApi = {
  id: 1,
  name: 'Alice',
  middleName: null,
};
```

実務では、API レスポンスの中に `null` が含まれることがある。  
一方で、JavaScript 側でプロパティが存在しない場合や、Map に key がない場合は `undefined` が返ることもある。

`null` と `undefined` のどちらが来る可能性があるかを理解しておくと、画面表示や変換処理を書きやすくなる。

### 8-2. フォーム入力値を数値や boolean に変換する

`explicit-conversion.js` では、`Number(value)`、`Boolean(value)`、`String(value)` を扱っている。

```js
const numberConversions = [
  { label: '"100"', converted: Number('100') },
  { label: '"10.5"', converted: Number('10.5') },
  { label: 'empty string', converted: Number('') },
  { label: '"text"', converted: Number('text') },
];
```

フォーム入力値や URL query は、文字列として入ってくることが多い。  
数値として扱いたい場合は、暗黙の型変換に任せず、`Number(value)` などで明示的に変換する方が読みやすい。

### 8-3. default 値を入れるときに `||` と `??` を使い分ける

設定値やフォーム入力では、`0`、空文字、`false` が有効な値になることがある。

```js
const formValues = {
  displayName: '',
  retryCount: 0,
  receiveMail: false,
};
```

このような値に default を入れる場合、`||` を使うと意図せず値が置き換わる。  
`null` / `undefined` のときだけ default を入れたい場合は、`??` を使う。

### 8-4. ネストしたデータを optional chaining で読む

`optional-chaining.js` では、ネストした object から値を取り出している。

```js
const city = userResponse.profile?.address?.city;
const missingCity = userWithoutProfile.profile?.address?.city;
```

API レスポンスや設定 object は、ネストしていることが多い。  
途中の値が `null` / `undefined` の可能性がある場合、optional chaining を使うと安全に読み取れる。

ただし、必須の値にまで付けすぎると、データ不整合を見逃す可能性がある。

## 9. TS / Reactにつながるポイント

### 9-1. TypeScript では `null` / `undefined` の扱いが型として見える

JavaScript では、`null` / `undefined` は実行時に初めて問題になることが多い。  
TypeScript では、型として `null` / `undefined` の可能性を表現できる。

```ts
type User = {
  id: number;
  name: string;
  middleName: string | null;
};
```

JavaScript の段階で `null` / `undefined` の違いを理解しておくと、TypeScript の union 型や optional property を理解しやすくなる。

### 9-2. React の props / state では `0`、空文字、`false` を有効な値として扱う場面がある

`logical-operators.js` では、`||` と `??` の違いを確認した。

```js
const fallbackByOr = {
  displayName: formValues.displayName || '匿名',
  retryCount: formValues.retryCount || 3,
  receiveMail: formValues.receiveMail || true,
};

const fallbackByNullish = {
  displayName: formValues.displayName ?? '匿名',
  retryCount: formValues.retryCount ?? 3,
  receiveMail: formValues.receiveMail ?? true,
};
```

React の state や props では、`0`、空文字、`false` が有効な値になることがある。  
その場合、`||` で default 値を入れると、ユーザーの入力や設定を意図せず置き換える可能性がある。

### 9-3. optional chaining は React の表示ロジックでも頻出する

React では、API 取得直後やロード中に値がまだ存在しないことがある。  
その場合、optional chaining を使って安全に表示用の値を取り出すことがある。

```jsx
function UserProfile({ user }) {
  return <p>{user.profile?.address?.city ?? '未設定'}</p>;
}
```

ただし、すべてに `?.` を付けるのではなく、必須データと optional データを分けて考えることが重要になる。

### 9-4. `typeof` や `Array.isArray` は型ガードの理解につながる

JavaScript では、`typeof` や `Array.isArray` を使って実行時に値を判定する。

```js
if (typeof value === 'string') {
  return value.trim();
}

if (Array.isArray(value)) {
  return value.length;
}
```

TypeScript では、このような判定が型の絞り込みにもつながる。

```ts
function formatValue(value: string | string[]) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value.trim();
}
```

JavaScript で値を判定する書き方に慣れておくと、TypeScript の型ガードも理解しやすい。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- JavaScript の primitive 値を列挙できるか
- primitive と object の違いを説明できるか
- function も値として扱えることを説明できるか
- 配列が `typeof` では `"object"` になることを説明できるか
- 配列判定に `Array.isArray` を使う理由を説明できるか
- `typeof null` が `"object"` になることを知っているか
- `null` と `undefined` が現れやすい場面を説明できるか
- `NaN` が number 型の特殊な値であることを説明できるか
- `Number.isNaN` と `Number.isFinite` の役割を説明できるか
- `Object.is` と `===` の違いを概要レベルで説明できるか
- object の比較が中身ではなく参照の同一性を見ることを説明できるか
- `===` / `!==` と `==` / `!=` の違いを説明できるか
- 暗黙の型変換が起きる例を説明できるか
- `Boolean(value)`、`Number(value)`、`String(value)` の役割を説明できるか
- `parseInt` / `parseFloat` と `Number(value)` の違いを説明できるか
- truthy / falsy の代表的な値を挙げられるか
- 空の配列や空の object が truthy になることを説明できるか
- `||` と `??` の default 値処理の違いを説明できるか
- optional chaining `?.` を使う場面を説明できるか
- `?.` を付けすぎると不具合を見逃しやすい理由を説明できるか
