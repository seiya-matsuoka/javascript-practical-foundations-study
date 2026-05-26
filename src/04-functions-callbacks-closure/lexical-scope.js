import assert from 'node:assert/strict';

// module scope に置いた値は、このファイル内の関数から参照できる。
// lexical scope の例として、内側の関数から外側の値を読む。
const moduleLabel = 'Unit 04';

function createSectionTitle(sectionName) {
  // lexical scope では、関数が「どこで呼ばれたか」ではなく「どこで定義されたか」で外側の変数が決まる。
  const prefix = 'Section';

  function formatTitle(index) {
    return `${moduleLabel} / ${prefix} ${index}: ${sectionName}`;
  }

  return formatTitle(1);
}

// 関数を戻り値として返すと、その関数は定義時の scope を保持する。
// これが closure の理解に直接つながる。
function createFormatter() {
  const prefix = 'created in createFormatter';

  return function format(value) {
    return `${prefix}: ${value}`;
  };
}

function callFormatter(formatter) {
  const prefix = 'created in callFormatter';

  // formatter は createFormatter の中で定義された関数。
  // ここで呼び出しても、formatter が参照する prefix は定義された場所の prefix になる。
  return formatter(prefix);
}

export function runLexicalScopeExamples() {
  const title = createSectionTitle('lexical scope');

  console.log('ネストした関数から外側の値を参照した結果:', title);

  const formatter = createFormatter();
  const formattedText = callFormatter(formatter);

  console.log('定義場所のscopeを参照する関数:', formattedText);

  // callback は map から呼ばれるが、定義された場所は runLexicalScopeExamples の中。
  // そのため、callback の内側から外側の baseRate を参照できる。
  const baseRate = 0.1;
  const prices = [1000, 2000, 3000];

  const taxIncludedPrices = prices.map((price) => {
    const tax = price * baseRate;

    return price + tax;
  });

  console.log('callbackから外側の値を参照した結果:', taxIncludedPrices);

  assert.equal(title, 'Unit 04 / Section 1: lexical scope');
  assert.equal(formattedText, 'created in createFormatter: created in callFormatter');
  assert.deepEqual(taxIncludedPrices, [1100, 2200, 3300]);
}
