# 04. 関数・コールバック・高階関数・クロージャ

## 1. 学習対象

この単位では、JavaScript で関数を値として扱う感覚を固める。  
JavaScript では、関数を変数に代入したり、引数として渡したり、戻り値として返したりできる。  
この性質は、callback、higher-order function、closure、factory function、React Hooks の理解につながる。

特に closure は、JavaScript、TypeScript、React すべてに関係する重要な概念となる。  
関数が定義された lexical scope を覚えていること、状態を関数の内側に閉じ込められること、非同期処理でも外側の値を参照できることを重点的に確認する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- 関数宣言
- 関数式
- アロー関数
- 引数
- デフォルト引数
- rest parameter
- return
- early return
- callback
- higher-order function
- 関数を変数に代入する
- 関数を引数に渡す
- 関数を戻り値にする
- 純粋関数
- 副作用
- レキシカルスコープ
- クロージャ
- factory function
- 状態を閉じ込める関数
- callback とクロージャ
- 非同期処理とクロージャの入口
- 即時実行関数

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  04-functions-callbacks-closure/
    index.js
    function-declarations-and-expressions.js
    arrow-functions.js
    parameters-defaults-rest.js
    return-and-early-return.js
    functions-as-values.js
    callback-basics.js
    higher-order-functions.js
    pure-functions-and-side-effects.js
    lexical-scope.js
    closure-basics.js
    factory-functions.js
    encapsulated-state.js
    callback-and-closure.js
    async-closure-entry.js
    immediately-invoked-functions.js

docs/
  04-functions-callbacks-closure.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 04 のサンプルを順番に実行する入口。
- `function-declarations-and-expressions.js`
  - 関数宣言、関数式、名前付き関数式、hoisting の違いを確認する。
- `arrow-functions.js`
  - アロー関数、式本体、object literal を返す書き方、`this` の入口を確認する。
- `parameters-defaults-rest.js`
  - 引数、デフォルト引数、rest parameter を確認する。
- `return-and-early-return.js`
  - `return`、return なしの戻り値、early return を確認する。
- `functions-as-values.js`
  - 関数を変数、object、array に入れて値として扱う例を確認する。
- `callback-basics.js`
  - callback を引数として渡し、呼び出し先で実行する考え方を確認する。
- `higher-order-functions.js`
  - 関数を引数に受け取る関数、関数を戻り値にする関数を確認する。
- `pure-functions-and-side-effects.js`
  - 純粋関数と副作用の違いを確認する。
- `lexical-scope.js`
  - 関数が定義された場所の scope を参照することを確認する。
- `closure-basics.js`
  - closure の基本と、関数が外側の値を保持することを確認する。
- `factory-functions.js`
  - 設定値を閉じ込めた関数を作る factory function を確認する。
- `encapsulated-state.js`
  - closure で状態を閉じ込める関数を確認する。
- `callback-and-closure.js`
  - callback と closure を組み合わせた例を確認する。
- `async-closure-entry.js`
  - 非同期処理でも closure が外側の値を参照することを確認する。
- `immediately-invoked-functions.js`
  - 即時実行関数の概要と現在の ES Modules での位置づけを確認する。
