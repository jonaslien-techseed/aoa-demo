import * as React from 'react';
import * as THREE from "three";
import {useEffect, useState} from 'react';
import { useFrame } from 'react-three-fiber';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

const Arrow = ({}) => {
    const arrow = React.useRef();
    const [position, setPosition] = useState({ x: -1, y: 3, z: 1 });
    const { x, y, z } = position;
    const vec = new THREE.Vector3(x, y, z);
    const dest = new THREE.Vector3(3, 3, 5);
    const arrowLength = 2;
    let x1 = 1;
    let y1 = 1;
    let z1 = 1;
    

    useEffect(() => {
        socket.on("server-to-ui", (data) => {
        const obj = JSON.parse(data);
        setPosition({...position, z: obj.position.z});
        });
    }, [socket]);

    

    useFrame(() => {
        arrow.current.position.lerp(vec, 0.2);
        // if(arrow.current) {
        //arrow.current.rotation.x += 0.01;
        //arrow.current.rotation.y += 0.01;
        //     //arrow.current.position.z = messageReceived;
            
        //     arrow.current.position.lerp(vec, 1);
        // }
        
    });

    return (
            <mesh 
                ref={arrow} >
                <cylinderBufferGeometry attach="geometry" args={[0.2, 0.2, 0.1, 32]} />
                <meshStandardMaterial attach="material" color="#fff" />
                <axesHelper />
            </mesh>
    );
};


//<arrowHelper args={[dest, vec, arrowLength, 0xffff00, 0.1*arrowLength, 0.1*arrowLength]}/>
//rotation={[Math.PI * 0.5, Math.PI * 0, Math.PI * 0]} >
//rotation={[Math.atan(y1 / Math.sqrt((x1*x1)+(z1*z1))), Math.atan(-x1 / z1), 0]} >
//args={[dest, vec, arrowLength, 0xffff00, 0.1*arrowLength, 0.1*arrowLength]}

export default Arrow;