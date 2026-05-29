import assert from 'node:assert/strict';

import { sampleProducts, sampleUsers } from './sample-data.js';

export function runFindSomeEveryIncludesExamples() {
  // find は、条件に合う最初の要素を返す。
  // 見つからない場合は undefined を返すため、呼び出し側で undefined を想定する必要がある。
  const reactProduct = sampleProducts.find((product) => product.tags.includes('react'));
  const missingProduct = sampleProducts.find((product) => product.id === 'p-999');

  console.log('find で見つけた React 商品:', reactProduct);
  console.log('find で見つからなかった商品:', missingProduct);

  // findIndex は、条件に合う最初の index を返す。
  // 見つからない場合は -1 を返す。
  const outOfStockIndex = sampleProducts.findIndex((product) => product.stock === 0);
  const missingIndex = sampleProducts.findIndex((product) => product.id === 'p-999');

  console.log('在庫切れ商品の index:', outOfStockIndex);
  console.log('存在しない商品の index:', missingIndex);

  // some は 1 件でも条件を満たす要素があれば true。
  // every はすべての要素が条件を満たす場合に true。
  const hasOutOfStock = sampleProducts.some((product) => product.stock === 0);
  const allProductsHaveName = sampleProducts.every((product) => product.name !== '');
  const allUsersActive = sampleUsers.every((user) => user.active);

  console.log('在庫切れ商品があるか:', hasOutOfStock);
  console.log('全商品に名前があるか:', allProductsHaveName);
  console.log('全ユーザーが active か:', allUsersActive);

  // includes は、配列に指定した値が含まれるかを調べる。
  // primitive 値では扱いやすいが、object 配列では参照の同一性を見るため注意する。
  const roles = ['admin', 'member'];
  const hasAdminRole = roles.includes('admin');
  const hasGuestRole = roles.includes('guest');

  const firstUser = sampleUsers[0];
  const includesSameReference = sampleUsers.includes(firstUser);
  const includesSameShapeObject = sampleUsers.includes({
    id: 'u-001',
    name: 'Alice',
    active: true,
    role: 'admin',
  });

  console.log('includes による role 判定:', { hasAdminRole, hasGuestRole });
  console.log('includes による object 参照判定:', {
    includesSameReference,
    includesSameShapeObject,
  });

  assert.deepEqual(reactProduct, {
    id: 'p-003',
    name: 'Reactハンズオン',
    category: 'book',
    price: 3200,
    stock: 5,
    tags: ['react', 'frontend'],
  });
  assert.equal(missingProduct, undefined);
  assert.equal(outOfStockIndex, 1);
  assert.equal(missingIndex, -1);
  assert.equal(hasOutOfStock, true);
  assert.equal(allProductsHaveName, true);
  assert.equal(allUsersActive, false);
  assert.deepEqual({ hasAdminRole, hasGuestRole }, { hasAdminRole: true, hasGuestRole: false });
  assert.equal(includesSameReference, true);
  assert.equal(includesSameShapeObject, false);
}
