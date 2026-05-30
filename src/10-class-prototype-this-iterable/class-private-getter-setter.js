import assert from 'node:assert/strict';

class Product {
  #price;

  constructor({ id, name, price }) {
    this.id = id;
    this.name = name;
    this.#price = price;
  }

  get price() {
    // getter は property のように参照できる method。
    // 計算済みの表示値や、private field の読み取り口として使える。
    return this.#price;
  }

  set price(value) {
    // setter は property への代入のように呼ばれる。
    // 代入時に validation を挟めるが、複雑にしすぎると通常の method より意図が見えにくくなる。
    if (!Number.isFinite(value) || value < 0) {
      throw new Error('priceは0以上の数値で指定する必要がある。');
    }

    this.#price = value;
  }

  get displayPrice() {
    return `${this.#price.toLocaleString('ja-JP')}円`;
  }

  applyDiscount(rate) {
    this.price = Math.floor(this.#price * (1 - rate));

    return this;
  }
}

function captureError(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }

  return null;
}

export function runClassPrivateGetterSetterExamples() {
  const product = new Product({
    id: 1,
    name: 'Keyboard',
    price: 12000,
  });

  const initialPrice = product.price;
  const initialDisplayPrice = product.displayPrice;

  product.price = 10000;
  product.applyDiscount(0.2);

  const invalidPriceError = captureError(() => {
    product.price = -1;
  });

  console.log('private fieldを持つproduct:', product);
  console.log('初期price:', initialPrice);
  console.log('初期displayPrice:', initialDisplayPrice);
  console.log('割引後price:', product.price);
  console.log('不正なprice設定エラー:', invalidPriceError?.message);

  // private field は class の外から直接参照できない。
  // #price は構文上 private であり、product.#price のような参照は parse 段階でエラーになる。
  const ownKeys = Object.keys(product);

  console.log('Object.keysで見えるproperty:', ownKeys);

  assert.equal(initialPrice, 12000);
  assert.equal(initialDisplayPrice, '12,000円');
  assert.equal(product.price, 8000);
  assert.equal(product.displayPrice, '8,000円');
  assert.equal(invalidPriceError instanceof Error, true);
  assert.equal(invalidPriceError?.message, 'priceは0以上の数値で指定する必要がある。');
  assert.deepEqual(ownKeys, ['id', 'name']);
}
