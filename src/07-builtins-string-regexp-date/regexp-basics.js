import assert from 'node:assert/strict';

export function runRegExpExamples() {
  // 正規表現リテラルは /pattern/ の形で書く。
  // 入力値の形式チェックや文字列の抽出・置換で使う。
  const emailPattern = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/;

  const validEmail = 'alice@example.com';
  const invalidEmail = 'alice@example';

  const emailValidationResults = {
    validEmail: emailPattern.test(validEmail),
    invalidEmail: emailPattern.test(invalidEmail),
  };

  console.log('test による email 検証:', emailValidationResults);

  // RegExp コンストラクタは、pattern を文字列として組み立てたい場合に使える。
  // 固定の pattern なら、正規表現リテラルの方が読みやすいことが多い。
  const keyword = 'JavaScript';
  const keywordPattern = new RegExp(keyword, 'i');
  const keywordMatched = keywordPattern.test('modern javascript guide');

  console.log('RegExp コンストラクタの結果:', keywordMatched);

  const issueText = 'Refs #123 and closes #456';
  const issueMatches = issueText.match(/#\d+/g);

  console.log('match で issue 番号を取り出した結果:', issueMatches);

  // replace と正規表現を組み合わせると、pattern に一致した文字列をまとめて置換できる。
  const maskedPhoneNumber = '090-1234-5678'.replace(/\d{4}-\d{4}$/, '****-****');

  console.log('replace と正規表現の結果:', maskedPhoneNumber);

  // named capture group を使うと、match 結果の意味を名前で読める。
  // 日付やコードなど、構造を持つ文字列から値を取り出すときに便利。
  const logLine = '2026-05-29 INFO user-created';
  const logPattern = /^(?<date>\d{4}-\d{2}-\d{2}) (?<level>INFO|WARN|ERROR) (?<event>[\w-]+)$/;
  const logMatch = logLine.match(logPattern);

  const parsedLog = {
    date: logMatch?.groups?.date,
    level: logMatch?.groups?.level,
    event: logMatch?.groups?.event,
  };

  console.log('named capture group の結果:', parsedLog);

  // 正規表現は強力だが、複雑にしすぎると読みづらくなる。
  // 実務では「簡単な形式チェック」や「置換・抽出」に留め、複雑な仕様は関数に分ける方が追いやすい。
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const slugValidationResults = {
    valid: slugPattern.test('javascript-standard-builtins'),
    invalidUpperCase: slugPattern.test('JavaScript'),
    invalidSymbol: slugPattern.test('javascript_builtins'),
  };

  console.log('slug の簡単な検証:', slugValidationResults);

  assert.deepEqual(emailValidationResults, {
    validEmail: true,
    invalidEmail: false,
  });
  assert.equal(keywordMatched, true);
  assert.deepEqual(issueMatches, ['#123', '#456']);
  assert.equal(maskedPhoneNumber, '090-****-****');
  assert.deepEqual(parsedLog, {
    date: '2026-05-29',
    level: 'INFO',
    event: 'user-created',
  });
  assert.deepEqual(slugValidationResults, {
    valid: true,
    invalidUpperCase: false,
    invalidSymbol: false,
  });
}
