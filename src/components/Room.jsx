import { Fragment } from "react";
import { useMultiplayerState } from "../redux/TestState";
import { roomID } from "../Yjs";
import ReactLogo from "./ReactLogo";

function Editor(roomId) {
  const { onMount, ...events } = useMultiplayerState(roomId);

  console.log(events);

  return <ReactLogo onMount={onMount} {...events} />;
}

export default function Room() {
  return (
    <Fragment>
      <Editor roomId={roomID} />
    </Fragment>
  );
}
