import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

import "./index.css";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#484848");

THREE.ColorManagement.legacyMode = false;

//
// 🎥 camera
//

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(7, 4, 21);

//
// 📷 renderer
//

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping; // https://threejs.org/docs/#api/en/constants/Renderer
// renderer.toneMappingExposure = 2.3;
// renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // https://threejs.org/docs/#api/en/constants/Renderer
document.body.appendChild(renderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom);

const controls = new OrbitControls(camera, renderer.domElement);

//
// Meshes
//

// 🧊 cube

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({ color: "blue" })
);
cube.castShadow = true;
cube.position.y = 1;
scene.add(cube);

// 🏀 sphere

const sphere = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1, 1),
  new THREE.MeshStandardMaterial({ color: "red", flatShading: true })
);
sphere.castShadow = true;
sphere.position.y = 1;
sphere.position.z = 5;
scene.add(sphere);

// ground plane

const ground = new THREE.Mesh(
  new THREE.BoxGeometry(100, 100, 0.1),
  new THREE.MeshStandardMaterial({
    color: "gray",
    transparent: true,
    opacity: 0.8,
  })
);
ground.position.y = -0.1 / 2;
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

//
// 💡 lights
//

// spot

const spotLight = new THREE.SpotLight("white");
spotLight.position.set(15, 15, 15);
spotLight.penumbra = 1;
spotLight.castShadow = true;
spotLight.intensity = 2;
spotLight.shadow.bias = -0.0001;
// spotLight.shadow.mapSize.width = 1024 * 4;
// spotLight.shadow.mapSize.height = 1024 * 4;
// spotLight.shadow.camera.near = 0.5; // default 0.5
// spotLight.shadow.camera.far = 10; // default 500

scene.add(spotLight);
scene.add(new THREE.SpotLightHelper(spotLight));

// ambient

const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.2;
scene.add(ambientLight);

//
// dummies
//

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//
// 🎬 animation
//

function animate(t) {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  stats.update();
}
animate();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);
