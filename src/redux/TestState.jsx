import { useCallback, useEffect } from "react";
import { awareness, doc, provider, undoManager, ymap } from "../Yjs";

export function useMultiplayerState(roomId) {
  console.log(roomId);
  const onMount = useCallback(
    (app) => {
      app.loadRoom(roomId);
      app.pause();

      app.replacePageContent(Object.fromEntries(ymap.entries()), {});
    },
    [roomId]
  );

  const onChangePage = useCallback((app, shapes, bindings) => {
    undoManager.stopCapturing();
    doc.transact(() => {
      Object.entries(shapes).forEach(([id, shape]) => {
        if (!shape) {
          ymap.delete(id);
        } else {
          ymap.set(shape.id, shape);
        }
      });
      Object.entries(bindings).forEach(([id, binding]) => {
        if (!binding) {
          ymap.delete(id);
        } else {
          ymap.set(binding.id, binding);
        }
      });
    });
  }, []);

  const onUndo = useCallback(() => {
    undoManager.undo();
  }, []);

  const onRedo = useCallback(() => {
    undoManager.redo();
  }, []);

  /**
   * Callback to update user's (self) presence
   */
  const onChangePresence = useCallback((app, user) => {
    awareness.setLocalStateField("tdUser", user);
  }, []);

  /**
   * Update app users whenever there is a change in the room users
   */
  useEffect(() => {
    const onChangeAwareness = () => {};

    awareness.on("change", onChangeAwareness);

    return () => awareness.off("change", onChangeAwareness);
  }, []);

  useEffect(() => {
    function handleChanges() {}

    ymap.observeDeep(handleChanges);

    return () => ymap.unobserveDeep(handleChanges);
  }, []);

  useEffect(() => {
    function handleDisconnect() {
      provider.disconnect();
    }
    window.addEventListener("beforeunload", handleDisconnect);

    return () => window.removeEventListener("beforeunload", handleDisconnect);
  }, []);

  return {
    onMount,
    onChangePage,
    onUndo,
    onRedo,
    onChangePresence,
  };
}
