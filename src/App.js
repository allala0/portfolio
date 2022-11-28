import React, {useEffect, useRef} from "react";
import * as THREE from 'three';
import ThreeEngine from './lib/three-engine/ThreeEngine';

function App(){
    let threeEngine;

    const ref = useRef(null);
    
    useEffect(() => {
        threeEngine = new ThreeEngine({
            setup:{
                domContainer: ref.current,
                enableAntialias: true,
                enableAlpha: true,
                enableTestLights: true,
                enableControls: true,
                // enableOrbitControlsZoomToCursor: true,
                DEV_MODE: true
            },
            callbacks: {
                initLoaded: threeEngine => {
                    const box = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshStandardMaterial({color: 0xff0000}));
                    box.setupClickable();
                    threeEngine.scene.add(box);
                }
            }
        });
    }, []);

    return (
        <div style={{height: '1000px'}} ref={ref}></div>
    );
}

export default App;
