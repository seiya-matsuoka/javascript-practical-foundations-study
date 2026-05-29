import assert from 'node:assert/strict';

import { sampleProducts } from './sample-data.js';

function formatCurrency(value) {
  return `${value.toLocaleString('ja-JP')}円`;
}

export function runMethodChainIntroExamples() {
  // method chain は、配列メソッドの戻り値に対して続けてメソッドを呼ぶ書き方。
  // filter で絞り込み、map で表示用データへ変換する流れは、UI 実装でよく使う。
  const productCards = sampleProducts
    .filter((product) => product.category === 'book')
    .filter((product) => product.stock > 0)
    .map((product) => ({
      id: product.id,
      title: product.name,
      priceLabel: formatCurrency(product.price),
    }));

  console.log('method chain で作った商品カード:', productCards);

  // chain が長くなりすぎる場合は、途中の predicate 関数や mapper 関数に名前を付けると読みやすくなる。
  const isAvailableBook = (product) => product.category === 'book' && product.stock > 0;
  const toProductCard = (product) => ({
    id: product.id,
    title: product.name,
    priceLabel: formatCurrency(product.price),
  });

  const namedFunctionCards = sampleProducts.filter(isAvailableBook).map(toProductCard);

  console.log('名前付き関数で作った商品カード:', namedFunctionCards);

  // 表示用データへ変換する場合、元のデータをそのまま画面へ渡すより、
  // 画面で必要な形に整えてから渡す方が、UI 側の責務を小さくしやすい。
  const displaySummary = sampleProducts
    .filter((product) => product.stock > 0)
    .map((product) => `${product.name}: ${formatCurrency(product.price)}`)
    .join(' / ');

  console.log('表示用 summary:', displaySummary);

  assert.deepEqual(productCards, [
    { id: 'p-001', title: 'JavaScript入門', priceLabel: '2,800円' },
    { id: 'p-003', title: 'Reactハンズオン', priceLabel: '3,200円' },
  ]);
  assert.deepEqual(namedFunctionCards, productCards);
  assert.equal(
    displaySummary,
    'JavaScript入門: 2,800円 / Reactハンズオン: 3,200円 / 学習ノート: 600円',
  );
}
