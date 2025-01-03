import * as three from "three";
import * as memlSplat from "./src/Splat.ts";
import { SplatQueue } from "./src/SplatQueue.ts";
import {OrbitControls} from 'three-addons';
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import { Scene7, Scene8, Scene9, Scene10, Scene10_Part2, Scene11, Scene11_Part2, Scene12, Scene13, Scene12_Part2, Scene14 } from "./src/Scenes.ts";

let hasStarted = false;

// renderer and canvas
let renderer = new three.WebGLRenderer({});
//document.body.appendChild(renderer.domElement);
let canvas = renderer.getContext().canvas as HTMLCanvasElement;
renderer.setSize(window.innerWidth,window.innerHeight, false);
renderer.xr.enabled = true;

const audioLoader = new three.AudioLoader();


//scene init
//setupInput();
let scene = new three.Scene();

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

//controls init
let controls = new OrbitControls(camera,renderer.domElement);
controls.update();

//init splatQueue
let splatQueue = new SplatQueue(scene);
splatQueue.camera = camera;

document.body.appendChild(renderer.domElement);

//init VR Button
//let vrButton = VRButton.createButton(renderer);

audioLoader.load("/sounds/SorenNarration_Take1_Edited.mp3",
    function(buffer){
        scene_1_bgm.setBuffer(buffer);
        scene_1_bgm.setLoop(false);
        scene_1_bgm.setVolume(0.75);
        scene_1_bgm.play();
    },
    undefined,
    (err) =>{
        console.error("Audio loading error: ", err);
    }
);

splatQueue.hasStarted = true;
initSplats();

function animate(){
    renderer.render( scene, camera );
    splatQueue.Tick();
    controls.update();
}
renderer.setAnimationLoop(animate);

