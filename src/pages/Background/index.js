import { WindowPostMessageStream } from '@metamask/post-message-stream';

import browser from 'webextension-polyfill';
console.log('This is the background page.');

// Create a stream to a remote provider:
// const metamaskStream = new WindowPostMessageStream({
//   name: 'background.js',
//   target: 'script.js',
// });

// metamaskStream.on('test', () => {
//   chrome.action.openPopup();
//   console.log('HIII');
// });
// is this necessary?
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // opens the popup but still doesn't listen :(
  // chrome.tabs.create({ url: 'popup.html' });
  // await chrome.action.setPopup({ popup: 'popup.html' });

  // open the popup here. this probably should happen like metamask where it isn't actually a popup it's a window

  console.log('background sending message');
  chrome.runtime.sendMessage(message, (response) => {
    console.log('background received a response', response);
    sendResponse(response);
  });
});

// connectRemote = (remotePort) => {
//   remotePort.onMessage.addListener((ms) => {
//     chrome.action.openPopup();
//     console.log('HIII');s
//   });
// };

// chrome.runtime.
