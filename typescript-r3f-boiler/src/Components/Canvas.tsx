import { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

import BoxMesh from "./ThreeComponents/BoxMesh";
import { IBox } from "../types/ThreeTypes";
import { Vector3 } from 'three';
import { FirstPersonControls, OrbitControls } from '@react-three/drei';

const ThreeCanvas = () => {

  const boxes: IBox[] = [
    { name: "red box", pos: new Vector3(-3, 0, 3), size: 1, color: "red" },
    { name: "blue box", pos: new Vector3(3, 0, -3), size: 1, color: "blue" },
    { name: "orange box", pos: new Vector3(0, 0, 0), size: 1, color: "orange" },
    { name: "pink box", pos: new Vector3(-2, 1, -2), size: 1, color: "pink" },
    { name: "green box", pos: new Vector3(2, 1, 2), size: 1, color: "green" },
  ];

  const [activeBox, setActiveBox] = useState<IBox | null>(null);

  return (
    <ThreeCanvasMain camera={{ fov: 50, zoom: 10, position: [0, 0, 100] }}>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes.map((box, i) => {
        return (
          <BoxMesh key={i} setActiveBox={setActiveBox} box={box} />
        );
      })}
    </ThreeCanvasMain>
  );
}

export default ThreeCanvas;

const ThreeCanvasMain = styled(Canvas)`
  display: flex;
  background-color: black;
  flex: 1;
  flex-direction: column;
`;