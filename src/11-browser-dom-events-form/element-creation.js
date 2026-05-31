// タスク 1 件の補助情報を表示する DOM 要素を作る。
// 小さな要素作成を関数に分けると、createTaskElement の責務が読みやすくなる。
function createTaskMeta(task) {
  // document.createElement は指定した tag name の Element を作る。
  // ここでは HTML 文字列ではなく DOM node として p 要素を作成する。
  const meta = document.createElement('p');

  meta.classList.add('task-item-meta');
  meta.textContent = `category=${task.category} / id=${task.id}`;

  return meta;
}

function createTaskActions(task) {
  // 一覧内の各タスクに配置する操作 button 群を作る。
  // button ごとの action と taskId は dataset に持たせ、event delegation 側で読み取る。
  const actions = document.createElement('div');

  actions.classList.add('button-row');

  // 完了状態を切り替える button。
  // type='button' を指定し、form submit の既定動作に巻き込まれないようにする。
  const toggleButton = document.createElement('button');

  toggleButton.type = 'button';
  toggleButton.classList.add('button');
  toggleButton.dataset.action = 'toggle';
  toggleButton.dataset.taskId = String(task.id);
  toggleButton.textContent = task.completed ? '未完了に戻す' : '完了にする';

  // 削除 button。
  // DOM の element.remove() ではなく、main.js 側で配列状態から削除して再描画する流れにしている。
  const removeButton = document.createElement('button');

  removeButton.type = 'button';
  removeButton.classList.add('button', 'danger');
  removeButton.dataset.action = 'remove';
  removeButton.dataset.taskId = String(task.id);
  removeButton.textContent = '削除する';

  // append は複数 node や文字列をまとめて追加できる。
  // appendChild より柔軟で、現代の DOM 操作ではこちらを見る機会も多い。
  actions.append(toggleButton, removeButton);

  return actions;
}

export function createTaskElement(task) {
  // document.createElement は、DOM node を JavaScript から作る基本 API。
  // React では JSX で UI を宣言するため直接使う頻度は下がるが、DOM の実体を知る入口になる。
  // タスク 1 件を li 要素として表現する。
  // item に data-task-id を持たせることで、DOM 側にも対象タスクの識別子を残せる。
  const item = document.createElement('li');

  item.classList.add('task-item');
  item.classList.toggle('completed', task.completed);
  item.dataset.taskId = String(task.id);

  // タスク名は textContent で入れる。
  // ユーザー入力を扱う可能性がある値は、HTML として解釈しない形で表示する。
  const title = document.createElement('p');

  title.classList.add('task-item-title');
  title.textContent = task.title;

  const meta = createTaskMeta(task);
  const actions = createTaskActions(task);

  item.append(title, meta, actions);

  return item;
}

export function renderTaskList({ taskList, tasks }) {
  // replaceChildren は、既存の子要素をまとめて置き換える。
  // 一覧を状態から再描画する場合、前回の DOM を一度消してから今の状態で作り直すと分かりやすい。
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const emptyItem = document.createElement('li');

    emptyItem.classList.add('task-item');
    emptyItem.textContent = '表示するタスクはない。';

    taskList.append(emptyItem);

    return;
  }

  // 状態配列から DOM node 配列へ変換する。
  // React の list rendering では JSX を返すが、ここでは createElement で実 DOM を作っている。
  const taskElements = tasks.map((task) => createTaskElement(task));

  taskList.append(...taskElements);
}
