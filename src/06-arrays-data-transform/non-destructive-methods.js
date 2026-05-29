import assert from 'node:assert/strict';

export function runNonDestructiveMethodsExamples() {
  // slice は、元の配列を変更せずに一部を取り出した新しい配列を返す。
  // 開始 index は含み、終了 index は含まない。
  const tasks = ['setup', 'install', 'build', 'test', 'deploy'];

  const buildAndTestTasks = tasks.slice(2, 4);
  const copiedTasks = tasks.slice();

  console.log('slice で取り出した配列:', buildAndTestTasks);
  console.log('slice でコピーした配列:', copiedTasks);
  console.log('slice 後の元配列:', tasks);

  // toSpliced は、splice の非破壊版。
  // 元の配列を変更せず、指定位置の削除・追加を反映した新しい配列を返す。
  const replacedTasks = tasks.toSpliced(2, 2, 'lint', 'format');

  console.log('toSpliced で作った新しい配列:', replacedTasks);
  console.log('toSpliced 後の元配列:', tasks);

  // spread でも新しい配列を作れる。
  // 配列への追加や結合で、元の配列を変更したくない場合によく使う。
  const appendedTasks = [...tasks, 'notify'];
  const insertedTasks = ['prepare', ...tasks];

  console.log('spread で末尾追加した配列:', appendedTasks);
  console.log('spread で先頭追加した配列:', insertedTasks);

  assert.deepEqual(buildAndTestTasks, ['build', 'test']);
  assert.deepEqual(copiedTasks, ['setup', 'install', 'build', 'test', 'deploy']);
  assert.notEqual(tasks, copiedTasks);
  assert.deepEqual(tasks, ['setup', 'install', 'build', 'test', 'deploy']);
  assert.deepEqual(replacedTasks, ['setup', 'install', 'lint', 'format', 'deploy']);
  assert.notEqual(tasks, replacedTasks);
  assert.deepEqual(appendedTasks, ['setup', 'install', 'build', 'test', 'deploy', 'notify']);
  assert.deepEqual(insertedTasks, ['prepare', 'setup', 'install', 'build', 'test', 'deploy']);
}
