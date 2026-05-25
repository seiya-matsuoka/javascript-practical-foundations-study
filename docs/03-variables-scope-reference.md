# 03. 変数宣言・スコープ・巻き上げ・参照

## 1. 学習対象

この単位では、`let` / `const` / `var`、スコープ、hoisting、temporal dead zone、参照共有、ミューテーションの違いを扱う。  
JavaScript では、変数に入っている値が primitive なのか object なのかによって、代入・関数呼び出し・更新時の見え方が変わる。

この単位は、React の state 更新や、イミュータブルなデータ操作にもつながる。  
`const` は変数への再代入を禁止するものであり、object の中身を不変にするものではない点を重点的に確認する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- `let`
- `const`
- `var`
- 再代入
- ミューテーション
- ブロックスコープ
- 関数スコープ
- グローバルスコープ
- hoisting
- temporal dead zone
- primitive の値の扱い
- object の参照共有
- 配列の参照共有
- 関数に渡した値と参照
- `const` とオブジェクト変更
- shallow copy の入口
- `Object.freeze` の概要
- Java の `final` との感覚の違い

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  03-variables-scope-reference/
    index.js
    variable-declarations.js
    reassignment-and-mutation-intro.js
    scope-rules.js
    hoisting-and-tdz.js
    primitive-vs-object-values.js
    object-reference-sharing.js
    array-reference-sharing.js
    function-arguments-reference.js
    const-object-change.js
    shallow-copy.js
    object-freeze.js

docs/
  03-variables-scope-reference.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 03 のサンプルを順番に実行する入口。
- `variable-declarations.js`
  - `let` / `const` / `var` と再代入の違いを確認する。
- `reassignment-and-mutation-intro.js`
  - 再代入とミューテーションの違いを確認する。
- `scope-rules.js`
  - ブロックスコープ、関数スコープ、module scope、`globalThis` を確認する。
- `hoisting-and-tdz.js`
  - `var` の hoisting と `let` / `const` の temporal dead zone を確認する。
- `primitive-vs-object-values.js`
  - primitive と object の代入時の見え方を比較する。
- `object-reference-sharing.js`
  - object の参照共有と shallow copy の入口を確認する。
- `array-reference-sharing.js`
  - array の参照共有と新しい array の作り方を確認する。
- `function-arguments-reference.js`
  - 関数に primitive と object を渡したときの違いを確認する。
- `const-object-change.js`
  - `const` と object 変更の関係を確認する。
- `shallow-copy.js`
  - spread による shallow copy とネストした object の扱いを確認する。
- `object-freeze.js`
  - `Object.freeze` の概要と shallow な freeze を確認する。
- `03-variables-scope-reference.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:03
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

1. `src/03-variables-scope-reference/index.js`
2. `src/03-variables-scope-reference/variable-declarations.js`
3. `src/03-variables-scope-reference/reassignment-and-mutation-intro.js`
4. `src/03-variables-scope-reference/scope-rules.js`
5. `src/03-variables-scope-reference/hoisting-and-tdz.js`
6. `src/03-variables-scope-reference/primitive-vs-object-values.js`
7. `src/03-variables-scope-reference/object-reference-sharing.js`
8. `src/03-variables-scope-reference/array-reference-sharing.js`
9. `src/03-variables-scope-reference/function-arguments-reference.js`
10. `src/03-variables-scope-reference/const-object-change.js`
11. `src/03-variables-scope-reference/shallow-copy.js`
12. `src/03-variables-scope-reference/object-freeze.js`

前半で宣言・スコープ・hoisting を確認し、後半で参照共有とミューテーションを確認する。  
`index.js` から読むと、Unit 全体の実行順を把握しやすい。

## 6. 注目ポイント

### 6-1. `const` は object の中身を不変にするものではない

`variable-declarations.js` では、`const` で宣言した配列を変更している。

```js
const tags = ['javascript', 'nodejs'];

tags.push('browser');
```

`const` が禁止するのは、変数が別の値を指し直すこと。  
配列や object の中身の変更までは禁止しない。

`const-object-change.js` でも、同じ考え方を object で確認している。

```js
const user = {
  id: 1,
  name: 'Alice',
  preferences: {
    theme: 'light',
  },
};

user.name = 'Bob';
user.preferences.theme = 'dark';
```

Java の `final` と似て見えるが、「参照先の中身が完全に不変になる」という意味ではない。

### 6-2. 再代入とミューテーションは別の操作

`reassignment-and-mutation-intro.js` では、primitive 値の再代入と object のミューテーションを分けている。

```js
let displayName = 'Alice';
const beforeReassignment = displayName;

displayName = 'Bob';
```

これは、変数 `displayName` が別の値を指し直す再代入。

```js
const user = {
  id: 1,
  name: 'Alice',
  active: true,
};

