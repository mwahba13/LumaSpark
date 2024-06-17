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
import { Scene7, Scene8, Scene9, Scene10, Scene10_Part2, Scene11, Scene11_Part2, Scene12, Scene13, Scene12_Part2 } from "./scenes.ts";

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
// vrButton.addEventListener('click', function(){
//     const scene_1_bgm = new three.Audio(listener);
//     audioLoader.load('sounds/SorenNarration_Take1_Edited.mp3',function(buffer){
//         scene_1_bgm.setBuffer(buffer);
//         scene_1_bgm.setLoop(true);
//         scene_1_bgm.setVolume(0.5);
//         scene_1_bgm.play();
//     });
// });
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

//const listener = new three.AudioListener();
const listener = new three.AudioListener();
const scene_1_bgm = new three.Audio(listener);
camera.add(listener);
audioLoader.load('sounds/SorenNarration_Take1_Edited.mp3',function(buffer){
    scene_1_bgm.setBuffer(buffer);
    scene_1_bgm.setLoop(false);
    scene_1_bgm.setVolume(0.5);
    scene_1_bgm.play();
});
//const scene_1_bgm = new three.Audio(listener);

//controls init
let controls = new OrbitControls(camera,renderer.domElement);
controls.update();

// //POST PROCESSING EFFECTS
// const composer = new EffectComposer( renderer );
// const renderPass = new RenderPass(scene, camera);
// const dotEffect = new ShaderPass(DotScreenShader);
// dotEffect.uniforms["scale"].value = 5;
// const luminosityEffect = new ShaderPass(LuminosityShader);
// const colorify = new ShaderPass(ColorifyShader);
// colorify.uniforms["color"].value.setRGB(0,1,1);
// const sobelEffect = new ShaderPass(SobelOperatorShader);
// sobelEffect.uniforms["resolution"].value.x = window.innerWidth * window.devicePixelRatio;
// sobelEffect.uniforms["resolution"].value.y = window.innerHeight * window.devicePixelRatio;

// composer.addPass(renderPass);
// composer.addPass(luminosityEffect);
// //composer.addPass(colorify);
// //composer.addPass(dotEffect);
// composer.addPass(sobelEffect);

//scene.fog = new FogExp2(new Color(0xe0e1ff).convertLinearToSRGB(), 0.20);
//scene.background = scene.fog.color;

//init splatQueue
let splatQueue = new memlSplat.SplatQueue(scene);

initSplats();

animate();

function animate(){
    //requestAnimationFrame(animate);
     renderer.setAnimationLoop( function () {

         renderer.render( scene, camera );
         splatQueue.Tick();
         //composer.render();
         //controls.update();
     } );



    //render();
}

