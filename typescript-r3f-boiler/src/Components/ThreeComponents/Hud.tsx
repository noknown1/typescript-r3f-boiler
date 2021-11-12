
import { useSpring, animated, config } from "@react-spring/three";
import { useThree, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

import { IBox } from "../../types/ThreeTypes";
import { Vector3, Euler } from "three";

interface HudProps {
  activeBox: IBox | null;
  hudPosition: Vector3;
  hudRotation: Euler;
}

interface IReferenceFrame {
  position: Vector3;
  rotation: Euler
  config: typeof config;
}


const Hud = ({ activeBox, hudPosition, hudRotation }: HudProps) => {
  const { camera } = useThree();

  const [refrenceFrame, setRefrenceFrame] = useSpring(() => ({
    position: hudPosition,
    rotation: hudRotation,
    config: config.default
  }));

  useFrame(() => {
    setRefrenceFrame({ position: camera.position, rotation: camera.rotation });
  });

  function getBoxName() {
    if (activeBox == null) return 'none';
    else return activeBox.name;
  }

  const textScale = new Vector3(8, 8, 8);
  const textPosition = new Vector3(-5, -4, 0);

  return (
    <animated.group position={refrenceFrame.position}>
      <animated.group rotation={refrenceFrame.rotation}>
        <group position={hudPosition}>
            <Text scale={textScale} color="white" position={textPosition}>Cube Name: {getBoxName}</Text>
        </group>
      </animated.group>
    </animated.group>
  )
}

export default Hud;