import { initializeProvider, setGlobalProvider } from '@metamask/providers';
import { WindowPostMessageStream } from '@metamask/post-message-stream';

// Create a stream to a remote provider:
const metamaskStream = new WindowPostMessageStream({
  name: 'inpage',
  target: 'contentscript',
});

// this will initialize the provider and set it as window.ethereum
const provider = initializeProvider({
  connectionStream: metamaskStream,
});

setGlobalProvider(provider);

const { ethereum } = window;

window.ethereum = ethereum;
