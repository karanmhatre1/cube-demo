import './style.css'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener('dblclick', () => {
  if(!document.fullscreenElement) {
    canvas.requestFullscreen();
  }
  else {
    document.exitFullscreen();
  }
});

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
const clock = new THREE.Clock();

const cube1 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(.3,.3,.3),
  new THREE.MeshBasicMaterial({color: 0xffffff })
)

const cube2 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(.5,.5,.5),
  new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true })
)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});

const controls = new TrackballControls(camera, canvas);

scene.background = null;
scene.add(cube1);
scene.add(cube2);
scene.add(camera);

cube1.rotation.z = 2;
camera.position.z = 2;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

controls.enableDamping = true;
controls.dynamicDampingFactor = 0.1;
controls.panSpeed = 0.7;
controls.rotateSpeed = 5;

const tick = () =>
{
  
  const elapsedTime = clock.getElapsedTime();
  cube1.position.x = Math.sin(elapsedTime * 0.8)*1.2;
  cube1.position.y = -Math.sin(elapsedTime * 0.8)*1;
  cube1.position.z = Math.sin(elapsedTime * 0.8)*.5;
  cube1.rotation.y = elapsedTime;

  cube2.position.x = Math.sin(elapsedTime * 0.8)*1.2;
  cube2.position.y = -Math.sin(elapsedTime * 0.8)*1;
  cube2.position.z = Math.sin(elapsedTime * 0.8)*.5;
  cube2.rotation.y = elapsedTime;

  controls.update();
  
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();