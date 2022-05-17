chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // opens the popup but still doesn't listen :(
  // chrome.tabs.create({ url: 'popup.html' });
  // await chrome.action.setPopup({ popup: 'popup.html' });

  // open the popup here. this probably should happen like metamask where it isn't actually a popup it's a window

  console.log(
    '3. (background.js) message received + passing along sender',
    sender
  );
  chrome.runtime.sendMessage(message, (response) => {
    console.log(
      '6. (background.js) message received + passing along',
      response
    );
    sendResponse(response);
  });

  return true;
});
