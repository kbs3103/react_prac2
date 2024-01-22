import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const VERSION = 1;

export const doc = new Y.Doc();
export const roomID = `y-${VERSION}`;
export const provider = new WebsocketProvider(
  "ws://localhost:1234",
  roomID,
  doc,
  {
    connect: true,
  }
);
export const awareness = provider.awareness;
export const ymap = doc.getMap();
export const undoManager = new Y.UndoManager(ymap);
