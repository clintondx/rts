import { WebsocketProvider } from 'y-websocket';
import { Provider } from '../index';
import * as Y from "yjs";

describe('Unit Tests', () => { 
  const provider = new Provider();
  let mockProvider: WebsocketProvider;
  
  test('CheckDocumentIsNotNothing', () => {
    expect(provider.GetDoc()).not.toBeNull();
  });

})

