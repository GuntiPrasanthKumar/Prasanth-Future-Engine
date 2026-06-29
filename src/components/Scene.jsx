import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function WireframeGlobe(props) {
  const group = useRef();
  const pointsRef = useRef();

  // Create the base geometry for the globe
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 4), []);
  const wireframeGeo = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);

  // Material for the faint wireframe lines
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: '#333333',
    transparent: true,
    opacity: 0.3,
  }), []);

  // Material for the sparkling nodes (vertices)
  const pointsMaterial = useMemo(() => new THREE.PointsMaterial({
    color: '#ffffff',
    size: 0.03,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  }), []);

  // Create orbital rings
  const ringGeo1 = useMemo(() => new THREE.RingGeometry(2.4, 2.41, 64), []);
  const ringGeo2 = useMemo(() => new THREE.RingGeometry(2.8, 2.81, 64), []);
  const ringGeo3 = useMemo(() => new THREE.RingGeometry(3.2, 3.21, 64), []);

  useFrame((state, delta) => {
    if (group.current) {
      // Continuous slow base rotation
      group.current.rotation.y += delta * 0.1;
      
      // Mouse interaction: Tilt the globe based on cursor position
      const targetRotationX = (state.mouse.y * Math.PI) / 8;
      const targetRotationZ = -(state.mouse.x * Math.PI) / 8;

      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRotationZ, 0.05);
    }

    if (pointsRef.current) {
      // Pulsing sparkling effect for the nodes
      const time = state.clock.getElapsedTime();
      pointsRef.current.material.opacity = 0.5 + Math.sin(time * 3) * 0.3;
    }
  });

  return (
    <group ref={group} {...props}>
      {/* The wireframe mesh */}
      <lineSegments geometry={wireframeGeo} material={lineMaterial} />
      
      {/* The glowing nodes */}
      <points ref={pointsRef} geometry={geometry} material={pointsMaterial} />

      {/* Outer orbital rings */}
      <mesh geometry={ringGeo1} material={lineMaterial} rotation={[Math.PI / 2.2, 0.2, 0]} />
      <mesh geometry={ringGeo2} material={lineMaterial} rotation={[Math.PI / 1.8, -0.3, 0]} />
      <mesh geometry={ringGeo3} material={lineMaterial} rotation={[Math.PI / 2, 0.1, 0.5]} />
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Globe removed as per request */}
    </>
  );
}
