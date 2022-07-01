import * as THREE from "three"
// 导入轨道控制器
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
// 导入dat.gui
import * as dat from "dat.gui"
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
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0
])

geometry.setAttribute('posttion', new THREE.BufferAttribute(vertices, 3))

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const gui = new dat.GUI();
gui.add(cube.position, "x").min(0).max(5).step(0.01).name("移动X轴坐标").onChange(e => {
    console.log(`移动中 :>> `, e)
}).onFinishChange(e => {
    console.log(`停止 :>> `, e)
});

const params = {
    color: '#FFFF00',
    fn: () => {
        gsap.to(cube.position, {
            x: 5,
            duration: 2,
            yoyo: true,
            repeat: -1
        })
    }
}
gui.addColor(params, "color").onChange(e => {
    console.log(`修改颜色 :>> `, e)
    cube.material.color.set(e);
})
gui.add(cube, "visible").name('是否显示')
gui.add(params, 'fn').name('动画')
let folder = gui.addFolder("设置立方体")
folder.add(cube.material, 'wireframe')

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


// window.addEventListener("dblclick", () => {
//     // 双击进入/退出全屏
//     const Fullscreen = document.fullscreenElement;
//     if (!Fullscreen) {
//         renderer.domElement.requestFullscreen();
//     } else {
//         document.exitFullscreen();
//     }

// })

function render() {
    controls.update();
    renderer.render(scene, camera);
    // 渲染下一帧的时候调用render函数 重新渲染
    requestAnimationFrame(render);
}

render()

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 更新渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
})