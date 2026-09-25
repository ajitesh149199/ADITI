import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import {
    Crosshair,
    Rotate3D,
    ScanEye
} from "lucide-react";

import {
    Canvas
} from "@react-three/fiber";

import {
    Billboard,
    Grid,
    Html,
    OrbitControls,
    Text
} from "@react-three/drei";

import * as THREE from "three";

import PanelHeader from "./ui/PanelHeader";
import { getCurrentScenario } from "../services/api";
import "./CameraView3D.css";


const CYAN = "#62efff";
const CYAN_DIM = "#1d7f8d";
const DARK = "#071218";
const WHITE = "#dffcff";


function directionToX(direction) {

    const normalized =
        String(direction || "ahead").toLowerCase();

    if (normalized.includes("left")) {
        return -1;
    }

    if (normalized.includes("right")) {
        return 1;
    }

    return 0;
}


function objectVisualType(name) {

    const value =
        String(name || "").toLowerCase();

    if (value.includes("person")) return "person";
    if (value.includes("bicycle")) return "bicycle";
    if (value.includes("tree")) return "tree";
    if (value.includes("door")) return "doorway";
    if (value.includes("bottle")) return "bottle";
    if (value.includes("sign")) return "sign";
    if (value.includes("chair")) return "chair";
    if (value.includes("table")) return "table";

    return "generic";
}


function SolidMaterial({
    color = CYAN,
    opacity = 0.72,
    emissive = CYAN_DIM,
    emissiveIntensity = 0.32,
    metalness = 0.25,
    roughness = 0.55
}) {

    return (
        <meshStandardMaterial
            color={color}
            transparent
            opacity={opacity}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
            metalness={metalness}
            roughness={roughness}
        />
    );
}


function BoxPart({
    position,
    scale,
    rotation = [0, 0, 0],
    color = CYAN,
    opacity = 0.72
}) {

    return (
        <mesh
            position={position}
            rotation={rotation}
            castShadow
            receiveShadow
        >
            <boxGeometry args={scale} />
            <SolidMaterial
                color={color}
                opacity={opacity}
            />
        </mesh>
    );
}


function CylinderPart({
    position,
    args,
    rotation = [0, 0, 0],
    color = CYAN,
    opacity = 0.72
}) {

    return (
        <mesh
            position={position}
            rotation={rotation}
            castShadow
            receiveShadow
        >
            <cylinderGeometry args={args} />
            <SolidMaterial
                color={color}
                opacity={opacity}
            />
        </mesh>
    );
}


function Person3D() {

    return (
        <group>

            <mesh position={[0, 2.25, 0]}>
                <sphereGeometry args={[0.32, 24, 24]} />
                <SolidMaterial />
            </mesh>

            <mesh position={[0, 1.35, 0]}>
                <capsuleGeometry args={[0.38, 1.05, 8, 16]} />
                <SolidMaterial />
            </mesh>

            <CylinderPart
                position={[-0.55, 1.35, 0]}
                args={[0.11, 0.11, 1.25, 12]}
                rotation={[0, 0, -0.18]}
            />

            <CylinderPart
                position={[0.55, 1.35, 0]}
                args={[0.11, 0.11, 1.25, 12]}
                rotation={[0, 0, 0.18]}
            />

            <CylinderPart
                position={[-0.22, 0.12, 0]}
                args={[0.13, 0.14, 1.55, 12]}
                rotation={[0, 0, -0.04]}
            />

            <CylinderPart
                position={[0.22, 0.12, 0]}
                args={[0.13, 0.14, 1.55, 12]}
                rotation={[0, 0, 0.04]}
            />

        </group>
    );
}


function Tree3D() {

    return (
        <group>

            <CylinderPart
                position={[0, 1.1, 0]}
                args={[0.26, 0.38, 2.2, 14]}
                color="#3cb7c4"
            />

            <mesh position={[0, 2.65, 0]}>
                <sphereGeometry args={[1.05, 20, 18]} />
                <SolidMaterial
                    color="#48d6c5"
                    opacity={0.64}
                />
            </mesh>

            <mesh position={[-0.55, 2.45, 0.15]}>
                <sphereGeometry args={[0.72, 18, 16]} />
                <SolidMaterial
                    color="#48d6c5"
                    opacity={0.58}
                />
            </mesh>

            <mesh position={[0.58, 2.45, -0.08]}>
                <sphereGeometry args={[0.76, 18, 16]} />
                <SolidMaterial
                    color="#48d6c5"
                    opacity={0.58}
                />
            </mesh>

        </group>
    );
}


