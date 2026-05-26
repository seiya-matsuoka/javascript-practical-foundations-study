import assert from 'node:assert/strict';

function createMultiplier(multiplier) {
  // 関数を戻り値として返す関数。
  // JavaScript では、関数も値として扱えるため、このような書き方ができる。
  return (value) => value * multiplier;
}

// 条件値を受け取り、その条件を使う predicate 関数を返す。
// filter へ渡す関数を作る factory として読むと分かりやすい。
function createPredicateByMinimum(minimum) {
  return (value) => value >= minimum;
}

// discountRate を閉じ込めた価格変換関数を返す。
// ここから後半の closure と factory function の話につながる。
function applyDiscount(discountRate) {
  return (price) => Math.floor(price * (1 - discountRate));
}

// pipe は、2 つの関数を順番に適用する関数を返す。
// 関数を値として扱えるからこそ、処理の組み合わせ自体を関数にできる。
function pipe(firstFunction, secondFunction) {
  return (value) => secondFunction(firstFunction(value));
}

export function runHigherOrderFunctionExamples() {
  // higher-order function は、関数を引数に受け取る、または関数を戻り値として返す関数。
  // callback を受け取る map / filter も higher-order function と言える。
  const double = createMultiplier(2);
  const triple = createMultiplier(3);

  const doubledValue = double(10);
  const tripledValue = triple(10);

  console.log('関数を戻り値にする例:', { doubledValue, tripledValue });

  const numbers = [10, 20, 30, 40];
  const isAtLeast25 = createPredicateByMinimum(25);
  const filteredNumbers = numbers.filter(isAtLeast25);

  console.log('条件関数を作ってfilterに渡した結果:', filteredNumbers);

  const applyTenPercentDiscount = applyDiscount(0.1);
  const applyThirtyPercentDiscount = applyDiscount(0.3);
  const discountedPrices = [applyTenPercentDiscount(1000), applyThirtyPercentDiscount(1000)];

  console.log('割引関数を作った結果:', discountedPrices);

  // trim と toUpper は、それぞれ小さな純粋関数として読める。
  // pipe で合成すると、1 つの正規化処理として再利用できる。
  const trim = (value) => value.trim();
  const toUpper = (value) => value.toUpperCase();
  const trimAndUpper = pipe(trim, toUpper);
  const normalizedText = trimAndUpper('  javascript  ');

  console.log('関数合成の入口:', normalizedText);

  assert.equal(doubledValue, 20);
  assert.equal(tripledValue, 30);
  assert.deepEqual(filteredNumbers, [30, 40]);
  assert.deepEqual(discountedPrices, [900, 700]);
  assert.equal(normalizedText, 'JAVASCRIPT');
}