function render()
{
    renderer.render(scene,camera);
    //composer.render();
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
    // Scene 1
    let scene1 = new memlSplat.Splat('https://lumalabs.ai/capture/eb4eee92-6c6c-455b-bf5a-faa4afcf5988');
    scene1.SetFogObj(new three.Color("skyblue"),.0);
    scene1.SetBackgroundColor(new three.Color("black"));
    scene1.SetPosition(1,-1,0);
    scene1.SetRotation(10,20,3);
    scene1.sceneTimer = 13.5;
    scene1.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene1);

    //Scene 2
    let scene2 = new memlSplat.Splat('https://lumalabs.ai/capture/17d326ca-0e6e-43eb-a443-14b8031e1dc6');
    scene2.SetFogObj(new three.Color("skyblue"),.0);
    scene2.SetBackgroundColor(new three.Color("skyblue"));
    scene2.SetPosition(0,0,3);
    scene2.SetRotation(10,20,3);
    scene2.sceneTimer = 20; 
    scene2.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene2);

    //Scene 3
    let scene3 = new memlSplat.Splat('https://lumalabs.ai/capture/33221f86-9518-4cee-88e0-ec995f5d1ffa');
    scene3.SetFogObj(new three.Color("skyblue"),.03);
    scene3.SetBackgroundColor(new three.Color("skyblue"));
    scene3.SetPosition(0,0,3);
    scene3.SetRotation(10,20,3);
    scene3.sceneTimer = 13;  
    scene3.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene3);

    //Scene 4
    let scene4 = new memlSplat.Splat('https://lumalabs.ai/capture/bb48e561-4c22-47a0-960b-2932f524d97c');
    scene4.SetFogObj(new three.Color("darkgrey"),.15);
    scene4.SetBackgroundColor(new three.Color("darkgrey"));
    scene4.SetPosition(0,0,3);
    scene4.SetRotation(10,20,3);
    scene4.sceneTimer = 16; //71
    scene4.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene4);

    //Scene 5
    let scene5 = new memlSplat.Splat('https://lumalabs.ai/capture/3d4121a2-7503-457a-9d29-9fc68216fbd9');
    scene5.SetFogObj(new three.Color("white"),.1);
    scene5.SetBackgroundColor(new three.Color("white"));
    scene5.SetPosition(0,0,3);
    scene5.SetRotation(10,20,3);
    scene5.sceneTimer = 9; //78
    scene5.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene5);

    //Scene 6
    let scene6 = new memlSplat.Splat('https://lumalabs.ai/capture/21d28749-4a37-48d6-b4b3-e4097f2ee0dc');
    scene6.SetFogObj(new three.Color("white"),.05);
    scene6.SetBackgroundColor(new three.Color("white"));
    scene6.SetPosition(0,0,3);
    scene6.SetRotation(10,20,3);
    scene6.sceneTimer = 8; //86
    scene6.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene6);

    //Scene 7
    let scene7 = new Scene7('https://lumalabs.ai/capture/a3bef4db-a196-4e22-8a1c-5ed42730d6af');
    scene7.SetFogObj(new three.Color("white"),.05);
    scene7.SetBackgroundColor(new three.Color("white"));
    scene7.SetPosition(0,0,3);
    scene7.SetRotation(10,20,3);
    scene7.sceneTimer = 12; //100
    scene7.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene7);

    //Scene 8
    let scene8 = new Scene8('https://lumalabs.ai/capture/c6807892-34a1-4a6d-90c6-ef6a917d7843');
    scene8.SetFogObj(new three.Color("skyblue"),.0);
    scene8.SetBackgroundColor(new three.Color("white"));
    scene8.SetPosition(0,0,3);
    scene8.SetRotation(10,20,3);
    scene8.sceneTimer = 18; //118
    scene8.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene8);

    //Scene 9
    let scene9 = new Scene9('https://lumalabs.ai/capture/c6807892-34a1-4a6d-90c6-ef6a917d7843');
    scene9.SetFogObj(new three.Color("skyblue"),.0);
    scene9.SetBackgroundColor(new three.Color("black"));
    scene9.SetPosition(0,0,3);
    scene9.SetRotation(10,20,3);
    scene9.sceneTimer = 12.5;
    scene9.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene9);

    //Scene 10
    let scene10 = new Scene10('https://lumalabs.ai/capture/3fd4bb7a-ccbd-4395-935b-9522745a43f3');
    // let scene10 = new memlSplat.Splat('https://lumalabs.ai/capture/40990996-46d7-4133-a14c-3145b8994d57');
    scene10.SetFogObj(new three.Color("black"),.0);
    scene10.SetBackgroundColor(new three.Color("black"));
    scene10.SetPosition(0,0,3);
    scene10.SetRotation(10,20,3);
    scene10.sceneTimer = 12.5;
    scene10.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene10);

    //Scene 10 part 2
    let scene10_p2 = new Scene10_Part2('https://lumalabs.ai/capture/3fd4bb7a-ccbd-4395-935b-9522745a43f3');
    // let scene10 = new memlSplat.Splat('https://lumalabs.ai/capture/40990996-46d7-4133-a14c-3145b8994d57');
    scene10_p2.SetFogObj(new three.Color("black"),.0);
    scene10_p2.SetBackgroundColor(new three.Color("black"));
    scene10_p2.SetPosition(0,0,3);
    scene10_p2.SetRotation(10,20,3);
    scene10_p2.sceneTimer = 4;
    scene10_p2.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene10_p2);

    //Scene 11
    let scene11 = new Scene11('https://lumalabs.ai/capture/d67a6bf8-3fa5-43eb-b22c-4068e66e8a7b');
    scene11.SetFogObj(new three.Color("black"),.0);
    scene11.SetBackgroundColor(new three.Color("black"));
    scene11.SetPosition(0,0,3);
    scene11.SetRotation(10,20,3);
    scene11.sceneTimer = 11.5;
    scene11.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene11);

    //Scene 11 part 2
    let scene11_p2 = new Scene11_Part2('https://lumalabs.ai/capture/d67a6bf8-3fa5-43eb-b22c-4068e66e8a7b');
    scene11_p2.SetFogObj(new three.Color("black"),.5);
    scene11_p2.SetBackgroundColor(new three.Color("black"));
    scene11_p2.SetPosition(0,0,3);
    scene11_p2.SetRotation(10,20,3);
    scene11_p2.sceneTimer = 17;
    scene11_p2.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene11_p2);

    //Scene 12
    let scene12 = new Scene12('https://lumalabs.ai/capture/ff561ab6-0539-4dbb-bd86-01f31c79371d');
    scene12.SetFogObj(new three.Color("black"),.0);
    scene12.SetBackgroundColor(new three.Color("black"));
    scene12.SetPosition(0,0,3);
    scene12.SetRotation(10,20,3);
    scene12.sceneTimer = 12.5;
    scene12.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene12);

    //Scene 12 part 2
    let scene12_p2 = new Scene12_Part2('https://lumalabs.ai/capture/ff561ab6-0539-4dbb-bd86-01f31c79371d');
    scene12_p2.SetFogObj(new three.Color("black"),.0);
    scene12_p2.SetBackgroundColor(new three.Color("black"));
    scene12_p2.SetPosition(0,0,3);
    scene12_p2.SetRotation(10,20,3);
    scene12_p2.sceneTimer = 2;
    scene12_p2.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene12_p2);

    //Scene 13
    let scene13 = new Scene13('https://lumalabs.ai/capture/5bc39413-0235-474a-8686-1e4df062751c');
    //let scene13timer = elapsedTime;
    scene13.SetFogObj(new three.Color("black"),.12);
    scene13.SetBackgroundColor(new three.Color("black"));
    scene13.SetPosition(0,0,3);
    scene13.SetRotation(10,20,3);
    scene13.sceneTimer = 32;
    scene13.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene13);

    //Scene 14
    let scene14 = new memlSplat.Splat('https://lumalabs.ai/capture/5bc39413-0235-474a-8686-1e4df062751c');
    //let scene13timer = elapsedTime;
    scene14.SetFogObj(new three.Color("black"),1);
    scene14.SetBackgroundColor(new three.Color("black"));
    scene14.SetPosition(0,0,3);
    scene14.SetRotation(10,20,3);
    scene14.sceneTimer = 120;
    scene14.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene14);

    // // // GRIFFITH CELL 1
    // let griffithCell = new memlSplat.Splat('https://lumalabs.ai/capture/5bc39413-0235-474a-8686-1e4df062751c');
    // splatQueue.AddSplatToQueue(griffithCell);
    
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


