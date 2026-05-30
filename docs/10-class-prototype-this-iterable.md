# 10. class・prototype・this・iterable・generator

## 1. 学習対象

この単位では、JavaScript のオブジェクト指向的な仕組みと、Java との違いを扱う。  
`this`、`class`、prototype、継承、object literal、factory function、iterable、iterator、generator を確認する。

JavaScript の `class` は Java の class と見た目が似ているが、仕組みとしては prototype を土台にしている。  
そのため、Java の感覚だけで読むと、`this` の決まり方、method の配置、prototype chain、callback で `this` が失われるケースを誤解しやすい。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- `this` は呼び出し方で決まること
- メソッド呼び出し
- 関数呼び出し
- アロー関数の `this`
- `bind`
- `call`
- `apply`
- callback で `this` が失われるケース
- class 構文
- constructor
- instance method
- static method
- private field
- getter
- setter
- extends
- 継承
- prototype の概要
- class は prototype ベースの構文であること
- object literal との違い
- factory function との違い
- Java の class との違い
- iterable
- iterator
- `for...of`
- spread との関係
- generator function
- `yield`
- 遅延評価の考え方
- 自作 iterable

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  10-class-prototype-this-iterable/
    index.js
    this-call-rules.js
    bind-call-apply.js
    class-basics.js
    class-private-getter-setter.js
    inheritance-and-prototype.js
    object-literal-factory-class.js
    iterable-iterator-basics.js
    generator-basics.js
    custom-iterable.js

docs/
  10-class-prototype-this-iterable.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 10 のサンプルを順番に実行する入口。
- `this-call-rules.js`
  - `this` が呼び出し方で決まること、method 呼び出し、関数呼び出し、callback で `this` が失われる例を確認する。
- `bind-call-apply.js`
  - `bind` / `call` / `apply` で `this` を明示的に指定する例を確認する。
- `class-basics.js`
  - class 構文、constructor、instance method、static method、prototype 上の method を確認する。
- `class-private-getter-setter.js`
  - private field、getter、setter、validation を伴う代入を確認する。
- `inheritance-and-prototype.js`
  - `extends`、`super`、method override、prototype chain、`instanceof` を確認する。
- `object-literal-factory-class.js`
  - object literal、factory function、class の違いを確認する。
- `iterable-iterator-basics.js`
  - iterable、iterator、`for...of`、spread、Map の iteration を確認する。
- `generator-basics.js`
  - generator function、`yield`、遅延評価の入口を確認する。
- `custom-iterable.js`
  - `Symbol.iterator` を使った自作 iterable を確認する。
- `10-class-prototype-this-iterable.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:10
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

1. `src/10-class-prototype-this-iterable/index.js`
2. `src/10-class-prototype-this-iterable/this-call-rules.js`
3. `src/10-class-prototype-this-iterable/bind-call-apply.js`
4. `src/10-class-prototype-this-iterable/class-basics.js`
5. `src/10-class-prototype-this-iterable/class-private-getter-setter.js`
6. `src/10-class-prototype-this-iterable/inheritance-and-prototype.js`
7. `src/10-class-prototype-this-iterable/object-literal-factory-class.js`
8. `src/10-class-prototype-this-iterable/iterable-iterator-basics.js`
9. `src/10-class-prototype-this-iterable/generator-basics.js`
10. `src/10-class-prototype-this-iterable/custom-iterable.js`

先に `this` の決まり方を確認し、その後に class / prototype、最後に iterable / generator を確認する。  
`index.js` から読むと、Unit 全体の実行順を把握しやすい。

## 6. 注目ポイント

### 6-1. `this` は定義場所ではなく呼び出し方で決まる

`this-call-rules.js` では、同じ method でも呼び出し方によって `this` が変わることを確認している。

```js
const user = {
  id: 1,
  name: 'Alice',
  createLabel() {
    return `${this.id}: ${this.name}`;
  },
};

const methodCallResult = user.createLabel();
```

`user.createLabel()` のように object の method として呼び出すと、`this` は `user` になる。  
一方で、method を変数に取り出して呼ぶと、object との結びつきが失われる。

```js
const detachedCreateLabel = user.createLabel;

