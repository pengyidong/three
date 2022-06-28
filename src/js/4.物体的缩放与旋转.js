import * as THREE from "three"
// 导入轨道控制器
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

// 1.创建城景
const scene = new THREE.Scene();
// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
});

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.position.x = 3;

// 缩放
// cube.scale.x = 5;

// 旋转
cube.rotation.set(Math.PI / 4, 0, 0)

// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

function render() {
    cube.position.x += 0.01;
    cube.rotation.x += 0.01;
    if (cube.position.x > 5) {
        cube.position.x = 0
    }
    renderer.render(scene, camera);
    // 渲染下一帧的时候调用render函数 重新渲染
    requestAnimationFrame(render);
}

render()