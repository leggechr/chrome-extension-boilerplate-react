import { printLine } from './modules/print';
import { initializeProvider, setGlobalProvider } from '@metamask/providers';
import { WindowPostMessageStream } from '@metamask/post-message-stream';

// works;
var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.bundle.js');
(document.head || document.documentElement).appendChild(s);
s.onload = () => {
  s.parentNode.removeChild(s);
};

// var actualCode =
//   '(' +
//   function () {
//     // import browser from 'webextension-polyfill';

//     // Create a stream to a remote provider:
//     const metamaskStream = new WindowPostMessageStream({
//       name: 'inpage',
//       target: 'contentscript',
//     });

//     // this will initialize the provider and set it as window.ethereum
//     const provider = initializeProvider({
//       connectionStream: metamaskStream,
//     });

//     setGlobalProvider(provider);

//     const { ethereum } = window;

//     window.ethereum = ethereum;
//   } +
//   ')();';
// var script = document.createElement('script');
// script.textContent = actualCode;
// (document.head || document.documentElement).appendChild(script);
// script.remove();

// console.log('ethereum', ethereum);

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
