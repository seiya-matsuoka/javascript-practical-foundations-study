import { runBindCallApplyExamples } from './bind-call-apply.js';
import { runClassBasicsExamples } from './class-basics.js';
import { runClassPrivateGetterSetterExamples } from './class-private-getter-setter.js';
import { runCustomIterableExamples } from './custom-iterable.js';
import { runGeneratorBasicsExamples } from './generator-basics.js';
import { runInheritanceAndPrototypeExamples } from './inheritance-and-prototype.js';
import { runIterableIteratorBasicsExamples } from './iterable-iterator-basics.js';
import { runObjectLiteralFactoryClassExamples } from './object-literal-factory-class.js';
import { runThisCallRulesExamples } from './this-call-rules.js';

const unitTitle = 'Unit 10. class・prototype・this・iterable・generator';

// Unit 10 では、JavaScript の object 指向的な仕組みを確認する。
// class 構文は Java の class と見た目が似ているが、JavaScript では prototype を土台にしている。
// そのため、this の決まり方、prototype、class、iterable / generator を分けて読む。
const runners = [
  { title: 'this は呼び出し方で決まる', run: runThisCallRulesExamples },
  { title: 'bind / call / apply', run: runBindCallApplyExamples },
  { title: 'class 構文の基本', run: runClassBasicsExamples },
  { title: 'private field / getter / setter', run: runClassPrivateGetterSetterExamples },
  { title: 'extends / 継承 / prototype', run: runInheritanceAndPrototypeExamples },
  {
    title: 'object literal / factory function / class の違い',
    run: runObjectLiteralFactoryClassExamples,
  },
  { title: 'iterable / iterator の基本', run: runIterableIteratorBasicsExamples },
  { title: 'generator function と yield', run: runGeneratorBasicsExamples },
  { title: '自作 iterable', run: runCustomIterableExamples },
];

function printUnitHeader() {
  const line = '='.repeat(80);

  console.log(line);
  console.log(unitTitle);
  console.log(line);
}

function printSectionHeader(sectionNumber, title) {
  const line = '-'.repeat(80);

  console.log('');
  console.log(line);
  console.log(`${sectionNumber}. ${title}`);
  console.log(line);
}

printUnitHeader();

for (const [index, runner] of runners.entries()) {
  printSectionHeader(index + 1, runner.title);

  // runner.run() のように property access から直接呼び出すと、run 関数内の this が runner になる。
  // Unit 10 では this の挙動そのものを確認するため、実行入口では関数を取り出してから呼び出す。
  const run = runner.run;

  await run();
}

console.log('');
console.log('Unit 10 のサンプルをすべて実行した。');
