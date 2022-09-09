import * as React from 'react';
import * as THREE from "three";
import {useEffect, useState} from 'react';
import { useFrame } from 'react-three-fiber';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

const MyCylinder = ({}) => {
    const myMesh = React.useRef();
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
    const { x, y, z } = position;
    const vec = new THREE.Vector3(x, y, z);
    

    useEffect(() => {
        socket.on("server-to-ui", (data) => {
        const obj = JSON.parse(data);
        setPosition({...position, z: obj.position.z});
        console.log(obj);
        });
    }, [socket]);

    

    useFrame(() => {
        myMesh.current.position.lerp(vec, 0.2);
        // if(myMesh.current) {
        myMesh.current.rotation.x += 0.01;
        myMesh.current.rotation.y += 0.01;
        //     //myMesh.current.position.z = messageReceived;
            
        //     myMesh.current.position.lerp(vec, 1);
        // }
        
    });

    return (
            <mesh 
                ref={myMesh} 
                position={[0, 0, -5]} 
                rotation={[Math.PI * 0.5, 0, 0]} >
                <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
                <meshStandardMaterial attach="material" color="#fff" />
            </mesh>
    );
};

export default MyCylinder;