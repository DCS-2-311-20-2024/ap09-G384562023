//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G384562023 田熊玄太
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "ili-gui";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {
    axes: true, // 座標軸
  };
  const cameraParam = { // カメラの設定値
    fov: 50, // 視野角
    x: 5,
    y: 10,
    z: 20
  };

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");
  gui.add(cameraParam, "fov", 10, 100).onChange(render);
  gui.add(cameraParam, "x", -40, 40).onChange(render);
  gui.add(cameraParam, "y", -40, 40).onChange(render);
  gui.add(cameraParam, "z", -40, 40).onChange(render);

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // 平面の設定
  const planeGeometry = new THREE.PlaneGeometry(20, 15);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x808000});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);

  // 光源の設定
  const spotLight = new THREE.PointLight(0xFFFFFF, 200, 100, 1.0);
  spotLight.position.set(10, 15, 10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // 画像の貼り付け
  const textureLoader = new THREE.TextureLoader();
  const texture0 = textureLoader.load("");
  const texture1 = textureLoader.load("seven.png");
  const texture2 = textureLoader.load("sakuranbo.png");
  const texture3 = textureLoader.load("suika.png");


 // コインの枚数表示
 let coin = 5;
 function setCoin(coin) {
   document.getElementById("coin").innerText
     = String(Math.round(coin));
 }



  // スロットマシンの作成
  const slot = new THREE.Group();
  const metalMaterial = new THREE.MeshPhongMaterial(
    {color: 0x707777, shininess: 60, specular: 0x222222 });
  const blackMaterial = new THREE.MeshPhongMaterial(
    {color: 0x111111, shininess: 60, specular: 0x222222 });
  const goldMaterial = new THREE.MeshPhongMaterial(
    {color: 0xffb700, shininess: 60, specular: 0x222222 });
  const redMaterial = new THREE.MeshPhongMaterial(
    {color: 0x8b0000, shininess: 60, specular: 0x222222 });
  const holecolor = new THREE.MeshBasicMaterial(
    {color: 0x000000, shininess: 60, specular: 0x222222 });
  const W = 8; //スロットマシンの幅
  const dodaiH = 0.5; //土台の高さ
  const dodai1D = 5; //土台1の奥行き
  const dodai2D = 4.5; //土台2(スロットマシン頭)の奥行き
  const centerH = 3.5; //スロットマシン中央部の高さ
  const centerD = 4; //スロットマシン中央部の奥行き
  const gamenH = 4; //スロットマシン液晶部の高さ
  const gamenD = 3.5; //スロットマシン液晶部分の奥行き
  const headH = 2; //スロットマシン頭の高さ
  const hankei = 0.5; //円や円柱の半径
  const nemotoH = 1; //スロットマシンのレバーの根本の高さ
  const leverH = 6 //スロットマシンのレバーの棒の長さ(高さ)
  const seg = 12; // 円や円柱の分割数

  const zugara1Geometry = new THREE.BoxGeometry(2, gamenH, 3.25);
  const zugaraMaterial1 = new THREE.MeshLambertMaterial();
  const zugara1 = new THREE.Mesh(zugara1Geometry, zugaraMaterial1);
  zugaraMaterial1.map = texture0;
  zugara1.position.set(-2, (centerH + dodaiH*2 + gamenH/2), );
  slot.add(zugara1);

  const zugara2Geometry = new THREE.BoxGeometry(2, gamenH, 3.25);
  const zugaraMaterial2 = new THREE.MeshLambertMaterial();
  const zugara2 = new THREE.Mesh(zugara2Geometry, zugaraMaterial2);
  zugaraMaterial2.map = texture0;
  zugara2.position.set(0, (centerH + dodaiH*2 + gamenH/2), );
  slot.add(zugara2);

  const zugara3Geometry = new THREE.BoxGeometry(2, gamenH, 3.25);
  const zugaraMaterial3 = new THREE.MeshLambertMaterial();
  const zugara3 = new THREE.Mesh(zugara3Geometry, zugaraMaterial3);
  zugaraMaterial3.map = texture0;
  zugara3.position.set(2, (centerH + dodaiH*2 + gamenH/2), );
  slot.add(zugara3);
  // 土台1の作成
  const dodai1Geometry = new THREE.BoxGeometry(W, dodaiH, dodai1D);
  const dodai1 = new THREE.Mesh(dodai1Geometry, blackMaterial);
  dodai1.position.set(0, dodaiH/2, 0);
  slot.add(dodai1);
  // 土台2の作成
  const dodai2Geometry = new THREE.BoxGeometry(W, dodaiH, dodai2D);
  const dodai2 = new THREE.Mesh(dodai2Geometry, blackMaterial);
  dodai2.position.set(0, (centerH + dodaiH + dodaiH/2), 0.25);
  slot.add(dodai2);
  // スロットマシン中央部の作成
  const centerGeometry = new THREE.BoxGeometry(W, centerH, centerD);
  const center = new THREE.Mesh(centerGeometry, redMaterial);
  center.position.set(0, (dodaiH + centerH/2), 0);
  slot.add(center);
  // スロットマシン液晶部の作成
  const gamenGeometry = new THREE.BoxGeometry(W, gamenH, gamenD);
  const gamen = new THREE.Mesh(gamenGeometry, metalMaterial);
  gamen.position.set(0, (centerH + dodaiH*2 + gamenH/2), -0.25);
  slot.add(gamen);
  // スロットマシン液晶部の柱(2本)の作成
  const hasiraGeometry = new THREE.BoxGeometry(1, gamenH, 0.5);
  const hasira1 = new THREE.Mesh(hasiraGeometry, metalMaterial);
  hasira1.position.set((W/2)-0.5, (centerH + dodaiH*2 + gamenH/2), gamenD/2);
  slot.add(hasira1);
  const hasira2 = new THREE.Mesh(hasiraGeometry, metalMaterial);
  hasira2.position.set(-((W/2)-0.5), (centerH + dodaiH*2 + gamenH/2), gamenD/2);
  slot.add(hasira2);
  // スロットマシン頭の作成
  const headGeometry = new THREE.BoxGeometry(W, headH, dodai2D);
  const head = new THREE.Mesh(headGeometry, redMaterial);
  head.position.set(0, (centerH + dodaiH*2 + gamenH + headH/2), 0.25);
  slot.add(head);
  // スロットマシンのレバーの根本
  const nemotoGeometry = new THREE.CylinderGeometry(hankei, hankei, nemotoH, seg, seg);
  const nemoto = new THREE.Mesh(nemotoGeometry, metalMaterial);
  nemoto.rotation.z = Math.PI/2;
  nemoto.position.set((W / 2 + nemotoH / 2), (centerH + dodaiH/2), 0);
  slot.add(nemoto);
  // スロットマシンのレバーの棒
  const leverGeometry = new THREE.CylinderGeometry(hankei/2, hankei/2, leverH, seg, seg);
  const lever = new THREE.Mesh(leverGeometry, metalMaterial);
  lever.rotation.x = Math.PI/4;
  lever.position.set((W / 2 + nemotoH / 2), (centerH + dodaiH/2)+(leverH/2)/(Math.PI/2), (leverH/2)/(Math.PI/2));
  slot.add(lever);
  // スロットマシンのレバーの持ち手(円球)
  const sphereGeometry = new THREE.SphereGeometry(hankei, seg, seg);
  const sphere = (new THREE.Mesh(sphereGeometry, redMaterial));
  sphere.position.set((W / 2 + nemotoH / 2), (centerH + dodaiH/2)+(leverH/2)/(Math.PI/2)*2, (leverH/2)/(Math.PI/2)*2);
  slot.add(sphere);
  // メダル払口の作成
  const holeGeometry = new THREE.BoxGeometry(2, 1, 0.01);
  const hole = new THREE.Mesh(holeGeometry, holecolor);
  hole.position.set(0, (dodaiH + 1/2), centerD/2);
  slot.add(hole);







  scene.add(slot);









// スロットの仕組み
function tyusen() {
  coin -= 1;
  zugaraMaterial1.map = texture0;
  zugaraMaterial2.map = texture0;
  zugaraMaterial3.map = texture0;
  const items = ['sakuranbo', 'suika', 'seven'];
  const randomItem1 = items[Math.floor(Math.random() * items.length)];
  console.log(randomItem1);
  if(randomItem1 == 'seven'){
    zugaraMaterial1.map = texture1;
  }
  if(randomItem1 == 'sakuranbo'){
    zugaraMaterial1.map = texture2;
  }
  if(randomItem1 == 'suika'){
    zugaraMaterial1.map = texture3;
  }

  const randomItem2 = items[Math.floor(Math.random() * items.length)];
  console.log(randomItem2);
  setTimeout(() => {
  if(randomItem2 == 'seven'){
    zugaraMaterial2.map = texture1;
  }
  if(randomItem2 == 'sakuranbo'){
    zugaraMaterial2.map = texture2;
  }
  if(randomItem2 == 'suika'){
    zugaraMaterial2.map = texture3;
  }
}, 1000);

  const randomItem3 = items[Math.floor(Math.random() * items.length)];
  console.log(randomItem3);
  setTimeout(() => {
  if(randomItem3 == 'seven'){
    zugaraMaterial3.map = texture1;
  }
  if(randomItem3 == 'sakuranbo'){
    zugaraMaterial3.map = texture2;
  }
  if(randomItem3 == 'suika'){
    zugaraMaterial3.map = texture3;
  }
}, 2000);

setTimeout(() => {
  if(randomItem1 == randomItem2 && randomItem2 == randomItem3 && randomItem3 == 'sakuranbo'){
   console.log('sakuranboが当たりました。');
   coin += 5;
  }
  if(randomItem1 == randomItem2 && randomItem2 == randomItem3 && randomItem3 == 'suika'){
   console.log('suikaが当たりました。');
   coin += 10;
  }
  if(randomItem1 == randomItem2 && randomItem2 == randomItem3 && randomItem3 == 'seven'){
   console.log('sevenが当たりました。');
   coin += 100;
  }
}, 2500);
  }

  // ボタンをクリックでスタートする
    const button = document.getElementById('button');
    
    button.addEventListener('click', () => {
      button.disabled = true;
      tyusen();
      setTimeout(() => {
      button.disabled = false;
    }, 3000);
    });
















  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    cameraParam.fov, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(1,2,3);
  camera.lookAt(0,0,0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  renderer.setClearColor( 0x00bfff );
  renderer.shadowMap.enabled = true;
    document.getElementById("output").appendChild(renderer.domElement);

  // 描画処理

  // 描画関数
  function render() {
    camera.fov = cameraParam.fov;
    camera.position.x = cameraParam.x;
    camera.position.y = cameraParam.y;
    camera.position.z = cameraParam.z;
    camera.lookAt(0, 3, 0);
    camera.updateProjectionMatrix();
    // 座標軸の表示
    axes.visible = param.axes;
    // コインの枚数の更新
    setCoin(coin);
    // 描画
    renderer.render(scene, camera);
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  render();
}

init();