user.name = 'Bob';
user.active = false;
```

これは、`user` が指す object の中身を変更するミューテーション。  
React の state 更新では、既存 object を直接ミューテーションせず、新しい object を作る考え方が重要になる。

### 6-3. `var` は block scope ではなく function scope になる

`scope-rules.js` では、`var` が if ブロックの外側、ただし同じ function の中から参照できることを確認している。

```js
if (true) {
  const blockScopedConst = 'block内のconst';
  let blockScopedLet = 'block内のlet';

  // eslint-disable-next-line no-var
  var functionScopedVar = 'block内で宣言したvar';

  blockScopedLet = 'block内で再代入したlet';
}
```

`let` / `const` は block scope を持つ。  
一方、`var` は function scope となるため、現在の JavaScript では新しく書くコードで積極的に使う必要は少ない。

### 6-4. `var` の hoisting と `let` / `const` の TDZ は挙動が違う

`hoisting-and-tdz.js` では、`var` の hoisting と `let` / `const` の temporal dead zone を比較している。

```js
const varHoistingResult = executeSnippet(`
  "use strict";
  const beforeDeclaration = legacyValue;
  var legacyValue = "declared by var";

  return {
    beforeDeclaration,
    afterDeclaration: legacyValue,
  };
`);
```

`var` は宣言より前で参照しても `undefined` になる。  
一方、`let` / `const` は宣言前に参照すると `ReferenceError` になる。

```js
const letTdzResult = executeSnippet(`
  "use strict";
  const beforeDeclaration = blockValue;
  let blockValue = "declared by let";

  return beforeDeclaration;
`);
```

`let` / `const` の TDZ は、初期化前の値をうっかり使う事故を防ぐ役割を持つ。

### 6-5. object を代入すると参照が共有される

`primitive-vs-object-values.js` では、primitive と object の代入の違いを確認している。

```js
let firstScore = 80;
let copiedScore = firstScore;

copiedScore = 95;
```

primitive 値では、`copiedScore` を再代入しても `firstScore` は変わらない。

```js
const firstUser = {
  id: 1,
  name: 'Alice',
};

const sharedUser = firstUser;

sharedUser.name = 'Bob';
```

object では、`firstUser` と `sharedUser` が同じ object を参照する。  
`sharedUser.name` を変更すると、`firstUser` から見える値も変わる。

### 6-6. spread は shallow copy を作る

`shallow-copy.js` では、spread による shallow copy を確認している。

```js
const shallowCopiedUser = {
  ...user,
  name: 'Bob',
};

shallowCopiedUser.profile.role = 'editor';
```

outer object は新しくなるが、ネストした `profile` は同じ参照のままになる。  
ネスト部分も変更したくない場合は、ネストした object も明示的にコピーする。

```js
const safelyUpdatedUser = {
  ...user,
  profile: {
    ...user.profile,
    language: 'en',
  },
};
```

## 7. 引っかかりやすい点

### 7-1. `const` を使えば安全、とは限らない

`const` を使っても、object の中身は変更できる。

```js
const user = {
  id: 1,
  name: 'Alice',
};

user.name = 'Bob';
```

`const` は再代入を防ぐだけであり、ミューテーションを防ぐものではない。  
object の中身を変更したくない場合は、更新方法や copy の作り方を意識する必要がある。

### 7-2. `var` は block scope ではない

`var` は if や for の block でスコープが切られない。

```js
if (true) {
  // eslint-disable-next-line no-var
  var functionScopedVar = 'block内で宣言したvar';
}
```

既存コードでは `var` を見ることがあるが、新しく書くコードでは `let` / `const` を基本にする方が読みやすい。

### 7-3. hoisting を「どこでも安全に使える」と考えない

`var` は宣言より前でも参照できるが、値は `undefined` になる。

```js
const beforeDeclaration = legacyValue;
var legacyValue = 'declared by var';
```

この挙動は便利というより、読みづらさやバグの原因になりやすい。  
`let` / `const` では TDZ により `ReferenceError` になるため、宣言前に使わない書き方を徹底しやすい。

### 7-4. object の copy は深さを意識する

spread は shallow copy を作るだけ。

```js
const shallowCopiedUser = {
  ...user,
};
```

ネストした object まで自動で別 object になるわけではない。  
React の state 更新や API レスポンス加工では、どの階層まで copy が必要かを意識する。

### 7-5. 関数に object を渡すと、関数内のミューテーションが呼び出し元にも影響する

`function-arguments-reference.js` では、object を引数として渡した関数でプロパティを変更している。

```js
function deactivateUser(user) {
  user.active = false;

  return user;
}
```

この場合、呼び出し元の `user` も変更される。  
呼び出し元を変えたくない場合は、新しい object を返す。

```js
function createDeactivatedUser(user) {
  return {
    ...user,
    active: false,
  };
}
```

### 7-6. `Object.freeze` は shallow である

`object-freeze.js` では、`Object.freeze` がネストした object までは freeze しないことを確認している。

```js
const nestedSettings = Object.freeze({
  theme: 'light',
  layout: {
    sidebar: 'expanded',
  },
});

