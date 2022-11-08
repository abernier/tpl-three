import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import styled from "@emotion/styled";

import Layout from "./Layout";

import { Physics, Debug, RigidBody } from "@react-three/rapier";
import Ball from "./components/Ball";

function App() {
  return (
    <App.Styled>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["KeyW"] },
          { name: "backward", keys: ["KeyS"] },
          { name: "leftward", keys: ["KeyA"] },
          { name: "rightward", keys: ["KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas shadows>
          <Physics
          // gravity={[0, -4, 0]}
          // timeStep={1 / 60}
          >
            <Debug />

            <Layout />

            <RigidBody>
              <mesh position-y={1} castShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="blue" />
              </mesh>
            </RigidBody>

            <Ball />

            {/* Ground */}
            <RigidBody type="fixed">
              <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <boxGeometry args={[100, 100, 0.1]} />
                <meshStandardMaterial color="gray" transparent opacity={0.8} />
              </mesh>
            </RigidBody>
          </Physics>
        </Canvas>
      </KeyboardControls>
    </App.Styled>
  );
}
App.Styled = styled.div`
  position: fixed;
  inset: 0;
`;

export default App;