try {
  detachedCreateLabel();
} catch (error) {
  detachedCallErrorMessage = error.message;
}
```

Java の instance method の感覚では、method が常に instance と結びついているように見える。  
しかし JavaScript では、関数としてどう呼び出されたかを見る必要がある。

### 6-2. `bind` / `call` / `apply` は `this` を明示的に指定する

`bind-call-apply.js` では、`call`、`apply`、`bind` を使って `this` を指定している。

```js
const callResult = createUserLabel.call(user, '[', ']');

const applyResult = createUserLabel.apply(user, ['<', '>']);

const boundCreateUserLabel = createUserLabel.bind(user);
const bindResult = boundCreateUserLabel('(', ')');
```

`call` と `apply` は、その場で関数を呼び出す。  
`bind` は、`this` が固定された新しい関数を返す。

callback に method を渡す場面では、`this` が失われやすい。

```js
const formattedNames = names.map(formatter.format.bind(formatter));
```

このように `bind` した関数を渡すことで、callback として呼び出されても `formatter` を `this` として参照できる。

### 6-3. JavaScript の class method は prototype 上に置かれる

`class-basics.js` では、class から instance を作り、method の配置を確認している。

```js
class Task {
  constructor({ id, title, completed = false }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  complete() {
    this.completed = true;

    return this;
  }

  static createDraft(title) {
    return new Task({
      id: 0,
      title,
      completed: false,
    });
  }
}
```

`complete()` は instance 自身の property ではなく、`Task.prototype` に置かれる。

```js
const prototypeChecks = {
  hasOwnComplete: Object.hasOwn(task, 'complete'),
  prototypeHasComplete: Object.hasOwn(Task.prototype, 'complete'),
  taskPrototypeIsClassPrototype: Object.getPrototypeOf(task) === Task.prototype,
};
```

JavaScript の class は、prototype ベースの仕組みを class 風の構文で書けるようにしたもの。  
Java の class と同じメモリモデルや型システムを持つわけではない。

### 6-4. private field / getter / setter で外から見せる面を分ける

`class-private-getter-setter.js` では、`#price` を private field として持つ class を定義している。

```js
class Product {
  #price;

  constructor({ id, name, price }) {
    this.id = id;
    this.name = name;
    this.#price = price;
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error('priceは0以上の数値で指定する必要がある。');
    }

    this.#price = value;
  }
}
```

private field は class の外から直接参照できない。  
getter / setter を使うと、読み取りや代入のような見た目を保ちながら、validation を挟める。

### 6-5. iterable は `for...of` や spread とつながる

`iterable-iterator-basics.js` では、Array、String、Map を iterable として扱っている。

```js
const values = ['JavaScript', 'TypeScript', 'React'];

const forOfResults = [];

for (const value of values) {
  forOfResults.push(value.toUpperCase());
}

const spreadResults = [...values];
```

`for...of` や spread は、iterable を順番に取り出す仕組みを使っている。  
Array だけでなく、String、Map、Set、generator、自作 iterable も同じ考え方で扱える。

### 6-6. generator は `yield` で値を順番に返す

`generator-basics.js` では、generator function を使って値を順番に返している。

```js
function* createNumberSequence() {
  yield 1;
  yield 2;
  yield 3;
}
```

generator は `next()` で進み、`yield` の位置で一度止まる。

```js
const numberSequence = createNumberSequence();

const firstNext = numberSequence.next();
const secondNext = numberSequence.next();
```

必要になったタイミングで値を取り出すため、遅延評価の入口として理解できる。

## 7. 引っかかりやすい点

### 7-1. method を取り出すと `this` が失われる

`this-call-rules.js` では、method を変数に代入してから呼び出している。

```js
const detachedCreateLabel = user.createLabel;

try {
  detachedCreateLabel();
} catch (error) {
  detachedCallErrorMessage = error.message;
}
```

`user.createLabel()` では `this` は `user` になる。  
しかし `detachedCreateLabel()` のように通常の関数として呼ぶと、`this` は `user` ではなくなる。

callback として method を渡す場面でも同じ問題が起きる。

```js
executeCallback(user.createLabel);
```

この場合は、`bind` するか、arrow function で包む必要がある。

### 7-2. arrow function は method の代わりに万能ではない

`this-call-rules.js` では、object の中に arrow function を置いている。

```js
const counter = {
  count: 10,
  readByMethod() {
    return this.count;
  },
  readByArrow: () => {
    return this;
  },
};
```

arrow function は自分自身の `this` を持たない。  
object の method として `this` を使いたい場合、arrow function を使うと期待通りにならないことがある。

### 7-3. class は Java の class と同じ仕組みではない

`class-basics.js` では、method が instance 自身ではなく prototype 上にあることを確認している。

```js
const prototypeChecks = {
  hasOwnComplete: Object.hasOwn(task, 'complete'),
  prototypeHasComplete: Object.hasOwn(Task.prototype, 'complete'),
  taskPrototypeIsClassPrototype: Object.getPrototypeOf(task) === Task.prototype,
};
```

JavaScript の class は prototype ベース。  
Java の class と見た目が似ていても、method 探索や `this` の決まり方は Java とは違う。

### 7-4. `Object.freeze` ではなく private field が不変性を作るわけでもない

`class-private-getter-setter.js` では、`#price` を private field としている。

```js
#price;

set price(value) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error('priceは0以上の数値で指定する必要がある。');
  }

  this.#price = value;
}
```

private field は外から直接触れないようにする仕組み。  
値を不変にする仕組みとは別。  
setter を用意すれば、class の外から `product.price = 10000` のように更新できる。

### 7-5. spread できるのは array だけではなく iterable

`iterable-iterator-basics.js` では、文字列を spread している。

```js
const text = 'JS';
const textCharacters = [...text];
```

spread は array 専用ではなく、iterable に対して使える。  
String、Map、Set、generator、自作 iterable も対象になる。

### 7-6. generator はすぐに全部実行されるわけではない

`generator-basics.js` では、generator を作ってから `next()` で値を取り出している。

```js
const numberSequence = createNumberSequence();

const firstNext = numberSequence.next();
const secondNext = numberSequence.next();
```

generator function を呼んだ時点で本体が最後まで実行されるわけではない。  
`next()` を呼ぶたびに `yield` まで進む。

## 8. 実務でよく使う場面

### 8-1. callback に method を渡す前に `this` を固定する

`bind-call-apply.js` では、`formatter.format` を `map` に渡す前に `bind` している。

```js
const formattedNames = names.map(formatter.format.bind(formatter));
```

実務では、callback に method を渡すと `this` が失われることがある。  
現代のコードでは arrow function で包む書き方もよく使う。

```js
const wrappedNames = names.map((name) => formatter.format(name));
```

どちらも `this` の扱いを意識した書き方。

### 8-2. class で状態と振る舞いをまとめる

`class-basics.js` では、`Task` class に状態と method をまとめている。

```js
class Task {
  constructor({ id, title, completed = false }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  complete() {
    this.completed = true;

    return this;
  }
}
```

状態と振る舞いをまとめたい場合、class は読みやすい選択肢になる。  
ただし、React の state 更新のように immutable な更新を重視する場面では、class instance の直接変更より plain object を使うことも多い。

### 8-3. factory function で軽く object を作る

`object-literal-factory-class.js` では、factory function で task object を作っている。

```js
function createTaskByFactory({ id, title }) {
  return {
    id,
    title,
    completed: false,
    complete() {
      return {
        ...this,
        completed: true,
      };
    },
  };
}
```

単純な object を作るだけなら、class より factory function の方が軽く読める場合がある。  
生成時に閉じ込めたい値がある場合や、new を使わない API にしたい場合にも使える。

### 8-4. iterable を理解すると標準 object の共通点が見える

`iterable-iterator-basics.js` では、Array と Map を `for...of` で処理している。

```js
for (const value of values) {
  forOfResults.push(value.toUpperCase());
}
```

```js
for (const [userId, role] of userRoleMap) {
  mapEntries.push(`${userId}:${role}`);
}
```

Array、Map、Set、String、generator は、それぞれ異なる object だが、iterable として同じ構文で扱える。  
標準 object の共通点を理解すると、`for...of` や spread の使いどころが見えやすい。

### 8-5. generator で順番に値を作る

`generator-basics.js` では、ページ単位で値を返す generator を定義している。

```js
function* createPagedItems(items, pageSize) {
  for (let index = 0; index < items.length; index += pageSize) {
    yield items.slice(index, index + pageSize);
  }
}
```

大量データを一度に作るのではなく、必要な分だけ順番に取り出したい場合、generator の考え方が使える。  
高度な使い方は深追いしないが、遅延評価の入口として知っておくとよい。

## 9. TS / React につながるポイント

### 9-1. TypeScript でも `this` の扱いは JavaScript の実行時ルールに従う

`this-call-rules.js` では、method を取り出したときに `this` が失われる例を扱っている。

```js
const detachedCreateLabel = user.createLabel;

try {
  detachedCreateLabel();
} catch (error) {
  detachedCallErrorMessage = error.message;
}
```

TypeScript は型チェックを追加するが、実行時の `this` の決まり方は JavaScript と同じ。  
class や object method を callback に渡す場合、型だけでなく呼び出し方にも注意する必要がある。

### 9-2. React では class component より function component が中心でも、`this` の知識は役立つ

`bind-call-apply.js` では、`bind` と arrow function の両方で callback の `this` を扱っている。

```js
const formattedNames = names.map(formatter.format.bind(formatter));
```

```js
const wrappedNames = names.map((name) => formatter.format(name));
```

現在の React では function component と hooks が中心だが、既存コードでは class component や `this` を使った callback を読むことがある。  
また、JavaScript の callback と method の関係を理解するうえでも `this` の知識は重要になる。

### 9-3. TypeScript の class も JavaScript の class を土台にしている

`class-basics.js` では、class method が prototype に置かれることを確認している。

```js
const prototypeChecks = {
  hasOwnComplete: Object.hasOwn(task, 'complete'),
  prototypeHasComplete: Object.hasOwn(Task.prototype, 'complete'),
  taskPrototypeIsClassPrototype: Object.getPrototypeOf(task) === Task.prototype,
};
```

TypeScript の class は、型注釈や access modifier を書けるが、実行される JavaScript は prototype ベースの class になる。  
TypeScript の `private` と JavaScript の `#privateField` の違いを理解する前提にもなる。

### 9-4. React では class instance より plain object を state として扱う場面が多い

`class-basics.js` では、`complete()` が instance 自身を変更している。

```js
complete() {
  this.completed = true;

  return this;
}
```

React の state では、既存 object を直接変更するより、新しい object を作る更新が基本になる。  
そのため、class instance を state に入れて method で直接変更する設計より、plain object と非破壊更新を使う場面が多い。

Unit 03〜06 で扱った参照共有、shallow copy、非破壊更新と合わせて考えると理解しやすい。

### 9-5. iterable / generator は TypeScript の型やライブラリ理解につながる

`custom-iterable.js` では、`Symbol.iterator` を持つ object を作っている。

```js
return {
  start,
  end,
  [Symbol.iterator]() {
    let current = start;

    return {
      next() {
        if (current > end) {
          return {
            value: undefined,
            done: true,
          };
        }

        const value = current;

        current += 1;

        return {
          value,
          done: false,
        };
      },
    };
  },
};
```

TypeScript では、iterable や iterator に対応する型がある。  
また、ライブラリや標準 API で `Iterable<T>` のような概念を見ることがある。  
JavaScript の段階で `Symbol.iterator` と `next()` の関係を知っておくと、型の意味も追いやすくなる。

### 9-6. generator は非同期処理や状態遷移の考え方にもつながる

`generator-basics.js` では、`yield` で処理を途中停止している。

```js
function* createNumberSequence() {
  yield 1;
  yield 2;
  yield 3;
}
```

generator は React で直接頻出するわけではないが、「処理を途中で止めて、次に再開する」という考え方は、非同期処理や状態遷移を理解する入口になる。  
また、外部ライブラリや古いコードで generator を見かけたときに、`yield` と `next()` の関係を追えるようになる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `this` が呼び出し方で決まることを説明できるか
- method 呼び出しと通常の関数呼び出しで `this` が変わることを説明できるか
- arrow function が自分自身の `this` を持たないことを説明できるか
- callback で `this` が失われるケースを説明できるか
- `bind` / `call` / `apply` の違いを概要レベルで説明できるか
- class 構文、constructor、instance method、static method を説明できるか
- private field、getter、setter の役割を説明できるか
- `extends` と `super` の基本を説明できるか
- prototype chain の概要を説明できるか
- JavaScript の class が prototype ベースであることを説明できるか
- object literal、factory function、class の違いを説明できるか
- iterable と iterator の違いを説明できるか
- `for...of` と spread が iterable と関係することを説明できるか
- generator function と `yield` の基本を説明できるか
- 自作 iterable の基本構造を説明できるか
