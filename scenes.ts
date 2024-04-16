import { LumaSplatsThree } from '@lumaai/luma-web';
import { Box3, BoxGeometry, Clock, MathUtils, Mesh, MeshBasicMaterial, SphereGeometry, Uniform, Vector3, Vector4 } from 'three';
import { Splat } from './splatWrapper';

export class benchSplat extends Splat
{
    public override SetShaderHooks(): void {
        this.lumaSplat.setShaderHooks({
            vertexShaderHooks:{
                additionalUniforms:{
                    minX:['float',new Uniform(this.boundingBox.min.x)],
                    maxX:['float',new Uniform(this.boundingBox.max.x)],
                    minY:['float',new Uniform(this.boundingBox.min.y)],
                    maxY:['float',new Uniform(this.boundingBox.max.y)],
                    minZ:['float',new Uniform(this.boundingBox.min.z)],
                    maxZ:['float',new Uniform(this.boundingBox.max.z)],
                    opacity:['float',this.opacityUni],
                    time:['float',this.time],
                    x:['float',this.xUni],
                    y:['float',this.yUni],
                    z:['float',this.zUni],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return rgba;
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = 0.;
                        float y = cos(pos.x*1.0 + time)*z;
                        float z = sin(pos.x*1.0 + time)*z;
                        return mat4(
                            1.,0.,0.,0.,
                            0.,1.,0.,0.,
                            0.,0.,1.,0.,
                            x, y, z, 1.                         
                        );
                    }
                `,
            }
        })
    }

    protected override OnTick(clock:Clock): void {
        const lerpInterval = 1200000.;
        let t = clock.elapsedTime/lerpInterval;
        this.x,this.z = MathUtils.lerp(0,500000,t);
    }
    
}
export class benchSplatRev extends Splat
{
    public override SetShaderHooks(): void {
        this.lumaSplat.setShaderHooks({
            vertexShaderHooks:{
                additionalUniforms:{
                    minX:['float',new Uniform(this.boundingBox.min.x)],
                    maxX:['float',new Uniform(this.boundingBox.max.x)],
                    minY:['float',new Uniform(this.boundingBox.min.y)],
                    maxY:['float',new Uniform(this.boundingBox.max.y)],
                    minZ:['float',new Uniform(this.boundingBox.min.z)],
                    maxZ:['float',new Uniform(this.boundingBox.max.z)],
                    opacity:['float',this.opacityUni],
                    time:['float',this.time],
                    x:['float',this.xUni],
                    y:['float',this.yUni],
                    z:['float',this.zUni],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return rgba;
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = 0.;
                        float y = cos(pos.x*1.0 + time)*z;
                        float z = sin(pos.x*1.0 + time)*z;
                        return mat4(
                            1.,0.,0.,0.,
                            0.,1.,0.,0.,
                            0.,0.,1.,0.,
                            x, y, z, 1.                         
                        );
                    }
                `,
            }
        })
    }

    protected override OnTick(clock:Clock): void {
        const lerpInterval = 6.;
        let t = clock.elapsedTime/lerpInterval;
        
        t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(500,0,t);
        


    }
    
}

export class doorSplat extends Splat{

    public override SetShaderHooks(): void {
        this.lumaSplat.setShaderHooks({
            vertexShaderHooks:{
                additionalUniforms:{
                    minX:['float',new Uniform(this.boundingBox.min.x)],
                    maxX:['float',new Uniform(this.boundingBox.max.x)],
                    minY:['float',new Uniform(this.boundingBox.min.y)],
                    maxY:['float',new Uniform(this.boundingBox.max.y)],
                    minZ:['float',new Uniform(this.boundingBox.min.z)],
                    maxZ:['float',new Uniform(this.boundingBox.max.z)],
                    opacity:['float',this.opacityUni],
                    time:['float',this.time],
                    x:['float',this.xUni],
                    y:['float',this.yUni],
                    z:['float',this.zUni],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return rgba;
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = 0.;
                        float y = cos(pos.x*1.0 + time)*z;
                        float z = sin(pos.x*1.0 + time)*z;
                        return mat4(
                            1.,0.,0.,0.,
                            0.,1.,0.,0.,
                            0.,0.,1.,0.,
                            x, y, z, 1.                         
                        );
                    }
                `,
            }
        }) 
    }
}

export class sinkSplat extends Splat{

    public override SetShaderHooks(): void {
        
    }
}