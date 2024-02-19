import { LumaSplatsThree } from '@lumaai/luma-web';
import { Box3, BoxGeometry, Mesh, MeshBasicMaterial, SphereGeometry, Uniform, Vector3, Vector4 } from 'three';

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
    boundingBox:Box3
    debugDrawBoundingBox: boolean;

    //scene
    scene:THREE.Scene;

    constructor(uri:string, pos:Vector3 = new Vector3(0,0,0), rot:Vector3 = new Vector3(0,0,0))
    {
        this.uri = uri;
        this.position = pos;
        this.rotation = rot;
        this.lumaSplat = new LumaSplatsThree({
            source:uri
        });
        this.boundingBox = new Box3;

    }

    public AddToScene(scene:THREE.Scene)
    {
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

    public SetShaderHooks()
    {

        this.lumaSplat.setShaderHooks({
            vertexShaderHooks:{
                additionalUniforms:{
                    minX:['float',new Uniform(this.boundingBox.min.x)],
                    maxX:['float',new Uniform(this.boundingBox.max.x)],
                    minY:['float',new Uniform(this.boundingBox.min.y)],
                    maxY:['float',new Uniform(this.boundingBox.max.y)],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.x > maxX || pos.y < minY || pos.y > maxY)
                        {
                            return vec4(0.,0.,0.,0.);
                        }
                        return rgba;
                    }
                `
            }
        })
    }

    
}


class SplatQueue {
    currentSceneIndex: number;
    splats: Splat[];

}

