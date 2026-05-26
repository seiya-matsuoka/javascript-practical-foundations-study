import assert from 'node:assert/strict';

function toUpperText(value) {
  return value.toUpperCase();
}

function toLowerText(value) {
  return value.toLowerCase();
}

function decorateText(value) {
  return `*** ${value} ***`;
}

export function runFunctionsAsValuesExamples() {
  // JavaScript では、関数も値として扱える。
  // 変数に代入し、object のプロパティに入れ、array の要素に入れることができる。
  const formatter = toUpperText;
  const formattedText = formatter('javascript');

  console.log('変数に代入した関数の実行結果:', formattedText);

  // 関数を object にまとめると、名前や種類に応じて処理を選べる。
  // 条件分岐を増やす代わりに、処理の対応表として読むこともできる。
  const formatterMap = {
    upper: toUpperText,
    lower: toLowerText,
    decorate: decorateText,
  };

  const upperResult = formatterMap.upper('JavaScript');
  const lowerResult = formatterMap.lower('JavaScript');
  const decoratedResult = formatterMap.decorate('JavaScript');

  console.log('objectに入れた関数の実行結果:', { upperResult, lowerResult, decoratedResult });

  // 関数を array に並べると、処理の順序をデータとして扱える。
  // 小さな変換関数を組み合わせる考え方は、実務のデータ整形でも使いやすい。
  const formatterPipeline = [toUpperText, decorateText];

  // 関数の array を順番に適用すると、小さな変換処理を組み合わせられる。
  const pipelineResult = formatterPipeline.reduce((currentText, currentFormatter) => {
    return currentFormatter(currentText);
  }, 'javascript');

  console.log('arrayに入れた関数を順番に適用した結果:', pipelineResult);

  // 関数を値として持てるため、文字列 key から実行する処理を選ぶこともできる。
  // 選択肢が増える処理では、if / switch 以外の設計として使える。
  const selectedFormatterName = 'decorate';
  const selectedFormatter = formatterMap[selectedFormatterName];
  const selectedResult = selectedFormatter('selected');

  console.log('名前で選んだ関数の実行結果:', selectedResult);

  assert.equal(formattedText, 'JAVASCRIPT');
  assert.equal(upperResult, 'JAVASCRIPT');
  assert.equal(lowerResult, 'javascript');
  assert.equal(decoratedResult, '*** JavaScript ***');
  assert.equal(pipelineResult, '*** JAVASCRIPT ***');
  assert.equal(selectedResult, '*** selected ***');
}
