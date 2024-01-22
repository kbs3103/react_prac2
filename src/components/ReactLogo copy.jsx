import { Fragment } from "react";
import logo from "../assets/react.svg";

import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import "./ReactLogo.css";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

let logoPos;
let bindLogoPos;
// let mouseX = 0;
// let mouseY = 0;
const loca = [];

const ydoc = new Y.Doc();

const ymap = ydoc.getMap("test");
const ymapNested = new Y.Map();

ymap.set("my nested map", ymapNested);
ymap.set("location", [0, 0]);

console.log(ymap.get("location"));

window.addEventListener("mousedown", () => {
  // console.log(logoPos.y.animation.to);
  // // console.log(ymap.get("location"));
  // console.log(loca);
  // console.log(e.clientX, e.clientY);
});

const provider = new WebrtcProvider("test-demo-room", ydoc, {
  signaling: ["ws://localhost:5173"],
});

const awareness = provider.awareness;

awareness.setLocalStateField("user", {
  name: "Emmanuelle Charpentier",
  color: "#ffb61e",
});

awareness.on("change", () => {
  console.log(Array.from(awareness.getStates().values()));
});

const ReactLogo = () => {
  logoPos = useSpring({ x: 0, y: 0 });

  ydoc.on("afterTransaction", () => {
    logoPos.x.set(ymap.get("location")[0]);
    logoPos.y.set(ymap.get("location")[1]);
    loca[0] = ymap.get("location")[0];
    loca[1] = ymap.get("location")[1];
    console.log(loca);
  });
  bindLogoPos = useDrag((params) => {
    // console.log(ymap.get("location"));
    console.log(params);
    // 현재 위치
    loca[0] = params.previous[0];
    loca[1] = params.previous[1];
    logoPos.x.set(params.previous[0]);
    logoPos.y.set(params.previous[1]);
    ymap.set("location", loca);
    // loca[0] = params.previous[0];
    // loca[1] = params.previous[1];
    // logoPos.x.set(params.previous[0]);
    // logoPos.y.set(params.previous[1]);
  });
  return (
    <Fragment>
      <animated.div
        {...bindLogoPos()}
        style={{
          x: logoPos.x,
          y: logoPos.y,
        }}
      >
        <img src={logo} alt="logo" />
      </animated.div>
    </Fragment>
  );
};

export default ReactLogo;
