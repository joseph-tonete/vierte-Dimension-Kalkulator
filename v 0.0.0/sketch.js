//Imports


//expressão do input
let expressionText = document.getElementById("expressionInput")
//função de teste
function validação(){
    alert(math.evaluate(expressionText.value))
}

function fixRotate(rotation){
    return rotation * Math.PI * 2
}

//Elementos básicos da calculadora
{
var scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.x = 5; camera.position.y = 2; camera.position.z = 5
camera.rotation.x = 0; camera.rotation.y = fixRotate(0.125); camera.rotation.z = 0
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

}

//Eixos do gráfico
{
var materialVermelho = new THREE.LineBasicMaterial({color: 0xf06400})
var materialVerde = new THREE.LineBasicMaterial({color: 0x00f064})
var materialAzul = new THREE.LineBasicMaterial({color: 0x6400f0})

var pointsX = []
var pointsY = []
var pointsZ = []

var lineSize = 5
pointsX.push(new THREE.Vector3(-lineSize,0,0)); pointsX.push(new THREE.Vector3(lineSize,0,0))
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
    renderer.render(scene, camera)
}
animate()

//Realização de ações no redimensionamento da página
window.addEventListener('resize', function(event){
    renderer.setSize(window.innerWidth, window.innerHeight)
    console.log('A página foi redimensionada!');
});