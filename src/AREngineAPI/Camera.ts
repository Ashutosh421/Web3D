import { mat4, vec3, vec4 } from "gl-matrix";
import { Scene } from "./Scene";
import { SceneObject } from "./SceneObject";
import { Util } from './Util';
export class Camera extends SceneObject {

    private viewMatrix: mat4;
    private projectionMatrix: mat4;

    private cameraForward: vec3;
    private cameraRight: vec3;
    private cameraUp: vec3;

    private lootAtPosition: vec3;
    

    constructor(scene3D: Scene) {
        super(scene3D);
        this.viewMatrix = mat4.create();
        this.projectionMatrix = mat4.create();

        this.cameraForward = vec3.create();
        this.cameraRight = vec3.create();
        this.cameraUp = vec3.create();
        this.lootAtPosition = vec3.create();

        this.transform.setPosition(vec3.fromValues(0 , 0 , -5));
        this.projectionMatrix = mat4.perspective(this.projectionMatrix, Util.DegreesToRadians(60),  this.scene3D.size.WIDTH / this.scene3D.size.HEIGHT , 0.0001, 1000);
    }

    onRender() {
        this.transform.onRender();

        this.cameraForward = vec3.subtract(this.cameraForward, this.transform.position, this.lootAtPosition);

        // Getting camera forward direction i.e., z for the camera
        this.cameraForward = vec3.normalize(this.cameraForward, this.cameraForward); 
        // Getting camera right direction i.e, x for the camera
        this.cameraRight = vec3.cross(this.cameraRight, this.cameraForward, vec3.fromValues(0 , 1 , 0));
        // Getting camera up direction i.e, y for camera
        this.cameraUp = vec3.cross(this.cameraUp, this.cameraRight, this.cameraForward);;

        // Generating a view matrix for camera looking at the origin
        this.viewMatrix = mat4.lookAt(this.viewMatrix, this.transform.position, this.transform.eulerAngles, vec3.fromValues(0 , 1 , 0));
    }

    onKeyPress(event: KeyboardEvent) {
        console.log("Key Press: ", event.key);
        const step = 0.1;
        if (event.key === 'w') {
            this.transform.translate(vec3.fromValues(0 , 0 , 1 * step));
        }
        else if (event.key === 'a') {
            this.transform.translate(vec3.fromValues(-1 * step, 0 , 0));
        }
        else if (event.key === 'd') {
            this.transform.translate(vec3.fromValues(1 * step , 0 , 0));
        }
        else if (event.key === 's') {
            this.transform.translate(vec3.fromValues(0 , 0 , -1 * step));
        }

        console.log("Position: ", this.transform.position);
    }

    public get ViewMatrix(): mat4 {
        return this.viewMatrix;
    }

    public get ProjectionMatrix(): mat4 {
        return this.projectionMatrix;
    }
}