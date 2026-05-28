# 05. オブジェクト・分割代入・スプレッド・非破壊更新

## 1. 学習対象

この単位では、JavaScript 実務で頻出する object 操作、分割代入、spread syntax、非破壊更新を扱う。  
object は API レスポンス、設定値、フォーム入力、React の props / state などで頻繁に使うため、読み取り・copy・merge・更新の書き方を JavaScript 段階で固める。

Unit 03 では参照共有とミューテーションを扱った。  
この単位では、その知識を前提に、実際の object 操作としてどのように書くかを確認する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- オブジェクトリテラル
- プロパティアクセス
- dot 記法
- bracket 記法
- 動的プロパティ名
- shorthand property
- computed property name
- optional chaining
- オブジェクトの分割代入
- ネストした分割代入
- デフォルト値
- 関数引数での分割代入
- rest property
- spread syntax
- オブジェクトコピー
- オブジェクトマージ
- 上書き順序
- shallow copy
- deep copy の注意点
- `structuredClone`
- `Object.keys`
- `Object.values`
- `Object.entries`
- `Object.fromEntries`
- `Object.hasOwn`
- JSON との違い
- 非破壊更新
- nested object update
- config object
- options object

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  05-objects-destructuring-immutability/
    index.js
    object-literals-and-access.js
    dynamic-properties.js
    shorthand-and-computed-properties.js
    destructuring-basics.js
    nested-destructuring-defaults.js
    function-parameters-destructuring.js
    rest-property.js
    optional-chaining-for-objects.js
    config-and-options-objects.js
    spread-copy-and-merge.js
    shallow-copy-and-deep-copy.js
    structured-clone.js
    object-static-methods.js
    object-has-own.js
    json-difference.js
    immutable-update.js
    nested-object-update.js

docs/
  05-objects-destructuring-immutability.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 05 のサンプルを順番に実行する入口。
- `object-literals-and-access.js`
  - object literal、dot 記法、bracket 記法による property access を確認する。
- `dynamic-properties.js`
  - 変数で property name を扱う動的 property access を確認する。
- `shorthand-and-computed-properties.js`
  - shorthand property と computed property name を確認する。
- `destructuring-basics.js`
  - object の分割代入の基本を確認する。
- `nested-destructuring-defaults.js`
  - ネストした分割代入と default 値を確認する。
- `function-parameters-destructuring.js`
  - 関数引数での分割代入を確認する。
- `rest-property.js`
  - object rest property で残りの property を集める書き方を確認する。
- `optional-chaining-for-objects.js`
  - object 読み取り時の optional chaining を確認する。
- `config-and-options-objects.js`
  - config object / options object の考え方を確認する。
- `spread-copy-and-merge.js`
  - spread syntax による copy、merge、上書き順序を確認する。
- `shallow-copy-and-deep-copy.js`
  - shallow copy と deep copy の注意点を確認する。
- `structured-clone.js`
  - `structuredClone` による deep clone の入口を確認する。
- `object-static-methods.js`
  - `Object.keys`、`Object.values`、`Object.entries`、`Object.fromEntries` を確認する。
- `object-has-own.js`
  - `Object.hasOwn` による own property 判定を確認する。
- `json-difference.js`
  - JSON と JavaScript object の違いを確認する。
- `immutable-update.js`
  - object / array の非破壊更新を確認する。
- `nested-object-update.js`
  - nested object update で必要な階層まで copy する考え方を確認する。
- `05-objects-destructuring-immutability.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:05
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

1. `src/05-objects-destructuring-immutability/index.js`
2. `src/05-objects-destructuring-immutability/object-literals-and-access.js`
3. `src/05-objects-destructuring-immutability/dynamic-properties.js`
4. `src/05-objects-destructuring-immutability/shorthand-and-computed-properties.js`
5. `src/05-objects-destructuring-immutability/destructuring-basics.js`
6. `src/05-objects-destructuring-immutability/nested-destructuring-defaults.js`
7. `src/05-objects-destructuring-immutability/function-parameters-destructuring.js`
8. `src/05-objects-destructuring-immutability/rest-property.js`
9. `src/05-objects-destructuring-immutability/optional-chaining-for-objects.js`
10. `src/05-objects-destructuring-immutability/config-and-options-objects.js`
11. `src/05-objects-destructuring-immutability/spread-copy-and-merge.js`
12. `src/05-objects-destructuring-immutability/shallow-copy-and-deep-copy.js`
13. `src/05-objects-destructuring-immutability/structured-clone.js`
14. `src/05-objects-destructuring-immutability/object-static-methods.js`
15. `src/05-objects-destructuring-immutability/object-has-own.js`
16. `src/05-objects-destructuring-immutability/json-difference.js`
17. `src/05-objects-destructuring-immutability/immutable-update.js`
18. `src/05-objects-destructuring-immutability/nested-object-update.js`

前半で object の作成・読み取り・分割代入を確認し、後半で copy、merge、shallow copy、非破壊更新を確認する。  
`index.js` から読むと、Unit 全体の実行順を把握しやすい。

## 6. 注目ポイント

### 6-1. dot 記法と bracket 記法を使い分ける

`object-literals-and-access.js` と `dynamic-properties.js` では、object property の読み取り方を確認する。

```js
const user = {
  id: 1,
  name: 'Alice',
  role: 'admin',
};
```

dot 記法は、property name がコード上で固定されている場合に読みやすい。  
bracket 記法は、property name を変数で扱いたい場合に使う。

```js
const propertyName = 'role';
const selectedValue = user[propertyName];
```

フォーム入力、テーブル表示、sort 条件、動的な設定値の読み取りでは、bracket 記法が必要になることがある。

### 6-2. shorthand property と computed property name は object 作成で頻出する

`shorthand-and-computed-properties.js` では、変数名をそのまま property name として使う shorthand property を扱う。

```js
const id = 1;
const name = 'Alice';

