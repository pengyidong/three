import * as THREE from "three"
// 导入轨道控制器
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'

let scene, camera, renderer, ambientLight;

const init = () => {
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.01, 5000)
    camera.position.set(0.5, 0, 0)

    // Light
    ambientLight = new THREE.AmbientLight(0xaaaa, 20)
    scene.add(ambientLight)

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置控制器阻尼
    controls.enableDamping = true;

    const loader = new GLTFLoader();
    // loader.load('LittlestTokyo.glb', (res) => {
    //     console.log(`res :>> `, res)
    //     scene.add(res.scene);
    //     renderer.render(scene, camera)

    // })
    loader.load('../../../public/LittlestTokyo.glb', function (glb) {
        console.log(glb.scene);
        glb.scene.position.set(120, -400, 0)
        scene.add(glb.scene);
        renderer.render(scene, camera)
    }, undefined, function (error) {
        console.log(error);
    });
}



init()