import { LumaSplatsThree } from '@lumaai/luma-web';
import { Box3, BoxGeometry, Clock, Mesh, MeshBasicMaterial, SphereGeometry, Uniform, Vector3, Vector4 } from 'three';

//basic splat - can be cropped and transformed
export class Splat{
    //luma
    uri:string;
    lumaSplat:LumaSplatsThree;

    //transform
    position:Vector3;
    rotation:Vector3;
    rgba:Vector4;
    
    //box
    boundingBox:Box3;
    debugDrawBoundingBox: boolean;

    //scene
    scene:THREE.Scene;

    //timing
    sceneTimer:number;

    //actions
    splatActions:SplatAction[];
    splatActionIndex:number;

    constructor(uri:string, pos:Vector3 = new Vector3(0,0,0), rot:Vector3 = new Vector3(0,0,0))
    {
        this.uri = uri;
        this.position = pos;
        this.rotation = rot;
        this.lumaSplat = new LumaSplatsThree({
            source:uri
        });
        this.boundingBox = new Box3;
        this.sceneTimer = 0;

        this.splatActions = [];
        this.splatActionIndex = 0;
    }

    public EnqueueSplatAction(action:SplatAction, time:number)
    {
        action.actionTime = time;
        this.splatActions.push(action);
    }

    public AddToScene(scene:THREE.Scene)
    {
        console.log("flag 2");
        this.scene = scene;

        if(this.debugDrawBoundingBox)
        {
            //minSphere - red
            const minGeom = new SphereGeometry(.1);
            const minMat = new MeshBasicMaterial({color:0xf54242 });
            const minSphere = new Mesh(minGeom,minMat);

            //max Sphere - green
            const maxGeom = new SphereGeometry(.1);
            const maxMat = new MeshBasicMaterial({color:0x72f542 });
            const maxSphere = new Mesh(maxGeom,maxMat);

            let localMin = this.lumaSplat.worldToLocal(this.boundingBox.min);
            let localMax = this.lumaSplat.worldToLocal(this.boundingBox.max);


            minSphere.position.set(localMin.x,localMin.y,localMin.z);
            maxSphere.position.set(localMax.x,localMax.y,localMax.z);

            scene.add(minSphere);
            scene.add(maxSphere);
        }

        scene.add(this.lumaSplat);
    }

    public RemoveFromScene()
    {
        this.scene.remove(this.lumaSplat);
    }

    public SetShaderHooks()
    {

        this.lumaSplat.setShaderHooks({
            vertexShaderHooks:{
                additionalUniforms:{
                    minX:['float',new Uniform(this.boundingBox.min.x)],
                    maxX:['float',new Uniform(this.boundingBox.max.x)],
                    minY:['float',new Uniform(this.boundingBox.min.y)],
                    maxY:['float',new Uniform(this.boundingBox.max.y)],
                    minZ:['float',new Uniform(this.boundingBox.min.z)],
                    maxZ:['float',new Uniform(this.boundingBox.max.z)],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                        {
                            return rgba;
                        }
                        vec4(0.,0.,0.,0.);
                    }
                `
            }
        })
    }

    public StartScene()
    {

    }

    public Tick(clock:Clock)
    {
        //if we havent hit the end of the splat action queue
        if(this.splatActionIndex != -1)
        {
            let currentAction = this.splatActions[this.splatActionIndex];

            if(clock.elapsedTime >= currentAction.actionTime)
            {
                //hit time to execute action
                console.log("execute action at: " + clock.getElapsedTime());
                this.splatActions[this.splatActionIndex].executeAction();
    
                //increment index
                this.splatActionIndex++;
                if(this.splatActions.length == this.splatActionIndex)
                {
                    console.log("End of Queue at time: " + clock.elapsedTime)
                    this.splatActionIndex = -1;
                }
    
            }
        }


    }
}


export class SplatQueue {

    //scene properties
    currentScene : THREE.Scene;

    //splat properties
    currentSplat: Splat;
    currentSplatIndex: number;
    splats: Splat[];

    //time properties
    sequenceLength: number;
    timer:THREE.Clock;

    isFinished: boolean;

    constructor(scene:THREE.Scene)
    {
        this.currentSplatIndex = 0  ;
        this.timer = new Clock();
        this.timer.stop();
        this.sequenceLength = -1;
        this.splats = [];
        this.currentScene = scene;
        this.isFinished = false;
    }

    public AddSplatToQueue(splat:Splat)
    {
        if(this.splats.length == 0)
        {
            this.currentSplat = splat;
            this.currentSplat.AddToScene(this.currentScene);
            this.sequenceLength = splat.sceneTimer;
            
        }

        this.splats.push(splat);

    }

    public Tick()
    {
        //check if time is up
        if(!this.isFinished)
        {
            this.LoadNextSplat();

            this.currentSplat.Tick(this.timer);
    
        }
        
    }

    private LoadNextSplat()
    {
        if(this.timer.getElapsedTime() == 0)
        {
            this.timer.start();
        }
        //if time is up, load next splat
        if(this.timer.getElapsedTime() > this.sequenceLength)
        {
            this.currentSplatIndex++;
            if(this.currentSplatIndex > this.splats.length)
            {
                //we hit the end
                this.isFinished = true;
                this.timer.stop();
            }
            else
            {
                //remove old scene
                this.currentSplat.RemoveFromScene();

                //add new scene
                this.currentSplat = this.splats[this.currentSplatIndex];


                this.currentSplat.AddToScene(this.currentScene);

                this.currentSplat.StartScene();
                this.sequenceLength = this.currentSplat.sceneTimer;

                this.timer.start();
                //transition to next scene
            }
        }
    }

}

abstract class SplatAction {

    actionTime:number = 0;

    public abstract executeAction(): void;

    constructor()
    {
        this.actionTime = 0;
    }
}

export class DebugAction extends SplatAction{

    public executeAction(): void {
        console.log("action executed");
    }
}