export function wait(ms) {
  // setTimeout を Promise で包むと、await できる小さな待機処理になる。
  // 非同期のサンプルでは、実際の API 通信の代わりに短い待ち時間を使って実行順を確認する。
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function createDelayedValue(value, ms) {
  // Promise は「今すぐ値を返せない処理の結果」を表す object。
  // resolve を呼ぶと fulfilled になり、await や then から値を受け取れる。
  return new Promise((resolve) => {
    setTimeout(() => {
      // setTimeout の callback が実行されたタイミングで resolve する。
      // 呼び出し側から見ると、値は「後で fulfilled になる Promise」として受け取る。
      resolve(value);
    }, ms);
  });
}

export function createDelayedError(message, ms) {
  // reject を呼ぶと rejected になり、await 側の try-catch や catch で扱う失敗になる。
  // Unit 08 で扱ったエラー処理の考え方が、非同期処理にもそのままつながる。
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject する値には Error object を使う。
      // 文字列だけを reject するより、message や stack を扱いやすい。
      reject(new Error(message));
    }, ms);
  });
}

// 非同期処理の成否を result object に変換する補助関数。
// Unit 08 の validation / error handling と同じく、呼び出し元で扱いやすい形に整える。
// throw された例外や rejected Promise を、そのまま外へ漏らさない場面で使える。
export async function captureAsyncResult(asyncTask) {
  try {
    const value = await asyncTask();

    return {
      ok: true,
      value,
      message: null,
    };
  } catch (error) {
    return {
      ok: false,
      value: null,
      message: error.message,
    };
  }
}