- `04-functions-callbacks-closure.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:04
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

1. `src/04-functions-callbacks-closure/index.js`
2. `src/04-functions-callbacks-closure/function-declarations-and-expressions.js`
3. `src/04-functions-callbacks-closure/arrow-functions.js`
4. `src/04-functions-callbacks-closure/parameters-defaults-rest.js`
5. `src/04-functions-callbacks-closure/return-and-early-return.js`
6. `src/04-functions-callbacks-closure/functions-as-values.js`
7. `src/04-functions-callbacks-closure/callback-basics.js`
8. `src/04-functions-callbacks-closure/higher-order-functions.js`
9. `src/04-functions-callbacks-closure/pure-functions-and-side-effects.js`
10. `src/04-functions-callbacks-closure/lexical-scope.js`
11. `src/04-functions-callbacks-closure/closure-basics.js`
12. `src/04-functions-callbacks-closure/factory-functions.js`
13. `src/04-functions-callbacks-closure/encapsulated-state.js`
14. `src/04-functions-callbacks-closure/callback-and-closure.js`
15. `src/04-functions-callbacks-closure/async-closure-entry.js`
16. `src/04-functions-callbacks-closure/immediately-invoked-functions.js`

前半で関数を値として扱う土台を作り、後半で lexical scope と closure を重点的に確認する。  
`index.js` から読むと、Unit 全体の実行順を把握しやすい。

## 6. 注目ポイント

### 6-1. JavaScript では関数も値として扱える

`functions-as-values.js` では、関数を変数に代入している。

```js
const formatter = toUpperText;
const formattedText = formatter('javascript');
```

関数は値として扱えるため、object のプロパティや array の要素にも入れられる。

```js
const formatterMap = {
  upper: toUpperText,
  lower: toLowerText,
  decorate: decorateText,
};
```

この感覚は、callback、higher-order function、React のイベントハンドラ、hooks の callback につながる。

### 6-2. callback は「後で呼ばれる関数」を渡す仕組み

`callback-basics.js` では、関数に callback を渡している。

```js
function applyToEach(values, callback) {
  const results = [];

  for (const value of values) {
    results.push(callback(value));
  }

  return results;
}
```

呼び出し側では、具体的な処理だけを callback として渡す。

```js
const doubledNumbers = applyToEach(numbers, (value) => value * 2);
const squaredNumbers = applyToEach(numbers, (value) => value ** 2);
```

「繰り返す」「条件を確認する」「通知する」といった処理の流れは呼び出し先が持ち、具体的な処理だけを callback で差し替えられる。

### 6-3. higher-order function は関数を受け取る、または関数を返す

`higher-order-functions.js` では、関数を戻り値として返している。

```js
function createMultiplier(multiplier) {
  return (value) => value * multiplier;
}
```

呼び出し側では、設定済みの関数を作ってから使う。

```js
const double = createMultiplier(2);
const triple = createMultiplier(3);
```

JavaScript では関数を値として扱えるため、このような「関数を作る関数」を自然に書ける。  
後半の closure では、この戻り値の関数が外側の `multiplier` を覚えていることが重要になる。

### 6-4. 純粋関数と副作用を分けて読む

`pure-functions-and-side-effects.js` では、元の array を変更しない関数を扱っている。

```js
function addTodoPure(todos, title) {
  return [
    ...todos,
    {
      id: todos.length + 1,
      title,
      completed: false,
    },
  ];
}
```

一方、次の関数は引数で受け取った array を直接変更する。

```js
function addTodoWithSideEffect(todos, title) {
  todos.push({
    id: todos.length + 1,
    title,
    completed: false,
  });

  return todos;
}
```

副作用がすべて悪いわけではない。  
ただし、どの関数が外側の状態を変えるのかを読めることが、React の state 更新や API 処理で重要になる。

### 6-5. lexical scope は「定義された場所」で決まる

`lexical-scope.js` では、関数が定義された場所の変数を参照している。

```js
function createFormatter() {
  const prefix = 'created in createFormatter';

  return function format(value) {
    return `${prefix}: ${value}`;
  };
}
```

この関数を別の場所で呼び出しても、参照する `prefix` は呼び出し先のものではなく、定義された場所のものになる。

```js
function callFormatter(formatter) {
  const prefix = 'created in callFormatter';

  return formatter(prefix);
}
```

JavaScript の関数は、呼び出し場所ではなく定義場所の lexical scope を覚える。

### 6-6. closure は外側の値を保持する関数として読む

`closure-basics.js` では、`createGreeter` が関数を返している。

```js
function createGreeter(greeting) {
  return function greet(name) {
    return `${greeting}, ${name}`;
  };
}
```

`createGreeter` の実行が終わった後も、戻り値の関数は `greeting` を参照できる。

```js
const sayHello = createGreeter('Hello');
const sayGoodMorning = createGreeter('Good morning');
```

closure は、外側の値を「コピーして持つ」というより、関数が定義された lexical scope への参照を保つ仕組みとして考えると理解しやすい。

### 6-7. closure で状態を閉じ込められる

`encapsulated-state.js` では、`count` を関数の外から直接触れない場所に置いている。

```js
function createCounterStore(initialCount = 0) {
  let count = initialCount;

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    getCount() {
      return count;
    },
  };
}
```

`count` は `createCounterStore` の外側から直接参照できない。  
ただし、返された `increment`、`decrement`、`getCount` からは参照できる。

状態を閉じ込める書き方は便利だが、状態を持つ関数は副作用も持ちやすい。  
どこで状態が変わるのかを追える設計にすることが重要になる。

### 6-8. 非同期処理でも closure の考え方は変わらない

`async-closure-entry.js` では、`await` をまたいでも外側の `prefix` を参照している。

```js
function createAsyncLabeler(prefix) {
  return async function label(value) {
    await Promise.resolve();

    return `${prefix}: ${value}`;
  };
}
```

非同期処理でも、関数は定義された lexical scope を参照できる。  
一方で、外側の値がいつ変更されるかによって、callback や async function が読む値も変わる可能性がある。

## 7. 引っかかりやすい点

### 7-1. 関数宣言と関数式は hoisting の挙動が違う

`function-declarations-and-expressions.js` では、関数宣言と関数式の違いを確認している。

```js
function createMessageByDeclaration(name) {
  return `Hello, ${name}`;
}
```

関数宣言は hoisting されるため、宣言より前から呼べる。  
一方、`const` に入れた関数式は TDZ の影響を受ける。

```js
const createMessageByExpression = function (name) {
  return `Hi, ${name}`;
};
```

どちらも関数だが、宣言方法によって読み方が変わる。

### 7-2. アロー関数は通常の function と完全に同じではない

`arrow-functions.js` では、アロー関数の基本構文を扱っている。

```js
const createMessage = (name) => {
  return `Hello, ${name}`;
};
```

アロー関数は短く書ける一方、`this` を自分では持たない。  
そのため、object の method として使う場合や、`this` を使う処理では通常の function / method shorthand との違いに注意する。

### 7-3. default parameter は `undefined` のときに使われる

`parameters-defaults-rest.js` では、`role = 'reader'` のように default parameter を使っている。

```js
function createUser({ id, name, role = 'reader' }) {
  return { id, name, role };
}
```

default parameter は、値が `undefined` の場合に使われる。  
`null` は明示的に渡された値として扱われるため、default にはならない。

### 7-4. return なしの関数は `undefined` を返す

`return-and-early-return.js` では、return を書かない関数を確認している。

```js
function withoutReturn() {
  const message = 'returnしない関数';
  console.log(message);
}
```

この関数の戻り値は `undefined` になる。  
値を返す関数なのか、副作用を起こす関数なのかを分けて読むと、処理の意図を追いやすい。

### 7-5. closure は値を固定コピーしているとは限らない

`async-closure-entry.js` では、外側の `latestStatus` を async function から参照している。

```js
let latestStatus = 'initial';