function initSplats()
{


    //Scene 1
    let scene1 = new memlSplat.Splat('https://lumalabs.ai/capture/eb4eee92-6c6c-455b-bf5a-faa4afcf5988');
    scene1.SetFogObj(new three.Color("skyblue"),.0);
    scene1.SetBackgroundColor(new three.Color("black"));
    scene1.SetPosition(1.5,-1,1.5);
    scene1.SetRotation(-13,179.33,-12.7);
    scene1.sceneTimer = 13;
    scene1.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene1);

    //Scene 2
    let scene2 = new memlSplat.Splat('https://lumalabs.ai/capture/17d326ca-0e6e-43eb-a443-14b8031e1dc6');
    scene2.SetFogObj(new three.Color("skyblue"),.0);
    scene2.SetBackgroundColor(new three.Color("skyblue"));
    scene2.SetPosition(0,1,2);
    scene2.SetRotation(0,-90,0);
    scene2.sceneTimer = 20; 
    scene2.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene2);

    //Scene 3
    let scene3 = new memlSplat.Splat('https://lumalabs.ai/capture/33221f86-9518-4cee-88e0-ec995f5d1ffa');
    scene3.SetFogObj(new three.Color("skyblue"),.03);
    scene3.SetBackgroundColor(new three.Color("skyblue"));
    scene3.SetPosition(0,0,2);
    scene3.SetRotation(0,90,.1);
    scene3.sceneTimer = 13;  
    scene3.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene3);

    //Scene 4
    let scene4 = new memlSplat.Splat('https://lumalabs.ai/capture/bb48e561-4c22-47a0-960b-2932f524d97c');
    scene4.SetFogObj(new three.Color("darkgrey"),.175);
    scene4.SetBackgroundColor(new three.Color("darkgrey"));
    scene4.SetPosition(-1.5,.35,3);
    scene4.SetRotation(0,179,0);
    scene4.sceneTimer = 16; 
    scene4.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene4);

    //Scene 5
    let scene5 = new memlSplat.Splat('https://lumalabs.ai/capture/3d4121a2-7503-457a-9d29-9fc68216fbd9');
    scene5.SetFogObj(new three.Color("white"),.1);
    scene5.SetBackgroundColor(new three.Color("white"));
    scene5.SetPosition(-2.5,0,0);
    scene5.SetRotation(0,-70.2,0);
    scene5.sceneTimer = 9; 
    scene5.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene5);

    //Scene 6
    let scene6 = new memlSplat.Splat('https://lumalabs.ai/capture/21d28749-4a37-48d6-b4b3-e4097f2ee0dc');
    scene6.SetFogObj(new three.Color("white"),.05);
    scene6.SetBackgroundColor(new three.Color("white"));
    scene6.SetPosition(0,0,4);
    scene6.SetRotation(0,-69.5,0);
    scene6.sceneTimer = 8; 
    scene6.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene6);

    //Scene 7
    let scene7 = new Scene7('https://lumalabs.ai/capture/a3bef4db-a196-4e22-8a1c-5ed42730d6af');
    scene7.SetFogObj(new three.Color("white"),.05);
    scene7.SetBackgroundColor(new three.Color("white"));
    scene7.SetPosition(1,0,2);
    scene7.SetRotation(0,-95,0);
    scene7.sceneTimer = 12; 
    scene7.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene7);

    //Scene 8
    let scene8 = new Scene8('https://lumalabs.ai/capture/c6807892-34a1-4a6d-90c6-ef6a917d7843');
    scene8.SetFogObj(new three.Color("skyblue"),.0);
    scene8.SetBackgroundColor(new three.Color("white"));
    scene8.SetPosition(0,.2,2.5);
    scene8.SetRotation(0,-90,0);
    scene8.sceneTimer = 18; 
    scene8.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene8);

    //Scene 9
    let scene9 = new Scene9('https://lumalabs.ai/capture/c6807892-34a1-4a6d-90c6-ef6a917d7843');
    scene9.SetFogObj(new three.Color("skyblue"),.0);
    scene9.SetBackgroundColor(new three.Color("black"));
    scene9.SetPosition(0,0,0);
    scene9.SetRotation(0,-90,0);
    scene9.sceneTimer = 12.5;
    scene9.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene9);

    //Scene 10
    let scene10 = new Scene10('https://lumalabs.ai/capture/3fd4bb7a-ccbd-4395-935b-9522745a43f3');
    // let scene10 = new memlSplat.Splat('https://lumalabs.ai/capture/40990996-46d7-4133-a14c-3145b8994d57');
    scene10.SetFogObj(new three.Color("black"),.0);
    scene10.SetBackgroundColor(new three.Color("black"));
    scene10.SetPosition(0,-.5,2);
    scene10.SetRotation(0,179.2,0);
    scene10.sceneTimer = 12.5;
    scene10.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene10);

    //Scene 10 part 2
    let scene10_p2 = new Scene10_Part2('https://lumalabs.ai/capture/3fd4bb7a-ccbd-4395-935b-9522745a43f3');
    // let scene10 = new memlSplat.Splat('https://lumalabs.ai/capture/40990996-46d7-4133-a14c-3145b8994d57');
    scene10_p2.SetFogObj(new three.Color("black"),.0);
    scene10_p2.SetBackgroundColor(new three.Color("black"));
    scene10_p2.SetPosition(0,-.5,2);
    scene10_p2.SetRotation(0,179.2,0);
    scene10_p2.sceneTimer = 4;
    scene10_p2.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene10_p2);

    //Scene 11
    let scene11 = new Scene11('https://lumalabs.ai/capture/d67a6bf8-3fa5-43eb-b22c-4068e66e8a7b');
    scene11.SetFogObj(new three.Color("black"),.0);
    scene11.SetBackgroundColor(new three.Color("black"));
    scene11.SetPosition(-1,-1,2);
    scene11.SetRotation(0,89.8,0);
    scene11.sceneTimer = 12.5;
    scene11.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene11);

    //Scene 11 part 2
    let scene11_p2 = new Scene11_Part2('https://lumalabs.ai/capture/d67a6bf8-3fa5-43eb-b22c-4068e66e8a7b');
    scene11_p2.SetFogObj(new three.Color("black"),0);
    scene11_p2.SetBackgroundColor(new three.Color("black"));
    scene11_p2.SetPosition(-1,-1,2);
    scene11_p2.SetRotation(0,89.8,0);
    scene11_p2.sceneTimer = 14;
    scene11_p2.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene11_p2);

    //Scene 12
    let scene12 = new Scene12('https://lumalabs.ai/capture/ff561ab6-0539-4dbb-bd86-01f31c79371d');
    scene12.SetFogObj(new three.Color("black"),.0);
    scene12.SetBackgroundColor(new three.Color("black"));
    scene12.SetPosition(1.5,0,3);
    scene12.SetRotation(0,-89.8,0);
    scene12.sceneTimer = 14.5;
    scene12.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene12);

    //Scene 12 part 2
    let scene12_p2 = new Scene12_Part2('https://lumalabs.ai/capture/ff561ab6-0539-4dbb-bd86-01f31c79371d');
    scene12_p2.SetFogObj(new three.Color("black"),.0);
    scene12_p2.SetBackgroundColor(new three.Color("black"));
    scene12_p2.SetPosition(1.5,0,3);
    scene12_p2.SetRotation(0,-89.8,0);
    scene12_p2.sceneTimer = 2;
    scene12_p2.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene12_p2);

    //Scene 13
    let scene13 = new Scene13('https://lumalabs.ai/capture/5bc39413-0235-474a-8686-1e4df062751c');
    //let scene13timer = elapsedTime;
    scene13.SetFogObj(new three.Color("black"),.12);
    scene13.SetBackgroundColor(new three.Color("black"));
    scene13.SetPosition(0,0,0);
    scene13.SetRotation(0,-89.4,0);
    scene13.sceneTimer = 32;
    scene13.SetShaderHooks();
    splatQueue.AddSplatToQueue(scene13);

    // //Scene 14
    // let scene14 = new Scene14('https://lumalabs.ai/capture/5bc39413-0235-474a-8686-1e4df062751c');
    // //let scene13timer = elapsedTime;
    // scene14.SetFogObj(new three.Color("black"),1);
    // scene14.SetBackgroundColor(new three.Color("black"));
    // scene14.SetPosition(0,0,0);
    // scene14.SetRotation(0,0,0);
    // scene14.sceneTimer = 1;
    // scene14.SetShaderHooks();
    // splatQueue.AddSplatToQueue(scene14);

}


