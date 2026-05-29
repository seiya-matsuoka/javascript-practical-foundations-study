import assert from 'node:assert/strict';

export function runDestructiveMethodsExamples() {
  // push / pop / shift / unshift は、元の配列を直接変更する破壊的メソッド。
  // 返り値だけでなく、元の配列がどう変わるかを必ず確認する。
  const queue = ['task-1', 'task-2'];

  const pushedLength = queue.push('task-3');
  const poppedTask = queue.pop();
  const shiftedTask = queue.shift();
  const unshiftedLength = queue.unshift('task-0');

  console.log('破壊的メソッド実行後の queue:', queue);
  console.log('push の戻り値:', pushedLength);
  console.log('pop の戻り値:', poppedTask);
  console.log('shift の戻り値:', shiftedTask);
  console.log('unshift の戻り値:', unshiftedLength);

  // splice も元の配列を直接変更する。
  // 削除した要素を戻り値として返し、同時に元の配列から要素を取り除く。
  const steps = ['setup', 'install', 'build', 'test', 'deploy'];
  const removedSteps = steps.splice(2, 2, 'lint', 'format');

  console.log('splice 後の steps:', steps);
  console.log('splice で削除された要素:', removedSteps);

  // React の state や、関数の引数で受け取った配列に対して破壊的メソッドを使うと、
  // 呼び出し元や既存 state に影響することがある。
  const originalUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  const sameUsersReference = originalUsers;

  sameUsersReference.push({ id: 3, name: 'Carol' });

  console.log('同じ参照を共有した配列:', originalUsers);

  assert.deepEqual(queue, ['task-0', 'task-2']);
  assert.equal(pushedLength, 3);
  assert.equal(poppedTask, 'task-3');
  assert.equal(shiftedTask, 'task-1');
  assert.equal(unshiftedLength, 2);
  assert.deepEqual(steps, ['setup', 'install', 'lint', 'format', 'deploy']);
  assert.deepEqual(removedSteps, ['build', 'test']);
  assert.equal(originalUsers, sameUsersReference);
  assert.deepEqual(originalUsers, [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' },
  ]);
}