const user = {
  id,
  name,
};
```

computed property name は、property name を式で作る書き方。

```js
const fieldName = 'email';

const userInput = {
  [fieldName]: 'alice@example.com',
};
```

React の form state 更新でも、入力欄の `name` 属性をもとに property を更新する場面で同じ考え方を使う。

### 6-3. 分割代入は object から必要な値を取り出す書き方

`destructuring-basics.js` では、object から必要な property を取り出している。

```js
const { id, name, role } = user;
```

別名を付けたい場合は、次のように書ける。

```js
const { name: displayName } = user;
```

分割代入は便利だが、取り出す property が増えすぎると、どの値を使っているか追いにくくなる。  
関数の先頭で必要な値だけを取り出すなど、読みやすい粒度を意識する。

### 6-4. 関数引数の分割代入は options object と相性がよい

`function-parameters-destructuring.js` では、関数引数で object を受け取り、その場で分割代入している。

```js
function createUserCard({ id, name, role = 'reader' }) {
  return `${id}: ${name} (${role})`;
}
```

引数が増える関数では、位置引数より options object の方が意味を読み取りやすい。

```js
createUserCard({
  id: 1,
  name: 'Alice',
  role: 'admin',
});
```

TypeScript では、この object 引数に型を付けることで、呼び出し側と実装側の両方を読みやすくできる。

### 6-5. spread syntax は copy と merge に使えるが shallow copy である

`spread-copy-and-merge.js` では、object を spread して copy / merge している。

```js
const copiedUser = {
  ...baseUser,
};
```

```js
const mergedUser = {
  ...baseUser,
  ...rolePatch,
  ...activePatch,
};
```

同じ property name がある場合は、後ろに書いた値で上書きされる。  
この順序は、default 設定と user 設定を merge するときに重要になる。

### 6-6. nested object update では変更する階層まで copy する

`nested-object-update.js` では、ネストした設定値を非破壊的に更新している。

```js
return {
  ...user,
  settings: {
    ...user.settings,
    notifications: {
      ...user.settings.notifications,
      [channel]: enabled,
    },
  },
};
```

outer object だけ copy して nested object を直接変更すると、元データにも影響する。  
どの階層まで新しくするかを意識することが、React の state 更新でも重要になる。

## 7. 引っかかりやすい点

### 7-1. object の copy は deep copy とは限らない

`shallow-copy-and-deep-copy.js` では、spread による shallow copy を確認している。

```js
const shallowCopiedUser = {
  ...originalUser,
};

shallowCopiedUser.profile.theme = 'dark';
```

outer object は新しくなるが、`profile` は同じ参照のまま。  
そのため、`shallowCopiedUser.profile.theme` を変更すると、元の `originalUser.profile.theme` も変わる。

### 7-2. array を copy しても要素 object までは copy されない

array を spread しても、要素が object の場合、その object までは自動で deep copy されない。

```js
const shallowCopiedProject = {
  ...originalProject,
  members: [...originalProject.members],
};

shallowCopiedProject.members[0].name = 'Carol';
```

`members` array は別参照になるが、`members[0]` の object は同じ参照のまま。  
array と object が組み合わさるデータでは、どの階層の参照を変える必要があるかを確認する。

### 7-3. `structuredClone` は便利だが万能ではない

`structured-clone.js` では、`structuredClone` で deep clone している。

```js
const clonedUser = structuredClone(originalUser);
```

`structuredClone` は、nested object、array、Date などを clone できる。  
ただし、function など clone できない値もある。

```js
structuredClone({ formatter: () => 'text' });
```

deep clone が必要な場面でも、何を clone しているかを意識する必要がある。

### 7-4. JSON と JavaScript object は同じではない

`json-difference.js` では、JavaScript object を JSON 文字列に変換している。

```js
const jsonText = JSON.stringify(user);
const parsedUser = JSON.parse(jsonText);
```

`JSON.stringify` では、function や `undefined` の property は落ち、Date は文字列になる。  
`JSON.parse` で戻る値は plain object であり、Date や method が元通りになるわけではない。

### 7-5. property が存在しないことと、値が `undefined` であることは別

`object-has-own.js` では、`Object.hasOwn` で property の存在を確認している。

```js
const input = {
  name: 'Alice',
  email: undefined,
};
```

```js
const inputChecks = {
  hasEmail: Object.hasOwn(input, 'email'),
  hasRole: Object.hasOwn(input, 'role'),
  emailValue: input.email,
  roleValue: input.role,
};
```

`email` は値が `undefined` でも property 自体は存在する。  
`role` は property 自体が存在しない。  
API レスポンスやフォーム入力を扱うときは、この違いが重要になる。

### 7-6. default 設定と user 設定の merge は上書き順序が重要

object spread では、後ろに書いた property が前の property を上書きする。

```js
const overwriteBefore = {
  ...rolePatch,
  ...baseUser,
};

