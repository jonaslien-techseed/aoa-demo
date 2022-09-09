import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from './ThreePointVis/Controls';
import MyCylinder from './ThreePointVis/MyCylinder';
//import GridHelper from './ThreePointVis/GridHelper';
import './styles.css';

//const data = new Array(1000).fill(0).map((d, id) => ({id}));

export default function App() {
  return (
    <div className='App'>

        <Canvas camera={{ position: [0, 0, 5] }}>
            <Controls />
            <ambientLight color="#ffffff" intensity={0.1} />
            <hemisphereLight
                color="#ffffff"
                skyColor="#ffffbb"
                groundColor="#080820"
                intensity={1.0}
            />
          <MyCylinder />
          <mesh position={[0, 0, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
            <gridHelper />
          </mesh>
        </Canvas>
     
    </div>
  );
}