function Bottle3D() {

    return (
        <group>

            <CylinderPart
                position={[0, 0.72, 0]}
                args={[0.34, 0.4, 1.35, 24]}
            />

            <CylinderPart
                position={[0, 1.56, 0]}
                args={[0.18, 0.26, 0.38, 24]}
            />

            <CylinderPart
                position={[0, 1.83, 0]}
                args={[0.19, 0.19, 0.16, 24]}
                color="#b9f9ff"
            />

        </group>
    );
}


function Chair3D() {

    const legPositions = [
        [-0.62, 0.45, -0.55],
        [0.62, 0.45, -0.55],
        [-0.62, 0.45, 0.55],
        [0.62, 0.45, 0.55]
    ];

    return (
        <group>

            <BoxPart
                position={[0, 1.15, 0]}
                scale={[1.55, 0.18, 1.35]}
            />

            {
                legPositions.map(
                    (position, index) => (
                        <BoxPart
                            key={index}
                            position={position}
                            scale={[0.16, 1.05, 0.16]}
                        />
                    )
                )
            }

            <BoxPart
                position={[0, 2.05, 0.58]}
                scale={[1.55, 1.65, 0.18]}
            />

            <BoxPart
                position={[-0.62, 1.65, 0.57]}
                scale={[0.16, 1.25, 0.16]}
            />

            <BoxPart
                position={[0.62, 1.65, 0.57]}
                scale={[0.16, 1.25, 0.16]}
            />

        </group>
    );
}


function Table3D() {

    const legPositions = [
        [-0.95, 0.72, -0.65],
        [0.95, 0.72, -0.65],
        [-0.95, 0.72, 0.65],
        [0.95, 0.72, 0.65]
    ];

    return (
        <group>

            <BoxPart
                position={[0, 1.55, 0]}
                scale={[2.35, 0.22, 1.65]}
            />

            {
                legPositions.map(
                    (position, index) => (
                        <BoxPart
                            key={index}
                            position={position}
                            scale={[0.18, 1.45, 0.18]}
                        />
                    )
                )
            }

        </group>
    );
}


