
import { useState, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { IBox } from '../../types/ThreeTypes';

interface BoxMeshProps {
  setActiveBox: (activeBox: IBox) => void;
  box: IBox;
}

const BoxMesh = ({ setActiveBox, box }: BoxMeshProps) => {

  const mesh = useRef<THREE.Mesh>();
  const [active, setActive] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  function setBoxAsActive() {
    setActive(!active);
    setActiveBox(box);
  }

  useFrame(() => {
    if (mesh.current && active) mesh.current.rotation.y += 0.1;
  });

  return (
    <mesh
      ref={mesh}
      position={box.pos}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setBoxAsActive()}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
    <boxBufferGeometry args={[box.size, box.size, box.size]} />
    <meshStandardMaterial
      color={box.color}
      wireframe={hovered}
    />  

    </mesh>
  );
};

export default BoxMesh;