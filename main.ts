import * as three from "three";
import {OrbitControls} from 'three-addons';
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import { LumaSplatsThree } from '@lumaai/luma-web';


let renderer = new three.WebGLRenderer({
});
document.body.appendChild(renderer.domElement);

let canvas = renderer.getContext().canvas as HTMLCanvasElement;

renderer.setSize(window.innerWidth,window.innerHeight, false);

let scene = new three.Scene();

let camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 2;

let controls = new OrbitControls(camera,canvas);

let splat = new LumaSplatsThree({
    source:'https://lumalabs.ai/capture/d80d4876-cf71-4b8a-8b5b-49ffac44cd4a'
});

let splat_1 = new LumaSplatsThree({
    source:'https://lumalabs.ai/capture/8aa4d0ca-f40b-4167-a6e9-5f8ac4f41d26'
})

scene.add(splat);
scene.add(splat_1);

renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene,camera);
})