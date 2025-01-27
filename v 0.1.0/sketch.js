import * as THREE from 'three'; 
import { TrackballControls } from './modules/TrackballControls.js';

//expressão do input e cálculo prévio
let expressionText = document.getElementById("expressionInput")
function validação(){
    alert(math.evaluate(expressionText.value))
}

//Elementos de criação do viewport
{
var scene = new THREE.Scene() // criação da cena e do renderizador
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearAlpha(0)
document.body.appendChild(renderer.domElement)

var yscale = 12 // criação e configuração da câmera
var xscale = window.innerWidth * yscale / window.innerHeight
var camera = new THREE.OrthographicCamera(-xscale, xscale, yscale, -yscale, -50, 50) //Criação da câmera (left, right, top, bottom, near, far)
camera.position.set(5, 2, 5) 
camera.lookAt(0,0,0)
var controls = new TrackballControls(camera, renderer.domElement) 
controls.panSpeed = 18
controls.rotateSpeed = 2
controls.noZoom = true
controls.addEventListener('change', function () {
    camera.up.set(0, 1, 0); // Certifique-se de que o eixo Y da câmera esteja sempre apontando para cima
});
}

//Criação dos eixos do gráfico
{
var materialVermelho = new THREE.LineBasicMaterial({color: 0xf06400})
var materialVerde = new THREE.LineBasicMaterial({color: 0x00f064})
var materialAzul = new THREE.LineBasicMaterial({color: 0x6400f0})

var pointsX = []
var pointsY = []
var pointsZ = []

var lineSize = 10    
pointsX.push(new THREE.Vector3(-lineSize,0,0)); pointsX.push(new THREE.Vector3(lineSize,0,0)) //Adiciona nos arrays originais pontos iniciais e finais.
pointsY.push(new THREE.Vector3(0,-lineSize,0)); pointsY.push(new THREE.Vector3(0,lineSize,0))
pointsZ.push(new THREE.Vector3(0,0,-lineSize)); pointsZ.push(new THREE.Vector3(0,0,lineSize))

var geometryX = new THREE.BufferGeometry().setFromPoints(pointsX)
var geometryY = new THREE.BufferGeometry().setFromPoints(pointsY)
var geometryZ = new THREE.BufferGeometry().setFromPoints(pointsZ)

var lineX = new THREE.Line(geometryX, materialVermelho)
var lineY = new THREE.Line(geometryY, materialVerde)
var lineZ = new THREE.Line(geometryZ, materialAzul)

scene.add(lineX); 
scene.add(lineY);
scene.add(lineZ);
}


function animate(){
    requestAnimationFrame(animate)
    controls.update(1)
    renderer.render(scene, camera)
}
animate()

//Ajuste do viewport no redimensionamento da página
window.addEventListener('resize', function(event){
    renderer.setSize(window.innerWidth, window.innerHeight) // muda o tamanho do canvas
    { //atualiza a escala da câmera ortográfica
    console.log('A página foi redimensionada!');
    xscale = window.innerWidth * yscale / window.innerHeight
    camera.left = -xscale; camera.right = xscale; camera.top = yscale; camera.bottom = -yscale;
    camera.updateProjectionMatrix();
    }
});

