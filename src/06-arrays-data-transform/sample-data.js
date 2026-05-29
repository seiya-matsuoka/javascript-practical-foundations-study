// Unit 06 では、単なる数値配列だけではなく、実務でよく出てくる object 配列も使う。
// API レスポンス、一覧表示、検索条件、集計処理を意識しやすいように、商品、注文、ユーザーを題材にする。
export const sampleProducts = [
  {
    id: 'p-001',
    name: 'JavaScript入門',
    category: 'book',
    price: 2800,
    stock: 12,
    tags: ['javascript', 'beginner'],
  },
  {
    id: 'p-002',
    name: 'TypeScript実践',
    category: 'book',
    price: 3400,
    stock: 0,
    tags: ['typescript', 'practical'],
  },
  {
    id: 'p-003',
    name: 'Reactハンズオン',
    category: 'book',
    price: 3200,
    stock: 5,
    tags: ['react', 'frontend'],
  },
  {
    id: 'p-004',
    name: '学習ノート',
    category: 'stationery',
    price: 600,
    stock: 30,
    tags: ['note'],
  },
];

export const sampleOrders = [
  {
    id: 'o-001',
    userId: 'u-001',
    status: 'paid',
    items: [
      { productId: 'p-001', quantity: 1, unitPrice: 2800 },
      { productId: 'p-004', quantity: 2, unitPrice: 600 },
    ],
  },
  {
    id: 'o-002',
    userId: 'u-002',
    status: 'pending',
    items: [{ productId: 'p-003', quantity: 1, unitPrice: 3200 }],
  },
  {
    id: 'o-003',
    userId: 'u-001',
    status: 'paid',
    items: [{ productId: 'p-002', quantity: 1, unitPrice: 3400 }],
  },
];

export const sampleUsers = [
  { id: 'u-001', name: 'Alice', active: true, role: 'admin' },
  { id: 'u-002', name: 'Bob', active: false, role: 'member' },
  { id: 'u-003', name: 'Carol', active: true, role: 'member' },
];
