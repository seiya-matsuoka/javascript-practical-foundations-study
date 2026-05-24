import assert from 'node:assert/strict';

export function runObjectIsExamples() {
  // Object.is は、=== と似ているが完全に同じではない。
  // とくに NaN と -0 / +0 の扱いが違う。
  const strictComparisonResults = {
    nanStrictEqual: NaN === NaN,
    zeroStrictEqual: 0 === -0,
  };

  const objectIsResults = {
    nanObjectIs: Object.is(NaN, NaN),
    zeroObjectIs: Object.is(0, -0),
    sameString: Object.is('JavaScript', 'JavaScript'),
    differentObjects: Object.is({ id: 1 }, { id: 1 }),
  };

  console.log('===による比較:', strictComparisonResults);
  console.log('Object.isによる比較:', objectIsResults);

  // object は中身が同じに見えても、別々に作られた object であれば同一ではない。
  // この点は、後続の参照共有や React の state 更新でも重要になる。
  const user = { id: 1, name: 'Alice' };
  const sameReferenceUser = user;
  const copiedUser = { id: 1, name: 'Alice' };

  const referenceResults = {
    sameReference: Object.is(user, sameReferenceUser),
    differentReference: Object.is(user, copiedUser),
  };

  console.log('object参照のObject.is結果:', referenceResults);

  assert.deepEqual(strictComparisonResults, { nanStrictEqual: false, zeroStrictEqual: true });
  assert.deepEqual(objectIsResults, {
    nanObjectIs: true,
    zeroObjectIs: false,
    sameString: true,
    differentObjects: false,
  });
  assert.deepEqual(referenceResults, { sameReference: true, differentReference: false });
}