const overwriteAfter = {
  ...baseUser,
  ...rolePatch,
};
```

default 設定を user 設定で上書きしたい場合、`...defaultSettings` を先に書き、`...userSettings` を後ろに書く。  
順序を逆にすると、user の指定が default で上書きされる可能性がある。

## 8. 実務でよく使う場面

### 8-1. API レスポンスから必要な値だけ取り出す

API レスポンスは object として扱うことが多い。  
分割代入を使うと、必要な property を明示して取り出せる。

```js
const { id, name, role } = user;
```

ただし、ネストが深い場合は optional chaining や default 値も組み合わせる。

### 8-2. options object で関数の引数を読みやすくする

引数が増える関数では、位置引数より object 引数の方が読みやすい。

```js
createSearchUrl({
  keyword: 'javascript',
  page: 2,
  pageSize: 20,
});
```

どの値が何を表しているかが呼び出し側に残るため、設定値や検索条件を渡す関数と相性がよい。

### 8-3. config object を default 設定と user 設定で merge する

config object では、default 設定に user 設定を重ねることが多い。

```js
const mergedConfig = {
  ...defaultConfig,
  ...userConfig,
};
```

このとき、後ろに書いた object が優先される。  
上書き順序は、設定値のバグにつながりやすいため注意する。

### 8-4. React の state を非破壊的に更新する

React では、既存 state を直接変更せず、新しい object / array を作ることが基本になる。

```js
return {
  ...user,
  settings: {
    ...user.settings,
    theme,
  },
};
```

Unit 05 の non-mutating な更新例は、React の state 更新や reducer の理解につながる。

## 9. TS / Reactにつながるポイント

### 9-1. TypeScript では object の形を型として表す

JavaScript では object の形を実行時に読む。  
TypeScript では、object の形を型として表せる。

```ts
type User = {
  id: number;
  name: string;
  role: 'reader' | 'admin';
};
```

Unit 05 で扱った property access、分割代入、options object は、TypeScript の object 型とそのままつながる。

### 9-2. 関数引数の分割代入は props の理解につながる

React component の props は object として渡される。  
関数引数の分割代入を理解しておくと、props の読み取りも理解しやすい。

```jsx
function UserCard({ id, name, role = 'reader' }) {
  return (
    <p>
      {id}: {name} ({role})
    </p>
  );
}
```

JavaScript の object 引数と分割代入は、React component の基本的な書き方につながる。

### 9-3. spread syntax は props 展開や state 更新で頻出する

React では、object spread を props 展開や state 更新で使うことが多い。

```jsx
const nextUser = {
  ...currentUser,
  name: 'Bob',
};
```

ただし、spread は shallow copy。  
ネストした state を更新する場合は、必要な階層まで copy する必要がある。

### 9-4. `Object.entries` / `Object.fromEntries` は変換処理に使える

object を entries に変換すると、array method で処理しやすくなる。

```js
const publicUser = Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'active'));
```

TypeScript では key / value の型が絡むため少し難しくなるが、JavaScript 段階で処理の流れを理解しておくと入りやすい。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- object literal で object を作れるか
- dot 記法と bracket 記法の違いを説明できるか
- 動的 property name を使う場面を説明できるか
- shorthand property の意味を説明できるか
- computed property name の意味を説明できるか
- optional chaining を object 読み取りで使えるか
- object の分割代入で必要な property を取り出せるか
- 分割代入の default 値を説明できるか
- ネストした分割代入の読みづらさと使いどころを説明できるか
- 関数引数での分割代入を説明できるか
- rest property で残りの property を集められるか
- spread syntax で object copy / merge ができるか
- object merge の上書き順序を説明できるか
- spread による copy が shallow copy であることを説明できるか
- deep copy が必要な場面の注意点を説明できるか
- `structuredClone` の概要と制限を説明できるか
- `Object.keys` / `Object.values` / `Object.entries` / `Object.fromEntries` の役割を説明できるか
- `Object.hasOwn` と `in` の違いを説明できるか
- JSON と JavaScript object の違いを説明できるか
- 非破壊更新の考え方を説明できるか
- nested object update で必要な階層まで copy できるか
- config object / options object を使う理由を説明できるか
