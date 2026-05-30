import assert from 'node:assert/strict';

// AbortSignal を受け取る非同期処理の最小例。
// fetch だけでなく、自作の非同期処理でも signal を見れば中断可能な設計にできる。
function waitWithAbort(ms, { signal }) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('処理が中断された。', 'AbortError'));
      return;
    }

    // abort されなければ、通常通り timer の完了で resolve する。
    // abort された場合は listener 側で timer を解除し、AbortError として reject する。
    const timeoutId = setTimeout(() => {
      resolve('finished');
    }, ms);

    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeoutId);
        reject(new DOMException('処理が中断された。', 'AbortError'));
      },
      { once: true },
    );
  });
}

async function runTaskWithTimeout(task, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await task({ signal: controller.signal });
  } finally {
    // timeout 監視用の timer は、成功時も失敗時も片付ける。
    // Unit 08 の finally と同じく、非同期処理でも後片付けの場所が重要になる。
    clearTimeout(timeoutId);
  }
}

async function captureAsyncErrorName(asyncTask) {
  try {
    await asyncTask();
  } catch (error) {
    return error.name;
  }

  return null;
}

export async function runFetchTimeoutAbortExamples() {
  // fetch 自体には「timeoutMs」のような単純な引数はない。
  // timeout を扱いたい場合は AbortController と timer を組み合わせる考え方が基本になる。
  const successResult = await runTaskWithTimeout((options) => waitWithAbort(1, options), 10);

  const timeoutErrorName = await captureAsyncErrorName(async () => {
    await runTaskWithTimeout((options) => waitWithAbort(10, options), 1);
  });

  // timeout だけでなく、ユーザー操作や画面遷移をきっかけに手動 abort する場面もある。
  // React では、component の unmount 時に不要になった fetch を中断する考え方につながる。
  const manualController = new AbortController();
  const manualAbortPromise = waitWithAbort(10, {
    signal: manualController.signal,
  });

  manualController.abort();

  const manualAbortErrorName = await captureAsyncErrorName(async () => {
    await manualAbortPromise;
  });

  console.log('timeoutしない非同期処理の結果:', successResult);
  console.log('timeoutで中断したエラー名:', timeoutErrorName);
  console.log('手動abortしたエラー名:', manualAbortErrorName);

  assert.equal(successResult, 'finished');
  assert.equal(timeoutErrorName, 'AbortError');
  assert.equal(manualAbortErrorName, 'AbortError');
}
