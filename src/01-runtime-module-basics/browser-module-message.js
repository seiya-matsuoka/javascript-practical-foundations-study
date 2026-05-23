// ブラウザ側でも、type="module" で読み込まれた JavaScript では export / import を使える。
// ただし、Node.js API である process や fs はブラウザではそのまま使えない。
export const browserRuntimeName = 'Browser';

export function createBrowserMessage({ title, runtimeName }) {
  return `${title}: ${runtimeName}ではdocumentやwindowなどのWeb APIを扱える。`;
}
