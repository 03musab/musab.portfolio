"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, useMemo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  Image,
  Preload,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';

// three r185+ deprecated THREE.Clock, but @react-three/fiber (v9 — the latest
// stable) still constructs one internally on every Canvas, which logs the
// deprecation warning to the console. Route three's console output through a
// filter that drops just that message and forwards everything else unchanged.
// Remove this once fiber moves over to THREE.Timer.
if (typeof THREE.setConsoleFunction === 'function') {
  THREE.setConsoleFunction((type, message, ...params) => {
    if (type === 'warn' && message.startsWith('THREE.Clock: This module has been deprecated')) {
      return;
    }
    console[type](message, ...params);
  });
}

export default function FluidGlass({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {}
}: {
  mode?: 'lens' | 'bar' | 'cube';
  lensProps?: Record<string, any>;
  barProps?: Record<string, any>;
  cubeProps?: Record<string, any>;
}) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [
      { label: 'Projects', link: '#projects' },
      { label: 'Experience', link: '#experience' },
      { label: 'Skills', link: '#skills' },
      { label: 'Contact', link: '#contact' }
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true }}
    >
      <Wrapper modeProps={modeProps}>
        <Typography />
        <Images />
        <Preload />
      </Wrapper>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: {
  children?: React.ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: Record<string, any>;
  [key: string]: any;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  const fallbackGeometry = useMemo(() => {
    if (geometryKey === 'lens') {
      return new THREE.CylinderGeometry(1.4, 1.4, 0.5, 64);
    }
    return new THREE.BoxGeometry(1, 1, 1);
  }, [geometryKey]);

  const glbMesh = nodes?.[geometryKey] as THREE.Mesh | undefined;
  const geometry = glbMesh?.geometry ?? fallbackGeometry;

  useEffect(() => {
    const geo = geometry;
    if (geo) {
      geo.computeBoundingBox();
      if (geo.boundingBox) {
        geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
      }
    }
  }, [geometry]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    gl.setClearColor(0x5227ff, 1);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: { modeProps: Record<string, any>; [key: string]: any }) {
  return (
    <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="lens" followPointer modeProps={modeProps} {...p} />
  );
}

function Cube({ modeProps, ...p }: { modeProps: Record<string, any>; [key: string]: any }) {
  return (
    <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="cube" followPointer modeProps={modeProps} {...p} />
  );
}

function Bar({ modeProps = {}, ...p }: { modeProps?: Record<string, any>; [key: string]: any }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="bar"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function Images() {
  const group = useRef<THREE.Group>(null!);
  const { height } = useThree((s) => s.viewport);

  useFrame(() => {
    if (!group.current) return;
    // Subtle breathing animation
    const t = performance.now() * 0.001;
    const child0 = group.current.children[0] as THREE.Mesh;
    const child1 = group.current.children[1] as THREE.Mesh;
    if (child0) {
      child0.position.x = -0.4 + Math.sin(t * 0.3) * 0.02;
    }
    if (child1) {
      child1.position.x = 0.4 + Math.cos(t * 0.3) * 0.02;
    }
  });

  return (
    <group ref={group}>
      <Image position={[-0.4, 0, 0]} scale={[1.6, height / 3]} url="/assets/demo/cs1.webp" />
      <Image position={[0.4, 0, 0]} scale={1.6} url="/assets/demo/cs2.webp" />
    </group>
  );
}

const LINE_1 = 'Musab \u2014 No cap in the bio, all facts in the repo,';
const LINE_2 = "If I say I'm gonna build it, watch me ship that demo.";
const CHAR_DELAY = 35; // ms per character
const LINE_PAUSE = 400; // ms pause between lines

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.22 },
    tablet: { fontSize: 0.38 },
    desktop: { fontSize: 0.5 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());
  const [line1Count, setLine1Count] = useState(0);
  const [line2Count, setLine2Count] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Typewriter for line 1
  useEffect(() => {
    if (line1Count >= LINE_1.length) return;
    const t = setTimeout(() => setLine1Count((c) => c + 1), CHAR_DELAY);
    return () => clearTimeout(t);
  }, [line1Count]);

  // Typewriter for line 2 (starts after line 1 finishes + pause)
  useEffect(() => {
    if (line1Count < LINE_1.length) return;
    if (line2Count >= LINE_2.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(
      () => setLine2Count((c) => c + 1),
      line2Count === 0 ? LINE_PAUSE : CHAR_DELAY
    );
    return () => clearTimeout(t);
  }, [line1Count, line2Count]);

  const { fontSize } = DEVICE[device as keyof typeof DEVICE];
  const showCursor1 = line1Count < LINE_1.length;
  const showCursor2 = line1Count >= LINE_1.length && !done;

  return (
    <group>
      <Text
        position={[0, 0.12, 12]}
        fontSize={fontSize * 0.65}
        letterSpacing={-0.02}
        outlineWidth={0}
        outlineBlur="20%"
        outlineColor="#000"
        outlineOpacity={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {LINE_1.slice(0, line1Count)}
        {showCursor1 ? '\u258c' : ''}
      </Text>
      <Text
        position={[0, -0.12, 12]}
        fontSize={fontSize * 0.65}
        letterSpacing={-0.02}
        outlineWidth={0}
        outlineBlur="20%"
        outlineColor="#000"
        outlineOpacity={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {LINE_2.slice(0, line2Count)}
        {showCursor2 ? '\u258c' : ''}
      </Text>
    </group>
  );
}
