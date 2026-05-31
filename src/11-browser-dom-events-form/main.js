import { setupFetchResult } from './browser-fetch.js';
import { setupDomQueryAndContent } from './dom-query-and-content.js';
import { renderTaskList } from './element-creation.js';
import { setupFetchButton, setupFilterButtons, setupStorageButtons } from './event-basics.js';
import { setupTaskListDelegation } from './event-delegation.js';
import { setupTaskForm } from './form-handling.js';
import { setupStoragePanel } from './storage.js';
import { setupUrlSearchParamsPanel } from './url-search-params.js';

// この Unit では、ブラウザ上で扱う小さなアプリ状態を module scope に持つ。
// React では state として管理する部分だが、ここでは DOM 操作との関係を見やすくするため配列で保持する。
const tasks = [
  {
    id: 1,
    title: 'window と document の役割を確認する',
    category: 'study',
    completed: false,
  },
  {
    id: 2,
    title: 'event delegation を確認する',
    category: 'study',
    completed: true,
  },
  {
    id: 3,
    title: 'localStorage と sessionStorage を比較する',
    category: 'work',
    completed: false,
  },
];

// 現在の絞り込み状態と、次に追加する task id を保持する。
// ユーザー操作によって値が変わるため let を使う。
let currentFilter = 'all';
let nextTaskId = 4;

function getVisibleTasks() {
  // 現在の filter に応じて、画面に表示する task 配列を作る。
  // 元の tasks を直接書き換えず、表示用の配列を返す。
  if (currentFilter === 'active') {
    return tasks.filter((task) => !task.completed);
  }

  if (currentFilter === 'completed') {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

function renderApp({ domQueryAndContent }) {
  // 状態から DOM を再描画する中心処理。
  // 一覧描画と status 表示更新をまとめて行い、各 event handler から呼び出す。
  const taskList = document.querySelector('[data-task-list]');
  const visibleTasks = getVisibleTasks();

  renderTaskList({
    taskList,
    tasks: visibleTasks,
  });

  domQueryAndContent.update(visibleTasks);
}

function addTask(input) {
  // form から受け取った入力値を、アプリ内の task object に変換して追加する。
  // DOM 要素を直接追加するのではなく、状態を変更してから renderApp で再描画する。
  tasks.push({
    id: nextTaskId,
    title: input.title,
    category: input.category,
    completed: false,
  });

  nextTaskId += 1;
}

function toggleTask(taskId) {
  // task id を元に対象 task を探し、completed を反転する。
  // 小さなサンプルのため object を直接変更している。
  const task = tasks.find((taskItem) => taskItem.id === taskId);

  if (!task) {
    return;
  }

  task.completed = !task.completed;
}

function removeTask(taskId) {
  // DOM の element.remove() で表示要素だけを消すのではなく、状態配列から task を削除する。
  // その後 renderApp で DOM を作り直すため、状態と画面のずれを避けやすい。
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return;
  }

  // splice は破壊的に配列を変更する。
  // この Unit では DOM 操作用の小さな状態として扱うため使っているが、React の state 更新では非破壊更新を優先する。
  tasks.splice(taskIndex, 1);
}

// DOMContentLoaded は、HTML の DOM tree 構築が完了したタイミングで発火する。
// script を head で読み込む場合でも、この event の後なら document.querySelector で要素を取得しやすい。
document.addEventListener('DOMContentLoaded', () => {
  console.log('window object:', window);
  console.log('document object:', document);
  console.log('現在のURL:', window.location.href);

  // 各機能の初期化関数を呼び出し、DOM と状態更新処理を接続する。
  // setup 系関数は、要素取得と event listener 登録を担当する。
  const domQueryAndContent = setupDomQueryAndContent({
    tasks,
    getCurrentFilter: () => currentFilter,
  });

  const storagePanel = setupStoragePanel();
  const fetchResult = setupFetchResult();

  setupUrlSearchParamsPanel();

  // filter 変更、form submit、task 操作、storage 操作、fetch 実行をそれぞれ callback で受け取る。
  // DOM event の発火地点と、状態更新・再描画の処理を分離している。
  setupFilterButtons({
    onFilterChange(filter) {
      currentFilter = filter;

      renderApp({ domQueryAndContent });
    },
  });

  setupTaskForm({
    onAddTask(input) {
      addTask(input);

      renderApp({ domQueryAndContent });
    },
  });

  setupTaskListDelegation({
    onToggleTask(taskId) {
      toggleTask(taskId);

      renderApp({ domQueryAndContent });
    },
    onRemoveTask(taskId) {
      removeTask(taskId);

      renderApp({ domQueryAndContent });
    },
  });

  setupStorageButtons({
    onIncrementLocal: storagePanel.incrementLocal,
    onIncrementSession: storagePanel.incrementSession,
    onClear: storagePanel.clear,
  });

  setupFetchButton({
    onFetchRequest: fetchResult.load,
  });

  // 初期表示。
  // HTML が読み込まれた直後の状態を、現在の tasks と currentFilter から描画する。
  renderApp({ domQueryAndContent });
});
