import * as React from 'react';
import * as THREE from "three";
import {useEffect, useState} from 'react';
import { useFrame } from 'react-three-fiber';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");


const CustomArrowBufferGeometry = ({}) => {
    const customArrow = React.useRef();
    const [direction, setDirection] = useState({ x: -1, y: 3, z: 1});
    const { x, y, z} = direction;
    let dest = new THREE.Vector3(x, y, z);

    useEffect(() => {
        socket.on("server-to-ui", (data) => {
            const dir = JSON.parse(data);
            setDirection({...direction, 
                z: dir.position.z});
        });
    }, [socket])

    useFrame(() => {
        if (customArrow.current) {
            customArrow.current.lookAt(dest);
        }
    });

    return (
        <group 
            ref={customArrow}>
            <mesh
                position={[0,0,1]}
                rotation={[Math.PI * 0.5, Math.PI * 0, Math.PI * 0]} >
            <cylinderBufferGeometry attach="geometry" args={[0.1, 0.1, 2, 32]} />
            <meshStandardMaterial attach="material" color="#fff" />
            </mesh>
            <mesh 
                position={[0,0,2]}
                rotation={[Math.PI * 0.5, Math.PI * 0, Math.PI * 0]} >
                <cylinderBufferGeometry attach="geometry" args={[0, 0.3, 0.4, 32]} />
                <meshStandardMaterial attach="material" color="#fff" />
            </mesh>
            
        </group>
    );
};

export default CustomArrowBufferGeometry;
/*

dest.set( 
                dir.position.x,
                dir.position.y,
                dir.position.z);

class CustomArrowBufferGeometry extends THREE.BufferGeometry {
    constructor(direction, origin, length, params = {}) {
        super()
        this.direction = direction
        this.origin = origin
        this.length = length



        //default cone length is 15%
        this.coneLength = (Math.min(params.coneLength, 0.5) || 0.15) * this.length

        //default cone radius is 5%
        this.coneRadius = (Math.min(params.coneRadius, 0.10) || 0.05) * this.length

        this.lineLength = this.length - this.coneLength

        //default line radius is 5%
        this.cylLineRadius = (Math.min(params.cylLineRadius, 0.05) || 0.01) * this.length

        this.cylLineRadialSegment = 16
        this.cylLineHeightSegment = 2
        this.coneRadialSegment = 16
        this.coneHeightSegment = 2
        this.updateGeo()

    }

    updateGeo() {
        //using cylinder geometry to create line
        let geometry = new THREE.CylinderBufferGeometry(this.cylLineRadius, this.cylLineRadius, this.lineLength, this.cylLineRadialSegment, this.cylLineHeightSegment);
        geometry.rotateZ(Math.PI / 2)
        geometry.translate(this.lineLength / 2, 0, 0)

        let geometryCone = new THREE.ConeBufferGeometry(this.coneRadius, this.coneLength, this.coneRadialSegment, this.coneHeightSegment);
        geometryCone.rotateZ(-Math.PI / 2)
        geometryCone.translate(this.length - (this.coneLength / 2), 0, 0)

        let geometries = [geometry, geometryCone]

        let mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false)

        this.attributes = mergedGeometry.attributes
        this.index = mergedGeometry.index

        let xDir = new THREE.Vector3(1, 0, 0).normalize()

        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(xDir, this.direction)
        this.applyQuaternion(quaternion)

        this.translate(this.origin.x, this.origin.y, this.origin.z)



        this.computeBoundingBox()



    }
}


export { CustomArrowBufferGeometry }*/