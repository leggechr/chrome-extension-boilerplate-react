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

const metamaskStream = new WindowPostMessageStream({
  name: 'content-script.js',
  target: 'script.js',
});

window.addEventListener(
  'message',
  (event) => {
    // console.log('message recieved at contentscript!');
    if (event.data.type && event.data.type === 'FROM_PAGE') {
      console.log('contentscript sending message=!');
      chrome.runtime.sendMessage(
        { essential: event.data.essential },
        (response) => {
          console.log('content script received a message', response);
          window.postMessage({ type: 'FROM_CS', response });
          // metamaskStream.write(response);
          // send back to script
        }
      );
    }
  },
  false
);
