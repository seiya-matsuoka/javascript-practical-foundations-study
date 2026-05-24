import assert from 'node:assert/strict';

function findUserName(userId) {
  const users = new Map([
    [1, 'Alice'],
    [2, 'Bob'],
  ]);

  // Map.prototype.get は、key が存在しない場合に undefined を返す。
  // undefined は「値がない」「未定義」「まだ入っていない」などの文脈で現れやすい。
  return users.get(userId);
}

function createProfile({ nickname = '未設定' } = {}) {
  return { nickname };
}

function runWithoutReturn() {
  // return を書かない function の戻り値は undefined になる。
}

export function runNullAndUndefinedExamples() {
  // undefined は、値が割り当てられていない場面で現れる。
  let notAssigned;
  const missingUserName = findUserName(999);
  const noReturnValue = runWithoutReturn();

  console.log('代入されていない変数:', notAssigned);
  console.log('Mapに存在しないkeyの結果:', missingUserName);
  console.log('returnを書かないfunctionの戻り値:', noReturnValue);

  // null は、意図的に「値がない」ことを表すために使われることが多い。
  // API レスポンスやフォームの初期値で、明示的な空を表したい場面に出てくる。
  const userFromApi = { id: 1, name: 'Alice', middleName: null };

  console.log('APIレスポンス風object:', userFromApi);

  // default parameter は、引数が undefined の場合に既定値を使う。
  // null を渡した場合には「値として null が渡された」と扱われるため、既定値にはならない。
  const omittedProfile = createProfile();
  const undefinedProfile = createProfile({ nickname: undefined });
  const nullProfile = createProfile({ nickname: null });

  console.log('引数省略時のprofile:', omittedProfile);
  console.log('nicknameがundefinedのprofile:', undefinedProfile);
  console.log('nicknameがnullのprofile:', nullProfile);

  assert.equal(notAssigned, undefined);
  assert.equal(missingUserName, undefined);
  assert.equal(noReturnValue, undefined);
  assert.deepEqual(userFromApi, { id: 1, name: 'Alice', middleName: null });
  assert.deepEqual(omittedProfile, { nickname: '未設定' });
  assert.deepEqual(undefinedProfile, { nickname: '未設定' });
  assert.deepEqual(nullProfile, { nickname: null });
}
