import { Clock, MathUtils, Uniform, } from 'three';
import { Splat } from './Splat';

export class Scene7 extends Splat
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
                        float x = cos(pos.x*1.0 + time)*z;
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

    //float y = cos(pos.x*1.0 + time)*z;
    //float z = sin(pos.x*1.0 + time)*z;
    protected override OnTick(clock:Clock): void {
        const lerpInterval = 60000.;
        //const lerpInterval = 1200000.;
        let t = clock.elapsedTime/lerpInterval;
        this.x,this.z = MathUtils.lerp(0,500,t);
    }

    public override StartScene(): void {
        console.log("start bench scene");
        
    }

    public override EndScene(): void {
        console.log("end bench scene");

    }
    
}

export class Scene8 extends Splat
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
                    colAdj:['float',new Uniform(-0.1)]
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj,rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
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
        //let timer = clock.elapsedTime;
        const lerpInterval = 12.;
        let t = clock.elapsedTime/lerpInterval;
        t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(.5,.0,t);

    }


    
}

export class Scene9 extends Splat
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
                    colAdj:['float',new Uniform(-0.1)]
                    
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj, rgba.y, rgba.z-colAdj, rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
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
        //let timer = clock.elapsedTime;
        const lerpInterval = 20.;
        let t = clock.elapsedTime/lerpInterval;
        //t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(0,15,t);

    }

}

export class Scene10 extends Splat
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
                    colAdj:['float',new Uniform(-0.1)]
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj, rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
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

    //float y = cos(pos.x*1.0 + time)*z;
    //float z = sin(pos.x*1.0 + time)*z;
    protected override OnTick(clock:Clock): void {
        const lerpInterval = 9.;
        let t = clock.elapsedTime/lerpInterval;
        t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(5,0,t);
    }

    // public override StartScene(): void {
    //     console.log("start bench scene");
        
    // }

    // public override EndScene(): void {
    //     console.log("end bench scene");

    // }
    
}

export class Scene10_Part2 extends Splat
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
                    colAdj:['float',new Uniform(-0.1)]

                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj, rgba.w));

                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
                        float y = cos(pos.x*1.0 + time)*z;
                        float z = sin(pos.x*1.0 + time)*z;
                        return mat4(
                            1., 0., 0., 0.,
                            0.,1.,0.,0.,
                            0.,0.,1.,0.,
                            x, y, z, 1.                         
                        );
                    }
                `,
            }
        })
    }

    //float y = cos(pos.x*1.0 + time)*z;
    //float z = sin(pos.x*1.0 + time)*z;
    protected override OnTick(clock:Clock): void {
        const lerpInterval = 6.;
        let t = clock.elapsedTime/lerpInterval;
        //t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(0,1,t);
    }

    // public override StartScene(): void {
    //     console.log("start bench scene");
        
    // }

    // public override EndScene(): void {
    //     console.log("end bench scene");

    // }
    
}

export class Scene11 extends Splat
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
                    colAdj:['float',new Uniform(-0.1)],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj,rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
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

    //float y = cos(pos.x*1.0 + time)*z;
    //float z = sin(pos.x*1.0 + time)*z;
    protected override OnTick(clock:Clock): void {
        const lerpInterval = 2;
        let t = clock.elapsedTime/lerpInterval;
        t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(2,0,t);
    }

    // public override StartScene(): void {
    //     console.log("start bench scene");
        
    // }

    // public override EndScene(): void {
    //     console.log("end bench scene");

    // }
    
}

export class Scene11_Part2 extends Splat
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
                    colAdj:['float',new Uniform(-0.1)],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj,rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
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
        const lerpInterval = 100.;
        let t = clock.elapsedTime/lerpInterval;
        //t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(0,10,t);
    }


    
}

export class Scene12 extends Splat
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
                    colAdj:['float',new Uniform(-0.1)],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj,rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
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

    //float y = cos(pos.x*1.0 + time)*z;
    //float z = sin(pos.x*1.0 + time)*z;
    protected override OnTick(clock:Clock): void {
        const lerpInterval = 2.5;
        let t = clock.elapsedTime/lerpInterval;
        t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(5,0,t);
    }

    // public override StartScene(): void {
    //     console.log("start bench scene");
        
    // }

    // public override EndScene(): void {
    //     console.log("end bench scene");

    // }
    
}

export class Scene12_Part2 extends Splat
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
                    colAdj:['float',new Uniform(-0.1)],
                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj,rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = time *z;
                        float y = time *z;
                        float z = time *z;
                        return mat4(
                            x,y,z,0.,
                            0.,1.,0.,0.,
                            0.,0.,1.,0.,
                            x, y, z, 1.                         
                        );
                    }
                `,
            }
        })
    }

    //float y = cos(pos.x*1.0 + time)*z;
    //float z = sin(pos.x*1.0 + time)*z;
    protected override OnTick(clock:Clock): void {
        const lerpInterval = 2.;
        let t = clock.elapsedTime/lerpInterval;
        //t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(0,1,t);
    }

    // public override StartScene(): void {
    //     console.log("start bench scene");
        
    // }

    // public override EndScene(): void {
    //     console.log("end bench scene");

    // }
    
}

export class Scene13 extends Splat
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
                    colAdj:['float',new Uniform(-0.2)],

                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj,rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
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
        const lerpInterval = 1;
        let t = clock.elapsedTime/lerpInterval;
        t = MathUtils.clamp(t,0,1);
        this.x,this.z = MathUtils.lerp(100,0,t);
    }

    
}

export class Scene14 extends Splat{
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
                    colAdj:['float',new Uniform(-0.4)],

                },
                getSplatColor:`
                    (vec4 rgba, vec3 pos, uint layersBitmask){
                        if(pos.x < minX || pos.y < minY  || pos.z < minZ  || pos.x > maxX || pos.y > maxY || pos.z > maxZ)
                            return (vec4(rgba.x+colAdj,rgba.y,rgba.z-colAdj,rgba.w));
                    }
                `,
                getSplatTransform:`
                    (vec3 pos, uint layersBitMask)
                    {
                        float x = cos(pos.x*1.0 + time)*z;
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
    