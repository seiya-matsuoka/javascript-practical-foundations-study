// localStorage と sessionStorage は同じ Storage API を持つ。
// key を定数にしておくと、読み書き・削除で同じ名前を安全に使い回せる。
const LOCAL_STORAGE_KEY = 'unit11.local.count';
const SESSION_STORAGE_KEY = 'unit11.session.count';

function readNumberFromStorage(storage, key) {
  // storage.getItem は文字列または null を返す。
  // count として使うため、読み取り時に number へ変換する。
  try {
    const value = storage.getItem(key);

    return Number(value ?? 0);
  } catch {
    // ブラウザ設定や実行環境によっては storage にアクセスできない場合がある。
    // storage API を使う処理では、失敗する可能性も考慮しておく。
    return 0;
  }
}

function writeNumberToStorage(storage, key, value) {
  // storage に保存できる値は文字列。
  // number のまま保存するのではなく、String に変換してから setItem する。
  try {
    storage.setItem(key, String(value));
  } catch {
    // 保存に失敗しても画面全体を止めない。
    // 実務ではユーザーへ通知する、代替保存先を使うなどの判断を行う。
  }
}

function removeStorageValue(storage, key) {
  // removeItem は指定 key の値を削除する。
  // clear() で全 storage を消すより、アプリが使う key だけを消す方が安全。
  try {
    storage.removeItem(key);
  } catch {
    // removeItem も storage へのアクセスに失敗する可能性があるため、同じく握りつぶしている。
  }
}

export function setupStoragePanel() {
  // storage の値と画面表示を同期するための処理をまとめる。
  // localStorage はブラウザに残り、sessionStorage はタブ単位の session に残る。
  const localStorageCount = document.querySelector('[data-local-storage-count]');
  const sessionStorageCount = document.querySelector('[data-session-storage-count]');

  function readState() {
    // localStorage と sessionStorage の現在値をまとめて読み取り、表示用 state として返す。
    return {
      localCount: readNumberFromStorage(localStorage, LOCAL_STORAGE_KEY),
      sessionCount: readNumberFromStorage(sessionStorage, SESSION_STORAGE_KEY),
    };
  }

  function render() {
    // storage に保存されている値を DOM に反映する。
    // storage の更新後は必ず render を呼び、画面と保存値を同期する。
    const state = readState();

    localStorageCount.textContent = String(state.localCount);
    sessionStorageCount.textContent = String(state.sessionCount);
  }

  function incrementLocal() {
    // localStorage はページを閉じても値が残る。
    // 永続的に保持したい小さな設定値や一時的なユーザー設定で使われる。
    const nextValue = readNumberFromStorage(localStorage, LOCAL_STORAGE_KEY) + 1;

    writeNumberToStorage(localStorage, LOCAL_STORAGE_KEY, nextValue);
    render();
  }

  function incrementSession() {
    // sessionStorage はタブを閉じると値が消える。
    // 一時的な入力状態や、タブ単位で完結する情報に向く。
    const nextValue = readNumberFromStorage(sessionStorage, SESSION_STORAGE_KEY) + 1;

    writeNumberToStorage(sessionStorage, SESSION_STORAGE_KEY, nextValue);
    render();
  }

  function clear() {
    // このサンプルで使っている key の値だけを削除し、表示も初期状態へ戻す。
    removeStorageValue(localStorage, LOCAL_STORAGE_KEY);
    removeStorageValue(sessionStorage, SESSION_STORAGE_KEY);
    render();
  }

  render();

  return {
    incrementLocal,
    incrementSession,
    clear,
  };
}
