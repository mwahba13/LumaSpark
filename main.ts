import * as three from "three";
import * as memlSplat from "./splatWrapper.ts";
import {OrbitControls} from 'three-addons';
import { WebGLRenderer, PerspectiveCamera, Scene, Color, FogExp2, Uniform } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/addons/shaders/LuminosityShader.js';
import { DotScreenShader } from "three/examples/jsm/shaders/DotScreenShader.js";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader.js";
import { ColorifyShader } from "three/examples/jsm/shaders/ColorifyShader.js";
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import {PLYLoader} from 'three/examples/jsm/loaders/PLYLoader.js'
import { LumaSplatsThree } from '@lumaai/luma-web';
import { Compass } from "./splatHelpers.ts";
import { benchSplat, benchSplatRev, doorSplat } from "./scenes.ts";

let hasStarted = false;

// renderer and canvas
let renderer = new three.WebGLRenderer({});
//document.body.appendChild(renderer.domElement);
let canvas = renderer.getContext().canvas as HTMLCanvasElement;
renderer.setSize(window.innerWidth,window.innerHeight, false);
renderer.xr.enabled = true;

const audioLoader = new three.AudioLoader();

//init VR Button
let vrButton = VRButton.createButton(renderer);
document.body.appendChild(renderer.domElement);
//document.body.appendChild( VRButton.createButton( renderer ) );
vrButton.addEventListener('click', function(){
    audioLoader.load('sounds/gadda.ogg',function(buffer){
        //scene_1_bgm.setBuffer(buffer);
        //scene_1_bgm.setLoop(true);
        //scene_1_bgm.setVolume(0.5);
        //scene_1_bgm.play();
    });
});
canvas.parentElement!.append(vrButton);

//scene init
//setupInput();
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

const listener = new three.AudioListener();
camera.add(listener);
const scene_1_bgm = new three.Audio(listener);

//controls init
let controls = new OrbitControls(camera,renderer.domElement);
controls.update();

//POST PROCESSING EFFECTS
const composer = new EffectComposer( renderer );
const renderPass = new RenderPass(scene, camera);
const dotEffect = new ShaderPass(DotScreenShader);
dotEffect.uniforms["scale"].value = 5;
const luminosityEffect = new ShaderPass(LuminosityShader);
const colorify = new ShaderPass(ColorifyShader);
colorify.uniforms["color"].value.setRGB(0,1,1);
const sobelEffect = new ShaderPass(SobelOperatorShader);
sobelEffect.uniforms["resolution"].value.x = window.innerWidth * window.devicePixelRatio;
sobelEffect.uniforms["resolution"].value.y = window.innerHeight * window.devicePixelRatio;

composer.addPass(renderPass);
composer.addPass(luminosityEffect);
//composer.addPass(colorify);
//composer.addPass(dotEffect);
composer.addPass(sobelEffect);

scene.fog = new FogExp2(new Color(0xe0e1ff).convertLinearToSRGB(), 0.20);
scene.background = scene.fog.color;

//init splatQueue
let splatQueue = new memlSplat.SplatQueue(scene);

initSplats();

animate();

function animate(){
    requestAnimationFrame(animate);
    // renderer.setAnimationLoop( function () {

    //     renderer.render( scene, camera );
    
    // } );

    splatQueue.Tick();
    controls.update();

    render();
}

function render()
{
    renderer.render(scene,camera);
    composer.render();
}

// function setupInput()
// {
//     addEventListener("keypress",(e)=>{
//         if(e.key == "1")
//         {
//             splatQueue.LoadSceneByIndex(0);
//         }
//         else if(e.key == "2")
//         {
//             splatQueue.LoadSceneByIndex(1);
//         }
//         else if(e.key =="3")
//         {
//             splatQueue.LoadSceneByIndex(2);
//         }
//         else if(e.key == "4")
//         {
//             splatQueue.LoadSceneByIndex(3);
//         }
//     });
// }

function initSplats()
{
    // //Griffith Capture 1
    let splat_griffith1 = new memlSplat.Splat('https://lumalabs.ai/capture/3d4121a2-7503-457a-9d29-9fc68216fbd9');
    splatQueue.AddSplatToQueue(splat_griffith1);

    // // GRIFFITH CELL 1
    // let splat_griffithCell1 = new memlSplat.Splat('https://lumalabs.ai/capture/5bc39413-0235-474a-8686-1e4df062751c');
    // splatQueue.AddSplatToQueue(splat_griffithCell1);
    
    // //DEVIL
    // let splat_griffithDevil_reg = new memlSplat.Splat('https://lumalabs.ai/capture/ff561ab6-0539-4dbb-bd86-01f31c79371d');
    // splatQueue.AddSplatToQueue(splat_griffithDevil_reg);
    // splat_griffithDevil_reg.sceneTimer = 10;

    // //DOOR
    // let splat_door_reg = new memlSplat.Splat("https://lumalabs.ai/embed/f12d1582-4910-43aa-a70f-5ddfe6a65aff");
    // splatQueue.AddSplatToQueue(splat_door_reg);
    // //splat_door_reg.sceneTimer = 10;

    // //GRFFITH BLACK WATER CAGE
    // let splat_blackWaterCage_reg = new memlSplat.Splat('https://lumalabs.ai/capture/40990996-46d7-4133-a14c-3145b8994d57');
    // splatQueue.AddSplatToQueue(splat_blackWaterCage_reg);

    // //BENCH
    // let splat_bench_reg = new memlSplat.Splat('https://lumalabs.ai/embed/f4e7305c-ac98-4b02-9a5d-36a4b6ca0750');
    // let splat_bench_twist = new benchSplat('https://lumalabs.ai/embed/f4e7305c-ac98-4b02-9a5d-36a4b6ca0750');
    // let splat_bench_rev = new benchSplatRev('https://lumalabs.ai/embed/f4e7305c-ac98-4b02-9a5d-36a4b6ca0750');
    // splat_bench_reg.sceneTimer = 10;
    // splat_bench_twist.sceneTimer = 10;
    // splat_bench_rev.sceneTimer = 10;
    // //splat_0.debugDrawBoundingBox = true;
    // splat_bench_twist.SetShaderHooks();
    // splat_bench_reg.SetShaderHooks();
    // splat_bench_rev.SetShaderHooks();
    // //add splats to queue
    // splatQueue.AddSplatToQueue(splat_bench_reg);
    // splatQueue.AddSplatToQueue(splat_bench_twist);
    // splatQueue.AddSplatToQueue(splat_bench_rev);

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


