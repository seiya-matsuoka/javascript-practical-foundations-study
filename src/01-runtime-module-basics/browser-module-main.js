import { browserRuntimeName, createBrowserMessage } from './browser-module-message.js';

const title = 'Unit 01 Browser Module Demo';

// document はブラウザが提供する Web API。
// Node.js でこのファイルを直接実行しても、通常 document は存在しない。
const resultElement = document.querySelector('[data-result]');

// DOM 要素の取得は失敗する可能性がある。
// 実務でも、null を想定して早めに失敗させるか、分岐して扱う必要がある。
if (resultElement === null) {
  throw new Error('data-result属性を持つ表示先要素が見つからない。');
}

const message = createBrowserMessage({
  title,
  runtimeName: browserRuntimeName,
});

resultElement.textContent = message;

console.log('browser-module-main.jsをES Modulesとして実行した。');
console.log('document.title:', document.title);
console.log('window.location.href:', window.location.href);
