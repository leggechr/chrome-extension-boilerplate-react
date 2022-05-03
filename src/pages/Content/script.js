import { initializeProvider, setGlobalProvider } from '@metamask/providers';
import { WindowPostMessageStream } from '@metamask/post-message-stream';

// file1
// const streamA = new WindowPostMessageStream({
//   name: 'streamA',
//   target: 'streamB',
// });

// file2
// const streamB = new WindowPostMessageStream({
//   name: 'streamB',
//   target: 'streamA',
//   // We use an imaginary iframe as an example, but any window object will do.
//   // Omitting targetWindow defaults to the global window.
//   targetWindow: iframe.contentWindow,
// });

// script.js, is the dapp
// popup is the extension must be open to talk to it

// 2 bidi stream through windowpostmessagestream
// 1. script ->

// Create a stream to a remote provider:
const metamaskStream = new WindowPostMessageStream({
  name: 'inpage',
  target: 'contentscript',
});

// this will initialize the provider and set it as window.ethereum
const provider = initializeProvider({
  connectionStream: metamaskStream,
});

const request = provider.request;

provider.request = (args) => {
  // this should be talking to the popup
  chrome.action.openPopup();

  // calls the implementation from the metamask provider library. This uses json-rpc-engine
  request(args);
};

setGlobalProvider(provider);

const { ethereum } = window;

// this could be possible via a permission
window.ethereum = ethereum;
