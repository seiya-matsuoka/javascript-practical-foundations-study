import assert from 'node:assert/strict';

function createAsyncLabeler(prefix) {
  return async function label(value) {
    // await をまたいでも、関数は定義された lexical scope の prefix を参照できる。
    // 非同期処理でも closure の考え方は変わらない。
    await Promise.resolve();

    return `${prefix}: ${value}`;
  };
}

function createRequestCounter() {
  // requestCount は、返された async function から共有される状態。
  // 非同期処理でも、closure が保持する状態は呼び出しごとに更新される。
  let requestCount = 0;

  return async function request(name) {
    requestCount += 1;
    // await の前に現在の番号を退避する。
    // 非同期処理では、await の前後で外側の状態が変わる可能性を意識する。
    const currentRequestNumber = requestCount;

    await Promise.resolve();

    return `${currentRequestNumber}: ${name}`;
  };
}

export async function runAsyncClosureEntryExamples() {
  const labelAsTask = createAsyncLabeler('task');
  const labelAsJob = createAsyncLabeler('job');

  const labels = await Promise.all([labelAsTask('read'), labelAsJob('build')]);

  console.log('非同期関数とclosure:', labels);

  const request = createRequestCounter();

  const requestResults = await Promise.all([request('users'), request('books'), request('logs')]);

  console.log('非同期処理で閉じ込めたcount:', requestResults);

  // 非同期処理では、closure が参照する値が「いつ更新された値か」を意識する必要がある。
  // React Hooks の callback や effect でも、古い値を閉じ込める問題が出ることがある。
  let latestStatus = 'initial';

  const readLatestStatus = async () => {
    await Promise.resolve();
    return latestStatus;
  };

  const statusPromise = readLatestStatus();
  // Promise が完了する前に外側の値を更新している。
  // readLatestStatus は値そのものではなく変数 latestStatus を参照しているため、await 後に更新後の値を見る。
  latestStatus = 'updated';

  const latestStatusResult = await statusPromise;

  console.log('await後に参照した外側の値:', latestStatusResult);

  assert.deepEqual(labels, ['task: read', 'job: build']);
  assert.deepEqual(requestResults, ['1: users', '2: books', '3: logs']);
  assert.equal(latestStatusResult, 'updated');
}
