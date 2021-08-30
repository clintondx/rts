import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

export class Provider {

  ydoc = new Y.Doc();
  ymap: any;
  websocketProvider!: WebsocketProvider; 

  public GetDoc(): Y.Doc {
    return this.ydoc;
  }

  public GetMappedDocument(mappedKey: string): any {
    return this.ydoc.getMap(mappedKey);
  } 

  public SetMappedDocument(mappedKey: string, document: any) {
    this.ymap.set(mappedKey, document);
  }

  public SetObservationOnDocument() {
    this.ymap.observe((ymapEvent: any) => {
      ymapEvent.target === this.ymap // => true
      ymapEvent.keysChanged 
      ymapEvent.changes.keys 
      ymapEvent.changes.keys.forEach((change: any, key: any) => {
        if (change.action === 'add') {
          console.log(`Property "${key}" was added. Initial value: "${this.ymap.get(key)}".`);
          let da = this.ymap.get(key);
        } else if (change.action === 'update') {
          console.log(`Property "${key}" was updated. New value: "${this.ymap.get(key)}". Previous value: "${change.oldValue}".`);
          let da = this.ymap.get(key);
        } else if (change.action === 'delete') {
          console.log(`Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`);
          this.ymap.delete(key);
        }
      })
    });
  }

  public DisconnectProvider() {
    this.websocketProvider.disconnect();
  }

  public ConnectProvder() {
    this.websocketProvider.connect();
  }





  public GetProvider(serverUrl: string, roomName: string, document: Y.Doc) {
    this.websocketProvider = new WebsocketProvider(serverUrl, roomName, document);
  }

  public IsConnected(): Boolean {
    return this.websocketProvider.shouldConnect;
  }


}
