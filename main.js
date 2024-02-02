import * as three from "three";
import { LumaSplatsThree } from "@lumaai/luma-web";
import {OrbitControls} from 'three/addons'

//init renderer and add to doc
let renderer = new three.WebGLRenderer({antialias: false});
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);



//init camera
let camera = new three.PerspectiveCamera(75,1,0.1,1000);
camera.position.z = 2;

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


splat_1.setShaderHooks({
    vertexShaderHooks:{
        additionalUniforms:{
            time_s:['float',uniformTime],
        },
        getSplatTransform:`
        (vec3 position, uint layersBitmask) {
            // sin wave on x-axis
            float x = 0.;
            float z = 0.;
            float y = sin(position.x * 1.0 + time_s) * 0.1;
            return mat4(
                1., 0., 0., 0,
                0., 1., 0., 0,
                0., 0., 1., 0,
                x,  y,  z, 1.
            );
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
scene_2.add(splat_2);

let current_scene = scene_1;

document.addEventListener("keypress", function(e){
    if(e.code == "Digit1")
    {
        current_scene = scene_2;
    }
});

function animate(){
    requestAnimationFrame(animate);

    let canvas = renderer.domElement;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    if(canvas.width !== width || canvas.height !== height){
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
        renderer.setSize(width,height,false);
    }

    controls.update();

    renderer.render(current_scene,camera);
}

animate();