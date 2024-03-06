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
splat_0.sceneTimer = 5
//set a splats bounding box before setting shader hooks
splat_0.boundingBox.set(new three.Vector3(-2,-2,-2),new three.Vector3(5,5,5));
splat_0.debugDrawBoundingBox = true;
splat_0.SetShaderHooks();

//add actions
splat_0.EnqueueSplatAction(new memlSplat.DebugAction(),2);

//splat 2 init
let splat_1 = new memlSplat.Splat("https://lumalabs.ai/capture/de9b3594-54f4-42e9-ab24-7dcb9a9c9a3d");
splat_1.sceneTimer = 12;
splat_1.SetShaderHooks();

splat_1.EnqueueSplatAction(new memlSplat.DebugAction(), 5);
splat_1.EnqueueSplatAction(new memlSplat.DebugAction(), 10);

//init splatQueue
let splatQueue = new memlSplat.SplatQueue(scene);

//add splats to queue
splatQueue.AddSplatToQueue(splat_0);
splatQueue.AddSplatToQueue(splat_1);


function animate(){
    requestAnimationFrame(animate);

    splatQueue.Tick();
    controls.update();

    render();
}

function render()
{
    renderer.render(scene,camera);
}

animate();
