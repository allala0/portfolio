import React, {useEffect, useRef} from "react";
import * as THREE from 'three';
import ThreeEngine from 'three-engine';
import Transition from 'three-engine/tools/transitions/Transition';
import TransitionObject from 'three-engine/tools/transitions/TransitionObject';
import transitionFunctions from 'three-engine/tools/transitions/transitionFunctions';

function Scene(){
    let threeEngine;
    let transition = null;
    let colorTransition = null;

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

                    box.onHover = () => colorTransition = new Transition(new TransitionObject(box.material, 'color', {1: new THREE.Color(0x00ff00)}), {autoplay: true, duration: 0.25});
                    box.onHoverEnd = () => colorTransition = new Transition(new TransitionObject(box.material, 'color', {1: new THREE.Color(0xff0000)}), {autoplay: true, duration: 0.25});
                    
                    box.onClick = () => transition = new Transition([
                        new TransitionObject(box, 'scale', {0: new THREE.Vector3(1, 1, 1), 0.5: new THREE.Vector3(1.5, 1.5, 1.5), 1: new THREE.Vector3(1, 1, 1)}),
                        new TransitionObject(box, 'position', {0: new THREE.Vector3(), 0.5: new THREE.Vector3(0, 0.2, 0), 1: new THREE.Vector3()}),
                        new TransitionObject(box.rotation, 'y', {0: 0, 0.5: Math.PI / 2, 1: -Math.PI}),
                    ], {autoplay: true, function: transitionFunctions.easeInOutCubic, duration: 1});
                    threeEngine.scene.add(box);
                },
                update: threeEngine => {
                    if(transition) transition.update();
                    if(colorTransition) colorTransition.update();
                }
            }
        });
    }, []);

    return (
        <div className='scene' ref={ref}></div>
    );
}

export default Scene;