function Doorway3D() {

    return (
        <group>

            <BoxPart
                position={[-1.0, 1.65, 0]}
                scale={[0.22, 3.3, 0.48]}
            />

            <BoxPart
                position={[1.0, 1.65, 0]}
                scale={[0.22, 3.3, 0.48]}
            />

            <BoxPart
                position={[0, 3.2, 0]}
                scale={[2.2, 0.22, 0.48]}
            />

            <BoxPart
                position={[0.55, 1.55, 0.08]}
                scale={[0.82, 2.8, 0.18]}
                opacity={0.28}
            />

            <mesh position={[0.23, 1.55, 0.23]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <SolidMaterial color="#d8ffff" />
            </mesh>

        </group>
    );
}


function Sign3D({ text }) {

    return (
        <group>

            <BoxPart
                position={[0, 2.15, 0]}
                scale={[2.6, 1.15, 0.18]}
            />

            <BoxPart
                position={[0, 0.95, 0]}
                scale={[0.18, 1.85, 0.18]}
            />

            <Text
                position={[0, 2.15, 0.105]}
                fontSize={0.25}
                color={WHITE}
                anchorX="center"
                anchorY="middle"
                maxWidth={2.25}
            >
                {text || "SIGN"}
            </Text>

        </group>
    );
}


function Bicycle3D() {

    const wheelMaterial = (
        <meshStandardMaterial
            color={CYAN}
            emissive={CYAN_DIM}
            emissiveIntensity={0.4}
            metalness={0.4}
            roughness={0.45}
        />
    );

    return (
        <group rotation={[0, 0, 0]}>

            <mesh
                position={[-0.82, 0.72, 0]}
                rotation={[0, 0, 0]}
            >
                <torusGeometry
                    args={[0.58, 0.075, 12, 32]}
                />
                {wheelMaterial}
            </mesh>

            <mesh
                position={[0.82, 0.72, 0]}
                rotation={[0, 0, 0]}
            >
                <torusGeometry
                    args={[0.58, 0.075, 12, 32]}
                />
                {wheelMaterial}
            </mesh>

            <CylinderPart
                position={[0, 0.98, 0]}
                args={[0.07, 0.07, 1.35, 10]}
                rotation={[0, 0, Math.PI / 2]}
            />

            <CylinderPart
                position={[-0.25, 1.13, 0]}
                args={[0.07, 0.07, 1.0, 10]}
                rotation={[0, 0, -0.75]}
            />

            <CylinderPart
                position={[0.27, 1.15, 0]}
                args={[0.07, 0.07, 1.0, 10]}
                rotation={[0, 0, 0.72]}
            />

            <CylinderPart
                position={[0.52, 1.28, 0]}
                args={[0.06, 0.06, 1.1, 10]}
                rotation={[0, 0, 0.18]}
            />

            <BoxPart
                position={[-0.25, 1.55, 0]}
                scale={[0.5, 0.11, 0.25]}
            />

            <BoxPart
                position={[0.62, 1.72, 0]}
                scale={[0.72, 0.08, 0.08]}
                rotation={[0, 0, -0.1]}
            />

        </group>
    );
}


function Generic3D() {

    return (
        <group>
            <BoxPart
                position={[0, 1, 0]}
                scale={[1.3, 2, 1.3]}
                opacity={0.55}
            />
        </group>
    );
}


function ObjectGeometry({
    type,
    detectedText
}) {

    switch (type) {

        case "person":
            return <Person3D />;

        case "bicycle":
            return <Bicycle3D />;

        case "tree":
            return <Tree3D />;

        case "doorway":
            return <Doorway3D />;

        case "bottle":
            return <Bottle3D />;

        case "sign":
            return (
                <Sign3D
                    text={detectedText}
                />
            );

        case "chair":
            return <Chair3D />;

        case "table":
            return <Table3D />;

        default:
            return <Generic3D />;
    }
}


function DetectionLabel({ item }) {

    const confidence =
        Number(item?.confidence ?? 0);

    const distance =
        Number(item?.distance ?? 0);

    return (
        <Billboard
            position={[0, 3.65, 0]}
            follow
            lockX={false}
            lockY={false}
            lockZ={false}
        >

            <Html
                center
                transform
                distanceFactor={9}
            >
                <div className="three-detection-label">

                    <strong>
                        {String(
                            item?.object || "unknown"
                        ).toUpperCase()}
                    </strong>

                    <span>
                        {distance.toFixed(1)} m
                        {" • "}
                        {item?.direction || "ahead"}
                    </span>

                    <span>
                        CONF{" "}
                        {(confidence * 100).toFixed(0)}%
                    </span>

                </div>
            </Html>

        </Billboard>
    );
}


function DetectionVolume({
    item,
    detectedText
}) {

    const type =
        objectVisualType(item?.object);

    const distance =
        Number(item?.distance ?? 4);

    const xDirection =
        directionToX(item?.direction);

    /*
       World-space mapping:
       x: left / ahead / right
       z: negative = farther into the monitored scene

       Distance is compressed so the full scenario remains
       visible while preserving relative depth.
    */
    const x =
        xDirection *
        Math.min(
            3.0 + distance * 0.35,
            5.2
        );

    const z =
        -Math.min(
            2.8 + distance * 0.72,
            8.6
        );

    const scale =
        type === "tree"
            ? 0.8
            : type === "bottle"
                ? 0.85
                : type === "bicycle"
                    ? 0.9
                    : 0.82;

    return (
        <group
            position={[x, 0, z]}
            scale={scale}
        >

            <ObjectGeometry
                type={type}
                detectedText={detectedText}
            />

            <DetectionLabel
                item={item}
            />

        </group>
    );
}


function Scene3D({
    visualObjects,
    detectedText,
    controlsRef
}) {

    return (
        <>

            <color
                attach="background"
                args={["#020b10"]}
            />

            <fog
                attach="fog"
                args={["#020b10", 9, 24]}
            />

            <ambientLight
                intensity={0.55}
            />

            <directionalLight
                position={[4, 8, 5]}
                intensity={1.25}
                color="#bffaff"
                castShadow
            />

            <pointLight
                position={[-5, 3, 1]}
                intensity={13}
                distance={14}
                color="#00d9ff"
            />

            <pointLight
                position={[5, 2, -5]}
                intensity={8}
                distance={13}
                color="#b84dff"
            />

            <Grid
                position={[0, -0.08, -3.5]}
                args={[24, 24]}
                cellSize={0.75}
                cellThickness={0.55}
                cellColor="#15505b"
                sectionSize={3}
                sectionThickness={0.85}
                sectionColor="#2a8a99"
                fadeDistance={19}
                fadeStrength={1.5}
                infiniteGrid
            />

            {
                visualObjects.map(
                    (item, index) => (
                        <DetectionVolume
                            key={
                                `${item.object}-${index}`
                            }
                            item={item}
                            detectedText={
                                detectedText
                            }
                        />
                    )
                )
            }

            <OrbitControls
    ref={controlsRef}
    makeDefault

    /* Smooth camera movement */
    enableDamping={true}
    dampingFactor={0.08}

    /* Enable all useful camera controls */
    enableRotate={true}
    enableZoom={true}
    enablePan={true}

    /* Rotation */
    rotateSpeed={0.8}

    /* Zoom */
    zoomSpeed={0.8}
    minDistance={3.5}
    maxDistance={22}

    /* Vertical rotation limit only */
    minPolarAngle={0.15}
    maxPolarAngle={Math.PI - 0.15}

    /* IMPORTANT:
       No minAzimuthAngle / maxAzimuthAngle.
       Therefore horizontal rotation is unrestricted.
    */

    target={[0, 1.25, -3.4]}
/>

        </>
    );
}


function CameraView({ results }) {

    const [scenarioData, setScenarioData] =
        useState(null);

    const [scenarioError, setScenarioError] =
        useState(null);

    const controlsRef =
        useRef(null);


    useEffect(() => {

        let active = true;

        async function loadScenario() {

            try {

                const data =
                    await getCurrentScenario();

                if (active) {
                    setScenarioData(data);
                    setScenarioError(null);
                }

            } catch (error) {

                if (active) {
                    setScenarioError(
                        error.message
                    );
                }
            }
        }

        loadScenario();

        return () => {
            active = false;
        };

    }, [results]);


    const scenario =
        scenarioData?.scenario || null;

    const scenarioKey =
        scenarioData?.scenario_key ||
        "unknown";

    const camera =
        scenario?.camera || {};

    const objects =
        Array.isArray(camera?.objects)
            ? camera.objects
            : [];

    const fusedResults =
        Array.isArray(results)
            ? results
            : [];


    const fusedByObject =
        useMemo(() => {

            const map = new Map();

            fusedResults.forEach((item) => {

                const key =
                    String(
                        item?.object || ""
                    ).toLowerCase();

                if (
                    key &&
                    !map.has(key)
                ) {
                    map.set(
                        key,
                        item
                    );
                }
            });

            return map;

        }, [fusedResults]);


    const visualObjects =
        objects.map((item) => {

            const fused =
                fusedByObject.get(
                    String(
                        item?.object || ""
                    ).toLowerCase()
                );

            return {
                ...item,
                risk_level:
                    fused?.risk_level,
                trust_score:
                    fused?.trust_score
            };
        });


    const resetView = () => {

        if (!controlsRef.current) {
            return;
        }

        controlsRef.current.reset();
    };


    return (
        <div className="panel camera-panel aditi-vision-panel">

            <PanelHeader
                icon={ScanEye}
                title="Camera / Vision — True 3D Monitor"
                subtitle="Interactive volumetric scenario perception"
                status="Live"
                statusType="live"
                accent="cyan"
            />

            <div className="vision-meta-row">

                <div>
                    <span>SCENARIO</span>

                    <strong>
                        {
                            scenario?.name ||
                            "Loading..."
                        }
                    </strong>
                </div>

                <div>
                    <span>OBJECTIVE</span>

                    <strong>
                        {
                            scenario?.objective ||
                            "—"
                        }
                    </strong>
                </div>

                <div>
                    <span>FRAME</span>

                    <strong>
                        {
                            camera?.frame_id ??
                            "—"
                        }
                    </strong>
                </div>

                <button
                    type="button"
                    className="vision-reset-button"
                    onClick={resetView}
                >
                    <Rotate3D size={16} />
                    Reset View
                </button>

            </div>

            <div className="true-3d-viewport">

                <Canvas
                    shadows
                    dpr={[1, 1.7]}
                    camera={{
                        position: [0, 4.2, 9.5],
                        fov: 48,
                        near: 0.1,
                        far: 100
                    }}
                    gl={{
                        antialias: true,
                        toneMapping:
                            THREE.ACESFilmicToneMapping
                    }}
                >

                    <Scene3D
                        visualObjects={
                            visualObjects
                        }
                        detectedText={
                            camera?.detected_text
                        }
                        controlsRef={
                            controlsRef
                        }
                    />

                </Canvas>

                <div className="vision-top-hud">

                    <span>
                        <span className="live-dot" />
                        ADITI OPTICAL MONITOR
                    </span>

                    <span>
                        {
                            scenarioKey.toUpperCase()
                        }
                    </span>

                </div>

                <div className="vision-reticle">
                    <Crosshair size={38} />
                </div>

                <div className="vision-side-hud left">

                    <span>
                        HEADING
                    </span>

                    <strong>
                        {
                            scenario
                                ?.imu
                                ?.heading ??
                            "—"
                        }°
                    </strong>

                    <small>
                        {
                            scenario
                                ?.imu
                                ?.movement ||
                            "unknown"
                        }
                    </small>

                </div>

                <div className="vision-side-hud right">

                    <span>
                        TRACKED
                    </span>

                    <strong>
                        {
                            visualObjects.length
                        }
                    </strong>

                    <small>
                        OBJECTS
                    </small>

                </div>

                <div className="vision-bottom-hud">

                    <span>
                        DRAG TO ORBIT • SCROLL TO ZOOM
                    </span>

                    <span>
                        TRUE 3D DEPTH MONITORING
                    </span>

                </div>

                {
                    camera?.detected_text && (
                        <div className="ocr-hud">

                            <span>
                                OCR DETECTED
                            </span>

                            <strong>
                                “{
                                    camera.detected_text
                                }”
                            </strong>

                        </div>
                    )
                }

                {
                    scenarioError && (
                        <div className="vision-error">
                            {scenarioError}
                        </div>
                    )
                }

                {
                    !scenarioError &&
                    !scenario &&
                    (
                        <div className="vision-loading">
                            Initializing true 3D vision...
                        </div>
                    )
                }

            </div>

            <div className="vision-control-note">
                <Rotate3D size={15} />
                Drag inside the monitor to orbit around the
                scene. Use the mouse wheel to inspect depth.
            </div>

            <div className="vision-object-strip">

                {
                    visualObjects.length > 0
                        ? visualObjects.map(
                            (item, index) => (
                                <div
                                    className="vision-object-chip"
                                    key={
                                        `chip-${item.object}-${index}`
                                    }
                                >

                                    <strong>
                                        {item.object}
                                    </strong>

                                    <span>
                                        {item.distance} m
                                        {" • "}
                                        {item.direction}
                                    </span>

                                    {
                                        item.trust_score != null &&
                                        (
                                            <span>
                                                Trust{" "}
                                                {
                                                    item.trust_score
                                                }
                                            </span>
                                        )
                                    }

                                </div>
                            )
                        )
                        : (
                            <span className="vision-no-objects">
                                No camera objects in the current scenario.
                            </span>
                        )
                }

            </div>

        </div>
    );
}

export default CameraView;
