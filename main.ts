import * as three from "three";
import * as memlSplat from "./splatWrapper.ts";
import {OrbitControls} from 'three-addons';
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import {PLYLoader} from 'three/examples/jsm/loaders/PLYLoader.js'
import { LumaSplatsThree } from '@lumaai/luma-web';
import { Compass } from "./splatHelpers.ts";
import { benchSplat, benchSplatRev, doorSplat } from "./scenes.ts";

let hasStarted = false;


// renderer and canvas
let renderer = new three.WebGLRenderer({
});
document.body.appendChild(renderer.domElement);
let canvas = renderer.getContext().canvas as HTMLCanvasElement;
renderer.setSize(window.innerWidth,window.innerHeight, false);

let vrButton = VRButton.createButton(renderer);
canvas.parentElement!.append(vrButton);

//scene init
setupInput();
let scene = new three.Scene();
let compass = new Compass();
//compass.AddToScene(scene);

const light = new three.PointLight();
light.position.set(0,0,0);
scene.add(light);

const mat = new three.MeshBasicMaterial({
    color:0xb2ff2c,
});


//camera init
let camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 5;

//controls init
let controls = new OrbitControls(camera,renderer.domElement);
controls.update();

//init splatQueue
let splatQueue = new memlSplat.SplatQueue(scene);

initSplats();

animate();

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

function setupInput()
{
    addEventListener("keypress",(e)=>{
        if(e.key == "1")
        {
            splatQueue.LoadSceneByIndex(0);
        }
        else if(e.key == "2")
        {
            splatQueue.LoadSceneByIndex(1);
        }
        else if(e.key =="3")
        {
            splatQueue.LoadSceneByIndex(2);
        }
        else if(e.key == "4")
        {
            splatQueue.LoadSceneByIndex(3);
        }
    });
}

function initSplats()
{


    //BENCH
    let splat_bench_reg = new memlSplat.Splat('https://lumalabs.ai/embed/f4e7305c-ac98-4b02-9a5d-36a4b6ca0750');
    let splat_bench_twist = new benchSplat('https://lumalabs.ai/embed/f4e7305c-ac98-4b02-9a5d-36a4b6ca0750');
    let splat_bench_rev = new benchSplatRev('https://lumalabs.ai/embed/f4e7305c-ac98-4b02-9a5d-36a4b6ca0750');
    splat_bench_reg.sceneTimer = 9999999999999;
    splat_bench_twist.sceneTimer = 9999999999999;
    splat_bench_rev.sceneTimer = 9999999999999999999;
    //splat_0.debugDrawBoundingBox = true;
    splat_bench_twist.SetShaderHooks();
    splat_bench_reg.SetShaderHooks();
    splat_bench_rev.SetShaderHooks();
    //add splats to queue
    splatQueue.AddSplatToQueue(splat_bench_reg);
    splatQueue.AddSplatToQueue(splat_bench_twist);
    splatQueue.AddSplatToQueue(splat_bench_rev);

    //Door
    /*
    let splat_door_reg = new memlSplat.Splat("https://lumalabs.ai/embed/f12d1582-4910-43aa-a70f-5ddfe6a65aff");
    let splat_door_twist = new doorSplat("https://lumalabs.ai/embed/f12d1582-4910-43aa-a70f-5ddfe6a65aff");
    splat_door_reg.sceneTimer = 9999999999999999999;
    splat_door_twist.sceneTimer = 9999999999999999999;
    splat_door_reg.SetShaderHooks();
    splat_door_twist.SetShaderHooks();
    splatQueue.AddSplatToQueue(splat_door_reg);
    splatQueue.AddSplatToQueue(splat_door_twist);
    */
}


