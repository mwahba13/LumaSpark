import * as three from "three";
import {OrbitControls} from 'three/addons';
import {VRButton} from "three/examples/jsm/webxr/VRButton.js";
import { LumaSplatsThree } from '@lumaai/luma-web';

//init renderer and add to doc
let renderer = new three.WebGLRenderer({antialias: false});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.xr.enabled = true;

document.body.appendChild(renderer.domElement);

const audioLoader = new three.AudioLoader();

//init VR Button
let vrButton = VRButton.createButton(renderer);
vrButton.addEventListener('click', function(){
    audioLoader.load('sounds/gadda.ogg',function(buffer){
        scene_1_bgm.setBuffer(buffer);
        scene_1_bgm.setLoop(true);
        scene_1_bgm.setVolume(0.5);
        scene_1_bgm.play();
    });
});
let canvas = renderer.getContext().canvas as HTMLCanvasElement;
canvas.parentElement!.append(vrButton);


//init camera
let camera = new three.PerspectiveCamera(75,1,0.1,1000);

const listener = new three.AudioListener();
camera.add(listener);
const scene_1_bgm = new three.Audio(listener);


//init controls
let controls = new OrbitControls(camera,renderer.domElement);


//setup scene 1
let uniformTime = new three.Uniform(0);
let scene_1 = new three.Scene();
let splat_1 = new LumaSplatsThree({
    source:'https://lumalabs.ai/capture/d80d4876-cf71-4b8a-8b5b-49ffac44cd4a',
    enableThreeShaderIntegration: true,
    onBeforeRender: () =>{
        uniformTime.value = performance.now()/ 1000;
    }
});

splat_1.position.x = 0;
splat_1.position.z = -1.5;
splat_1.position.y = 1;
splat_1.rotateX(-70);
splat_1.rotateZ(-20);

let k = 0.5;

splat_1.setShaderHooks({
    vertexShaderHooks:{
        additionalUniforms:{
            time_s:['float',uniformTime],
            k:['float',k],
        },

        getSplatTransform:
            `
            (vec3 position, uint layersBitmask) {
				// sin wave on x-axis
				float x = 0.;
				float z = cos(position.x * 1.0 + time_s) * 0.1;
				float y = sin(position.x * 1.0 + time_s) * 0.1;
				return mat4(
					1., 0., 0., 0,
					0., 1., 0., 0,
					0., 0., 1., 0,
					x,  y,  z, 1.
				);
			}
            `,
            getSplatColor:`
                (vec4 rgba, vec3 position, uint layersBitmask){
                    return rgba * vec4(abs(normalize(sin(position + time_s))),1.0);
                }
            `,


    }
});

scene_1.add(splat_1);

//setup scene 2
let scene_2 = new three.Scene();
let splat_2 = new LumaSplatsThree({
    source:'https://lumalabs.ai/capture/f5a8740e-a1f3-4486-96ac-900a912046ff'
});

let current_scene = scene_1;

renderer.setAnimationLoop(function(){
    renderer.render(current_scene,camera);
});

/*
function animate(){
    requestAnimationFrame(animate);

    let canvas = renderer.domElement;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    controls.update();

    renderer.render(current_scene,camera);
}
*/
//animate();