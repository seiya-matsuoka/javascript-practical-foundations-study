import assert from 'node:assert/strict';
import { createDelayedValue, wait } from './async-helpers.js';

async function fetchLabel(id) {
  return createDelayedValue(`label-${id}`, 1);
}

async function collectWithForOf(ids) {
  const results = [];

  // for...of と await の組み合わせは、逐次実行を明示できる。
  // 1 件ずつ順番に処理したい場合は、この形が読みやすい。
  for (const id of ids) {
    const label = await fetchLabel(id);

    results.push(label);
  }

  return results;
}

async function collectWithMapAndPromiseAll(ids) {
  // async callback を map に渡すと、戻り値は値の配列ではなく Promise の配列になる。
  // そのため、結果を使うには Promise.all でまとめて待つ必要がある。
  const promises = ids.map(async (id) => {
    const label = await fetchLabel(id);

    return label.toUpperCase();
  });

  return Promise.all(promises);
}

async function collectWithForEachBadExample(ids) {
  const results = [];

  // forEach は async callback の完了を待たない。
  // この関数は、forEach の callback が終わる前に results を返す可能性がある。
  ids.forEach(async (id) => {
    const label = await fetchLabel(id);

    results.push(label);
  });

  return results;
}

export async function runAsyncLoopsExamples() {
  const ids = [1, 2, 3];

  // loop と async は、書き方によって待ち方が大きく変わる。
  // for...of、map + Promise.all、forEach + async の違いを同じ ids で比較する。
  const forOfResults = await collectWithForOf(ids);
  const mapResults = await collectWithMapAndPromiseAll(ids);
  const forEachImmediateResults = await collectWithForEachBadExample(ids);

  // forEach の async callback が後から実行されることを観察するため、短く待つ。
  // 実務コードでこのような待ち方をして制御するのではなく、for...of または Promise.all を使う。
  await wait(5);

  console.log('for...of + awaitの結果:', forOfResults);
  console.log('map + async + Promise.allの結果:', mapResults);
  console.log('forEach + asyncの戻り直後の結果:', forEachImmediateResults);

  // forEach の結果は、待機を入れた後なので最終的には値が入っている。
  // ただし、戻り直後に完了を保証できないため、制御構造としては不向きな点を押さえる。
  assert.deepEqual(forOfResults, ['label-1', 'label-2', 'label-3']);
  assert.deepEqual(mapResults, ['LABEL-1', 'LABEL-2', 'LABEL-3']);
  assert.deepEqual(forEachImmediateResults, ['label-1', 'label-2', 'label-3']);
}
