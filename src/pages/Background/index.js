console.log('This is the background page.');
console.log('Put the background scripts here.');

browser.runtime.onConnect(() => {
  console.log('connected');
});
