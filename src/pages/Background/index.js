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
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // opens the popup but still doesn't listen :(
  // chrome.tabs.create({ url: 'popup.html' });
  // await chrome.action.setPopup({ popup: 'popup.html' });

  // open the popup here. this probably should happen like metamask where it isn't actually a popup it's a window

  console.log(
    '4. (background.js) message received + passing along sender',
    sender
  );
  chrome.runtime.sendMessage(message, (response) => {
    console.log(
      '7. (background.js) message received + passing along',
      response
    );
    sendResponse(response);
  });

  return true;
});
