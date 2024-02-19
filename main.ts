import * as three from "three";
import * as memlSplat from "./splatWrapper.ts";
import {OrbitControls} from 'three-addons';
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import { LumaSplatsThree } from '@lumaai/luma-web';
import { Compass } from "./splatHelpers.ts";

// renderer and canvas
let renderer = new three.WebGLRenderer({
});
document.body.appendChild(renderer.domElement);
let canvas = renderer.getContext().canvas as HTMLCanvasElement;
renderer.setSize(window.innerWidth,window.innerHeight, false);

//scene init
let scene = new three.Scene();

//camera init
let camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 5;

//controls init
let controls = new OrbitControls(camera,renderer.domElement);
controls.update();

//splat 1 init
let splat_0 = new memlSplat.Splat('https://lumalabs.ai/capture/d80d4876-cf71-4b8a-8b5b-49ffac44cd4a');
//set a splats bounding box before setting shader hooks
splat_0.boundingBox.set(new three.Vector3(-4,-4,-4),new three.Vector3(5,5,5));
//splat_0.debugDrawBoundingBox = true;
splat_0.SetShaderHooks();
//last step
splat_0.AddToScene(scene);

//compass
let comp = new Compass();
comp.AddToScene(scene);

function animate(){
    requestAnimationFrame(animate);

    controls.update();

    render();
}

function render()
{
    renderer.render(scene,camera);
}

animate();