const readLatestStatus = async () => {
  await Promise.resolve();
  return latestStatus;
};
```

その後、`latestStatus` を変更している。

```js
const statusPromise = readLatestStatus();
latestStatus = 'updated';
```

戻り値は `updated` になる。  
closure は「関数作成時の値を常に固定コピーする」と考えるより、「定義された scope の変数を参照する」と考える方が正確。

### 7-6. 状態を閉じ込める関数は便利だが、変更タイミングを追う必要がある

`encapsulated-state.js` では、`count` を closure で閉じ込めている。

```js
let count = initialCount;
```

返された method からは `count` を更新できる。

```js
increment() {
  count += 1;
  return count;
}
```

外から直接触れない状態を作れる一方、どの method が状態を変更するのかを追えないと、挙動が分かりにくくなる。

### 7-7. 即時実行関数は現在でも読める必要がある

`immediately-invoked-functions.js` では、即時実行関数で値を初期化している。

```js
const initializedConfig = (() => {
  const apiBaseUrl = 'https://example.com/api';
  const timeoutMs = 5000;

  return {
    apiBaseUrl,
    timeoutMs,
  };
})();
```

現在の ES Modules では module scope があるため、昔ほど必須ではない。  
ただし、既存コードや古い記事では出てくるため、読み方は知っておくとよい。

## 8. 実務でよく使う場面

### 8-1. array method に callback を渡してデータ変換する

`callback-basics.js` では、`filter` と `map` に callback を渡している。

```js
const activeUserNames = users.filter((user) => user.active).map((user) => user.name);
```

実務でも、API レスポンスを表示用データに変換するときに `map` / `filter` / `find` などをよく使う。  
callback の読み方に慣れると、JavaScript / TypeScript のデータ処理が読みやすくなる。

### 8-2. 設定値を閉じ込めた関数を作る

`factory-functions.js` では、設定値を受け取り、設定済みの関数を返している。

```js
function createMinimumLengthValidator(minimumLength) {
  return function validate(value) {
    return value.length >= minimumLength;
  };
}
```

フォーム validation、フォーマット処理、権限判定、ログ出力などで、設定値を閉じ込めた関数を作る場面がある。

### 8-3. React のイベントハンドラや hooks で関数を扱う

React では、イベントハンドラや hooks の callback として関数を渡すことが多い。

```jsx
<button onClick={() => setCount((count) => count + 1)}>+1</button>
```

このようなコードでは、関数を値として渡す感覚、callback、closure の理解が必要になる。

### 8-4. 外側の状態を変更する関数と、値を返すだけの関数を分ける

`pure-functions-and-side-effects.js` では、元の array を変更しない関数と、変更する関数を分けている。

```js
function addTodoPure(todos, title) {
  return [
    ...todos,
    {
      id: todos.length + 1,
      title,
      completed: false,
    },
  ];
}
```

値を返すだけの関数と、外側に影響する関数を分けて設計すると、テストや修正がしやすくなる。

### 8-5. 非同期処理で外側の値を参照する

`async-closure-entry.js` では、async function が外側の値を参照している。

```js
function createAsyncLabeler(prefix) {
  return async function label(value) {
    await Promise.resolve();

    return `${prefix}: ${value}`;
  };
}
```

非同期処理では、callback が実行されるタイミングと、外側の値が更新されるタイミングを意識する必要がある。  
この感覚は React Hooks の古い closure 問題にもつながる。

## 9. TS / Reactにつながるポイント

### 9-1. TypeScript では関数の引数と戻り値に型が付く

JavaScript では、関数の引数や戻り値の型は実行時まで分からない。  
TypeScript では、関数の型を明示できる。

```ts
function calculateDiscountPrice(price: number, discountRate: number): number {
  return Math.floor(price * (1 - discountRate));
}
```

JavaScript の段階で、引数、戻り値、callback の流れを読めるようにしておくと、TypeScript の関数型も理解しやすい。

### 9-2. callback の型は TypeScript で重要になる

callback を受け取る関数は、TypeScript では callback の型も表現する。

```ts
function filterBy<T>(values: T[], callback: (value: T) => boolean): T[] {
  return values.filter(callback);
}
```

今回の Unit で callback の「渡す側」と「呼ぶ側」を分けて理解しておくと、関数型の読み方につながる。

### 9-3. React Hooks は closure の理解が重要になる

React Hooks では、component の render ごとに関数が作られ、その関数がその時点の値を参照する。  
そのため、closure の理解が重要になる。

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

このようなコードでは、`handleClick` がどの `count` を参照しているのかを考える必要がある。

### 9-4. 状態を直接変更しない関数は React の state 更新につながる

`addTodoPure` のように、新しい array を返す関数は React の state 更新と相性がよい。

```js
function addTodoPure(todos, title) {
  return [
    ...todos,
    {
      id: todos.length + 1,
      title,
      completed: false,
    },
  ];
}
```

React では、既存 state を直接変更せず、新しい値を作って更新することが基本になる。  
純粋関数と副作用の区別は、React のコンポーネント設計にも関係する。

### 9-5. factory function は hooks や utility 設計の入口になる

設定値を受け取って関数を返す考え方は、custom hooks や utility 関数の設計にもつながる。

```ts
function createFormatter(prefix: string): (value: string) => string {
  return (value) => `${prefix}${value}`;
}
```

関数を返す関数、外側の値を閉じ込める関数、callback として渡す関数を区別できると、TypeScript / React のコードを読みやすくなる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- 関数宣言と関数式の違いを説明できるか
- アロー関数の基本構文を説明できるか
- アロー関数で object literal を返すときに `()` が必要な理由を説明できるか
- デフォルト引数が `undefined` のときに使われることを説明できるか
- rest parameter が残りの引数を array として受け取ることを説明できるか
- `return` なしの関数が `undefined` を返すことを説明できるか
- early return の利点を説明できるか
- 関数を値として扱えることを説明できるか
- callback の「渡す側」と「呼ぶ側」を説明できるか
- higher-order function の概要を説明できるか
- 関数を戻り値として返す例を説明できるか
- 純粋関数と副作用の違いを説明できるか
- lexical scope が「定義された場所」で決まることを説明できるか
- closure が外側の値を参照し続けられることを説明できるか
- factory function の使いどころを説明できるか
- closure で状態を閉じ込める例を説明できるか
- callback と closure が組み合わさる例を説明できるか
- 非同期処理でも closure が外側の値を参照することを説明できるか
- 即時実行関数の概要を説明できるか
- React Hooks の理解に closure が必要になる理由を説明できるか
