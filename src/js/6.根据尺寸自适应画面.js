import * as THREE from "three"
// 导入轨道控制器
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from "gsap"

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

cube.position.x = 0;

// 缩放
// cube.scale.x = 5;

// 旋转
// cube.rotation.set(Math.PI / 4, 0, 0)

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
// 设置控制器阻尼
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

// 设置动画
let animation = gsap.to(cube.position, {
    x: 5,
    duration: 5,
    ease: 'power1.inOut',
    // 循环次数 -1为无限次
    repeat: 3,
    // 往返
    yoyo: true,
    // 延迟
    delay: 2,
    onComplete: () => {
        console.log(`动画结束 :>> `)
    },
    onStart: () => {
        console.log(`动画开始 :>> `)
    }
})

gsap.to(cube.rotation, {
    z: -2 * Math.PI,
    duration: 5,
    ease: 'power1.inOut'
})

window.addEventListener("dblclick", () => {
    if (animation.isActive()) {
        animation.pause();
    } else {
        animation.resume()
    }
})

function render() {
    controls.update();
    renderer.render(scene, camera);
    // 渲染下一帧的时候调用render函数 重新渲染
    requestAnimationFrame(render);
}

render()

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
    console.log(`画面变化 :>> `)
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 更新渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
})