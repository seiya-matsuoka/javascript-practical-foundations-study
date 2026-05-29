import assert from 'node:assert/strict';

import { sampleProducts } from './sample-data.js';

function formatCurrency(value) {
  return `${value.toLocaleString('ja-JP')}円`;
}

function toProductCard(product) {
  // mapper 関数は、1 要素を別の形へ変換する関数。
  // API レスポンスを UI 表示用データへ変換するときによく使う。
  return {
    id: product.id,
    title: product.name,
    priceLabel: formatCurrency(product.price),
    stockLabel: product.stock > 0 ? `在庫 ${product.stock} 件` : '在庫なし',
  };
}

export function runMapTransformExamples() {
  // map は、元の配列を変更せず、各要素を変換した新しい配列を返す。
  const productNames = sampleProducts.map((product) => product.name);
  const productCards = sampleProducts.map(toProductCard);

  console.log('map で取り出した商品名:', productNames);
  console.log('map で作った表示用データ:', productCards);

  // map の callback には、要素、index、元配列が渡される。
  // index は表示順の番号を作るときに使えるが、ID の代わりに安易に使うと変更に弱くなる。
  const numberedNames = sampleProducts.map((product, index) => ({
    order: index + 1,
    name: product.name,
  }));

  console.log('index を使った表示順:', numberedNames);

  // map は「同じ件数のまま形を変える」処理に向いている。
  // 件数を減らしたい場合は filter、1 つの値に畳み込みたい場合は reduce を使う方が意図が伝わりやすい。
  const taxIncludedProducts = sampleProducts.map((product) => ({
    ...product,
    taxIncludedPrice: Math.floor(product.price * 1.1),
  }));

  console.log('map で税込価格を追加した商品:', taxIncludedProducts);

  assert.deepEqual(productNames, [
    'JavaScript入門',
    'TypeScript実践',
    'Reactハンズオン',
    '学習ノート',
  ]);
  assert.deepEqual(productCards, [
    { id: 'p-001', title: 'JavaScript入門', priceLabel: '2,800円', stockLabel: '在庫 12 件' },
    { id: 'p-002', title: 'TypeScript実践', priceLabel: '3,400円', stockLabel: '在庫なし' },
    { id: 'p-003', title: 'Reactハンズオン', priceLabel: '3,200円', stockLabel: '在庫 5 件' },
    { id: 'p-004', title: '学習ノート', priceLabel: '600円', stockLabel: '在庫 30 件' },
  ]);
  assert.deepEqual(numberedNames, [
    { order: 1, name: 'JavaScript入門' },
    { order: 2, name: 'TypeScript実践' },
    { order: 3, name: 'Reactハンズオン' },
    { order: 4, name: '学習ノート' },
  ]);
  assert.deepEqual(
    taxIncludedProducts.map((product) => ({
      id: product.id,
      taxIncludedPrice: product.taxIncludedPrice,
    })),
    [
      { id: 'p-001', taxIncludedPrice: 3080 },
      { id: 'p-002', taxIncludedPrice: 3740 },
      { id: 'p-003', taxIncludedPrice: 3520 },
      { id: 'p-004', taxIncludedPrice: 660 },
    ],
  );
  assert.notEqual(sampleProducts, taxIncludedProducts);
}
