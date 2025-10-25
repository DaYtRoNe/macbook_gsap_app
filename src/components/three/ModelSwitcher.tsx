import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import MacBookModel16 from "../models/Macbook-16";
import MacBookModel14 from "../models/Macbook-14";
import { useGSAP } from "@gsap/react";

interface ModelSwitcherProps {
    scale: number;
    isMobile: boolean;
}

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: THREE.Group | null, opacity: number) => {
    if (!group) return;

    group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
                const material = mesh.material as THREE.MeshStandardMaterial;
                material.transparent = true;
                gsap.to(material, { opacity, duration: ANIMATION_DURATION })
            }
        }
    })

}

const moveGroup = (group: THREE.Group | null, x: number) => {
    if (!group) return;

    gsap.to(group.position, {
        x,
        duration: ANIMATION_DURATION,
        // ease: "power2.inOut"
    })
}

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;

    const smallMacBookRef = useRef<THREE.Group>(null);
    const largeMacBookRef = useRef<THREE.Group>(null);

    const showLargeMacBook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    useGSAP(() => {
        if (showLargeMacBook) {
            moveGroup(smallMacBookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacBookRef.current, 0);

            fadeMeshes(smallMacBookRef.current, 0);
            fadeMeshes(largeMacBookRef.current, 1);
        } else {
            moveGroup(smallMacBookRef.current, 0);
            moveGroup(largeMacBookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacBookRef.current, 1);
            fadeMeshes(largeMacBookRef.current, 0);
        }
    }, [scale]);

    const controlsConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        azimuth: [-Infinity, Infinity] as [number, number],
        config: { mass: 1, tension: 0, friction: 26 }
    }

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacBookRef}>
                    <MacBookModel16 scale={isMobile ? 0.05 : 0.08} />
                </group>
            </PresentationControls>

            <PresentationControls {...controlsConfig}>
                <group ref={smallMacBookRef}>
                    <MacBookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    )
}

export default ModelSwitcher