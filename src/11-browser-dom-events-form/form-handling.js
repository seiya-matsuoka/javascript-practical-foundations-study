function readTaskForm(form) {
  // FormData を使うと、form 内の name 付き入力値をまとめて取得できる。
  // input 要素を 1 つずつ querySelector で読むより、submit 処理の入口を整理しやすい。
  const formData = new FormData(form);

  return {
    title: String(formData.get('title') ?? '').trim(),
    category: String(formData.get('category') ?? 'study'),
  };
}

function validateTaskInput({ title }) {
  // form input の検証を submit handler から分離する。
  // 画面イベント処理と validation の責務を分けると、処理の見通しがよくなる。
  if (title.length === 0) {
    return 'タスク名を入力する必要がある。';
  }

  if (title.length > 40) {
    return 'タスク名は40文字以内で入力する必要がある。';
  }

  return null;
}

export function setupTaskForm({ onAddTask }) {
  // form 要素、入力欄、message 表示先を取得し、submit event の処理を登録する。
  // DOM の取得は初期化時にまとめ、event 発火時には取得済み要素を使う。
  const form = document.querySelector('[data-task-form]');
  const titleInput = document.querySelector('[data-task-title-input]');
  const message = document.querySelector('[data-form-message]');

  form.addEventListener('submit', (event) => {
    // submit は click だけでなく Enter key でも発火する。
    // button click だけを扱うより、form として自然な操作に対応できる。
    // submit event の既定動作はページ遷移。
    // SPA や動的なフォーム処理では preventDefault() で既定動作を止め、JavaScript 側で処理する。
    event.preventDefault();

    // 入力値の読み取り、validation、状態更新依頼、画面表示更新を順番に行う。
    // ここでは DOM から値を読み、main.js の onAddTask に渡すところまでを担当する。
    const input = readTaskForm(form);
    const validationMessage = validateTaskInput(input);

    if (validationMessage) {
      message.textContent = validationMessage;
      // validation に失敗したら、入力欄へ focus を戻して再入力しやすくする。
      titleInput.focus();

      return;
    }

    onAddTask(input);

    // 追加成功後は form を初期化し、次の入力へすぐ進める状態に戻す。
    form.reset();
    titleInput.focus();
    message.textContent = 'タスクを追加した。';
  });
}
