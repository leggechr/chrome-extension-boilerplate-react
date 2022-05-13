import { initializeProvider, setGlobalProvider } from '@metamask/providers';
import { WindowPostMessageStream } from '@metamask/post-message-stream';

const metamaskStream = new WindowPostMessageStream({
  name: 'script.js',
  target: 'content-script.js',
});

// this will initialize the provider and set it as window.ethereum
// rather than using this provider here can we just use the walletConnect provider provided by the WC instance in the popup?
const provider = initializeProvider({
  connectionStream: metamaskStream,
});

provider.request = (args) =>
  new Promise((res, rej) => {
    // console.log('1. (script.js): provider.request', args.method);

    const finalMessageListener = (event) => {
      // console.log('9. (script) message received', event);
      if (event.data.type && event.data.type === 'FROM_CS') {
        console.log('10. (script) FINALLY!', event.data.response);
        window.removeEventListener('message', finalMessageListener);
        res(event.data.response);
      }
    };

    window.addEventListener('message', finalMessageListener, true);

    window.postMessage({
      type: 'FROM_PAGE',
      essential: args,
    });
  });

setGlobalProvider(provider);

const { ethereum } = window;

// this could be possible via a permission
window.ethereum = ethereum;
