import { printLine } from './modules/print';
import { WindowPostMessageStream } from '@metamask/post-message-stream';

// works but causes websocket errors in the console. Possible because the remove child part isn't working? Also the getURL is what causes the websockets (I think);
// how metamask does it Manifest V2 (https://github.com/MetaMask/metamask-extension/blob/develop/app/scripts/contentscript.js#L40)
var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.bundle.js');
(document.head || document.documentElement).appendChild(s);
s.onload = () => {
  s.parentNode.removeChild(s);
};
