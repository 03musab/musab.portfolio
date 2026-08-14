"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, useMemo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  useScroll,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text,
  Float
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({
  mode: initialMode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {}
}: {
  mode?: 'lens' | 'bar' | 'cube';
  lensProps?: Record<string, any>;
  barProps?: Record<string, any>;
  cubeProps?: Record<string, any>;
}) {
  const [activeMode, setActiveMode] = useState<'lens' | 'bar' | 'cube'>(initialMode);

  const Wrapper = activeMode === 'bar' ? Bar : activeMode === 'cube' ? Cube : Lens;
  const rawOverrides = activeMode === 'bar' ? barProps : activeMode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [
      { label: 'JobSnap (AI)', link: '#projects' },
      { label: 'Togcode (Realtime)', link: '#projects' },
      { label: 'TalkSphere (Security)', link: '#projects' },
      { label: 'Luxure (Experience)', link: '#experience' }
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <div className="relative w-full h-[520px] lg:h-[580px] rounded-3xl overflow-hidden border border-line bg-[#0e0e11] shadow-2xl">
      {/* Top Mode Switcher Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-line/60 bg-background/80 backdrop-blur-md p-1 font-mono text-[10px] uppercase tracking-wider">
        {(['lens', 'bar', 'cube'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setActiveMode(m)}
            className={`rounded-full px-3 py-1 font-semibold transition-all ${
              activeMode === m
                ? 'bg-foreground text-background shadow-sm'
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 10]} intensity={3} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#6366f1" />
        <ScrollControls damping={0.2} pages={2} distance={0.4}>
          {activeMode === 'bar' && <NavItems items={navItems} />}
          <Wrapper modeProps={modeProps}>
            <Scroll>
              <Typography />
              <FloatingObjects />
            </Scroll>
            <Preload />
          </Wrapper>
        </ScrollControls>
      </Canvas>

      {/* Prominent High-Contrast Overlay Pill */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-emerald-500/50 bg-[#091a13]/90 backdrop-blur-md px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400 shadow-[0_4px_25px_rgba(16,185,129,0.3)]">
        <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Move Mouse & Scroll to Refract 3D Glass</span>
      </div>
    </div>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  defaultShape = 'cylinder',
  ...props
}: {
  children?: React.ReactNode;
  glb?: string;
  geometryKey?: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: Record<string, any>;
  defaultShape?: 'cylinder' | 'box';
  [key: string]: any;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  // Fallback procedural geometry if GLB is not loaded or missing
  const fallbackGeometry = useMemo(() => {
    if (defaultShape === 'box') {
      return new THREE.BoxGeometry(2.2, 2.2, 0.8);
    }
    return new THREE.CylinderGeometry(1.4, 1.4, 0.5, 64);
  }, [defaultShape]);

  let loadedNodes: any = null;
  try {
    if (glb) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { nodes } = useGLTF(glb);
      loadedNodes = nodes;
    }
  } catch (e) {
    loadedNodes = null;
  }

  const geometry = (geometryKey && loadedNodes?.[geometryKey]?.geometry) || fallbackGeometry;

  useEffect(() => {
    if (geometry) {
      geometry.computeBoundingBox();
      if (geometry.boundingBox) {
        geoWidthRef.current = geometry.boundingBox.max.x - geometry.boundingBox.min.x || 1;
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
      ref.current.scale.setScalar(Math.min(0.25, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    gl.setClearColor(0x0e0e11, 1);
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
        scale={scale ?? 0.25}
        rotation-x={Math.PI / 2}
        geometry={geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.25}
          thickness={thickness ?? 6}
          anisotropy={anisotropy ?? 0.02}
          chromaticAberration={chromaticAberration ?? 0.18}
          roughness={0}
          transmission={1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: { modeProps: Record<string, any>; [key: string]: any }) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      defaultShape="cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  );
}

function Cube({ modeProps, ...p }: { modeProps: Record<string, any>; [key: string]: any }) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      defaultShape="box"
      followPointer
      modeProps={modeProps}
      {...p}
    />
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
      geometryKey="Cube"
      defaultShape="box"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }: { items: { label: string; link: string }[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.035 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.035 }
  };

  const getDevice = () => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device as keyof typeof DEVICE];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);
  };

  const extraTextProps: any = {
    depthWrite: false,
    depthTest: false,
    renderOrder: 10
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          {...extraTextProps}
          onClick={e => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function FloatingObjects() {
  const torusRef = useRef<THREE.Mesh>(null!);
  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.5;
      torusRef.current.rotation.y += delta * 0.8;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 0.6;
      boxRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={torusRef} position={[-2, 0, 2]}>
          <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
          <meshStandardMaterial color="#6366f1" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh ref={boxRef} position={[2.2, 0.2, 3]}>
          <octahedronGeometry args={[1.1]} />
          <meshStandardMaterial color="#10b981" roughness={0.15} metalness={0.9} />
        </mesh>
      </Float>
    </group>
  );
}

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.22 },
    tablet: { fontSize: 0.38 },
    desktop: { fontSize: 0.52 }
  };

  const getDevice = () => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { fontSize } = DEVICE[device as keyof typeof DEVICE];

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={fontSize}
      letterSpacing={-0.03}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      MOHAMMED MUSAB
    </Text>
  );
}
