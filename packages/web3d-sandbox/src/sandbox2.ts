import { vec2, vec3, vec4 } from 'gl-matrix';
import { Cubemap, SceneManager, Model, Mesh, DirectionalLight, Camera, Time, Scene, Web3D, PrimitiveType, Primitive, Input, KeyCode, MouseButton, Shader, ShaderType, Shaders, CubemapTexture } from 'web3d-core';

// 3D Models
import CottageMesh from './Mesh/Cottage_v2.obj';

try {
    if (Web3D.init()) {
        const scene: Scene = SceneManager.createScene("TestScene1", { width: window.innerWidth, height: window.innerHeight });
        document.body.appendChild(scene.CanvasElement);

        const camera = new Camera(scene, vec3.fromValues(0, 3, -35));

        const cottage = Model.createRenderableMode(scene, new Mesh(CottageMesh.meshdata));
        cottage.Transform.setScale(vec3.fromValues(3, 3 , 3));
        cottage.Material.setTexture('textures/Cottage_Dirt_Base_Color.png');
        cottage.Material.setDiffuseStrength(0.8);
        cottage.Material.setSpecularStrength(0);

        const ground = Primitive.createPrimitive(scene, PrimitiveType.Quad);
        ground.Material.setTexture('textures/MudTexture.jpeg');
        ground.Material.setTiling(vec2.fromValues(100 , 100));
        ground.Transform.setScale(vec3.fromValues(200, 200, 1));
        ground.Transform.setEulerAngles(vec3.fromValues(90, 0, 0));

        const cubemap = Cubemap.createCubemap(scene, new CubemapTexture(
            scene.WebGLContext,
            'Skybox/skybox1/right.jpg',
            'Skybox/skybox1/left.jpg',
            'Skybox/skybox1/top.jpg',
            'Skybox/skybox1/bottom.jpg',
            'Skybox/skybox1/front.jpg',
            'Skybox/skybox1/back.jpg'
        ));

        const dirLight = new DirectionalLight();
        dirLight.setDirection(vec3.fromValues(1, -1, 0));
        
        scene.Add(cottage);
        scene.AddCamera(camera);
        scene.Add(ground);
        scene.AddLight(dirLight);
        scene.Add(cubemap);

        scene.ClearColor = vec4.fromValues(0.1 , 0.1 , 0.1, 1.0);

        let cameraSpeed = 0.1;
        cubemap.Transform.setScale(vec3.fromValues(10 ,10 , 10));

        const renderLoop = () => {
            try {
                Time.update();
                scene.draw();

                if (Input.IsKeyPressed(KeyCode.W)) {
                    camera.Transform.Translate(vec3.fromValues(0 , 0 , 1 * cameraSpeed));
                }
                if (Input.IsKeyPressed(KeyCode.S)) {
                    camera.Transform.Translate(vec3.fromValues(0 , 0 , -1 * cameraSpeed));
                }
                if (Input.IsKeyPressed(KeyCode.A)) {
                    camera.Transform.Translate(vec3.fromValues(-1 * cameraSpeed , 0 , 0));
                }
                if (Input.IsKeyPressed(KeyCode.D)) {
                    camera.Transform.Translate(vec3.fromValues(1 * cameraSpeed , 0 , 0));
                }
                window.requestAnimationFrame(renderLoop);
            }
            catch (e) {
                console.error("Error rendering frame! ", e);
            }

        };
        window.requestAnimationFrame(renderLoop);
    }
}
catch (e) {
    console.log("Error! ", e);
}