nestedSettings.layout.sidebar = 'collapsed';
```

`nestedSettings` 自体は freeze されるが、`nestedSettings.layout` は別途 freeze されていない。  
そのため、ネストした object の中身は変更できる。

## 8. 実務でよく使う場面

### 8-1. 状態変更を追いやすくするために `const` を基本にする

変数が再代入されない場合は、`const` を使うと意図が伝わりやすい。

```js
const createdBy = 'system';
```

再代入が必要な場合だけ `let` を使う。  
これにより、値がどこで変わるのかを追いやすくなる。

### 8-2. API レスポンスを加工するときに元データを変更しない

object や array を扱うとき、参照共有により元データが変更されることがある。

```js
const sameUser = user;

sameUser.profile.role = 'editor';
```

API レスポンスや既存 state を加工する場合、元データを直接変更しないように、新しい object / array を作ることが多い。

### 8-3. React の state 更新で shallow copy を使う

React の state では、既存 object を直接変更せず、新しい object を作るのが基本になる。

```js
const safelyUpdatedUser = {
  ...user,
  profile: {
    ...user.profile,
    language: 'en',
  },
};
```

今回のサンプルは React そのものではないが、考え方は state 更新に直結する。

### 8-4. 設定値や定数 object に `Object.freeze` を使うことがある

`object-freeze.js` では、定数 object を `Object.freeze` している。

```js
const statusLabels = Object.freeze({
  draft: '下書き',
  published: '公開済み',
});
```

変更されたくない設定値やラベル定義に使う場面がある。  
ただし、shallow freeze であるため、ネストした object まで完全に不変になるわけではない。

## 9. TS / Reactにつながるポイント

### 9-1. TypeScript でも `const` は object の中身を不変にしない

TypeScript でも、`const` の意味は JavaScript と同じ。  
変数への再代入を防ぐだけであり、object のプロパティ変更は型が許せば可能。

```ts
const user = {
  id: 1,
  name: 'Alice',
};

user.name = 'Bob';
```

プロパティ単位で不変性を表したい場合は、`readonly` など別の仕組みを使う。

### 9-2. React の state 更新では参照共有を避ける

React では、既存 state を直接変更せず、新しい object / array を作ることが基本になる。

```jsx
setUser((currentUser) => ({
  ...currentUser,
  profile: {
    ...currentUser.profile,
    language: 'en',
  },
}));
```

Unit 03 で扱った shallow copy と参照共有の理解が、そのまま React の state 更新に関係する。

### 9-3. `let` / `const` の使い分けは TypeScript / React でも同じ

再代入しない値は `const`、再代入が必要な値だけ `let` を使う。

```ts
const userName = 'Alice';
let retryCount = 0;

retryCount += 1;
```

React のコンポーネント内でも、再代入の有無が読みやすさに関係する。  
`var` を新しく書く場面はほとんどない。

### 9-4. TDZ と hoisting の理解は callback や関数定義の配置にも関係する

関数宣言は hoisting される一方、`const` に代入した関数式や arrow function は TDZ の影響を受ける。

```js
const createMessage = function (name) {
  return `Hello, ${name}`;
};
```

TypeScript / React でも、関数をどこで定義し、どこで呼び出すかは読みやすさに影響する。  
基本的には、使う前に定義が見える構成にする方が追いやすい。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `let` / `const` / `var` の違いを説明できるか
- `const` が禁止するのは再代入であり、object の中身の変更ではないことを説明できるか
- 再代入とミューテーションの違いを説明できるか
- ブロックスコープと関数スコープの違いを説明できるか
- `var` が block scope ではないことを説明できるか
- ES Modules の module scope と `globalThis` の違いを説明できるか
- hoisting の概要を説明できるか
- temporal dead zone の概要を説明できるか
- primitive 値を代入した場合と object を代入した場合の違いを説明できるか
- object の参照共有を説明できるか
- array の参照共有を説明できるか
- 関数に primitive と object を渡したときの違いを説明できるか
- shallow copy の意味を説明できるか
- spread による object copy がネストした object まで深くコピーしないことを説明できるか
- `Object.freeze` が shallow であることを説明できるか
- React の state 更新で参照共有とミューテーションが問題になる理由を説明できるか
