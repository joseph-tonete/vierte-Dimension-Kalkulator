import * as THREE from 'three'; 
import { TrackballControls } from './modules/TrackballControls.js';

let eixoSize = 1 //Tamanho do eixo (valor de referência para a criação de todas as formas)

//Elementos de criação do viewport
{
    var scene = new THREE.Scene() // criação da cena e do renderizador
    var renderer = new THREE.WebGLRenderer({ antialias: true }) 
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearAlpha(0) //Fundo da cena transparente
    document.body.appendChild(renderer.domElement)

    var yscale = eixoSize * 2.1// criação e configuração da câmera
    var xscale = window.innerWidth * yscale / window.innerHeight
    var camera = new THREE.OrthographicCamera(-xscale, xscale, yscale, -yscale, -50, 50) //Criação da câmera (left, right, top, bottom, near, far)
    camera.position.set(5, 2, 4) 
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
    let op = 0.2 //line opacity OPACIDADE DA LINHA
    let linhas = [ //dados das linhas
        //[[pontoinicial],[pontofinal],cor,opacidade]
        [[0,0,0],[eixoSize,eixoSize,eixoSize],0x000000, 1], // teste
        //Eixos x, y, z
        [[-2*eixoSize,0,0],[2*eixoSize,0,0],0xf06400, 1], //x vermelho
        [[0,-2*eixoSize,0],[0,2*eixoSize,0],0x00f064, 1], //y verde vertical
        [[0,0,-2*eixoSize],[0,0,2*eixoSize],0x6400f0, 1], //z azul
        //Quadrado verde
        [[eixoSize,0,eixoSize],[eixoSize,0,-eixoSize],0x00f064, op],
        [[eixoSize,0,eixoSize],[-eixoSize,0,eixoSize],0x00f064, op],
        [[-eixoSize,0,-eixoSize],[eixoSize,0,-eixoSize],0x00f064, op],
        [[-eixoSize,0,-eixoSize],[-eixoSize,0,eixoSize],0x00f064, op],
        //Quadrado azul
        [[eixoSize,eixoSize,0],[eixoSize,-eixoSize,0],0x6400f0, op],
        [[eixoSize,eixoSize,0],[-eixoSize,eixoSize,0],0x6400f0, op],
        [[-eixoSize,-eixoSize,-0],[eixoSize,-eixoSize,0],0x6400f0, op],
        [[-eixoSize,-eixoSize,-0],[-eixoSize,eixoSize,0],0x6400f0, op],
        //Quadrado vermelho
        [[0,eixoSize,eixoSize],[0,eixoSize,-eixoSize],0xf06400, op],
        [[0,eixoSize,eixoSize],[0,-eixoSize,eixoSize],0xf06400, op],
        [[0,-eixoSize,-eixoSize],[0,eixoSize,-eixoSize],0xf06400, op],
        [[0,-eixoSize,-eixoSize],[0,-eixoSize,eixoSize],0xf06400, op],
    ]

    linhas.forEach(elmnt => { //Cria as linhas a partir dos dados no vetor linhas
        let points = [new THREE.Vector3(elmnt[0][0],elmnt[0][1],elmnt[0][2]),
            new THREE.Vector3(elmnt[1][0],elmnt[1][1],elmnt[1][2])]
        let geometry = new THREE.BufferGeometry().setFromPoints(points)
        let material = new THREE.LineBasicMaterial({color: elmnt[2], transparent: true, opacity: elmnt[3]})
        let line = new THREE.Line(geometry, material)
        scene.add(line)
    })
}

//Criador do plano
{
    let geometriaPlano = new THREE.PlaneGeometry(eixoSize*2,eixoSize*2)
    let materialPlano = new THREE.MeshBasicMaterial({color: 0x505050, transparent: true, opacity: 0.3})
    let plano = new THREE.Mesh(geometriaPlano, materialPlano)
    plano.rotation.x = -Math.PI / 2
    scene.add(plano)
    materialPlano = new THREE.MeshBasicMaterial({color: 0x505050, transparent: true, opacity: 0.7})
    plano = new THREE.Mesh(geometriaPlano, materialPlano)
    plano.rotation.x = Math.PI / 2
    scene.add(plano)
}

//Criador dos cones
{
 let cones = [ //dados dos cones
    //[[posição],[rotação],cor]
    [[0,eixoSize * 2,0],[0,0,0],0x00f064],//Verde
    [[0,-eixoSize * 2,0],[0,0,Math.PI],0x00f064],
    [[eixoSize * 2,0,0],[0,0,-Math.PI/2],0xf06400],//Vermelho
    [[-eixoSize * 2,0,0],[0,0,Math.PI/2],0xf06400],
    [[0,0,eixoSize * 2],[Math.PI/2,0,0],0x6400f0],//Azul
    [[0,0,-eixoSize * 2],[-Math.PI/2,0,0],0x6400f0]
 ]

 cones.forEach(c => {
    let geometriaCone = new THREE.ConeGeometry(eixoSize/20,eixoSize/10,8) //Radius, height, Segments
    let materialCone = new THREE.MeshBasicMaterial({color: c[2]})
    let Cone = new THREE.Mesh(geometriaCone, materialCone)
    Cone.position.set(c[0][0],c[0][1],c[0][2])
    Cone.rotation.set(c[1][0],c[1][1],c[1][2])
    scene.add(Cone)
})
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
    //console.log('A página foi redimensionada!');
    xscale = window.innerWidth * yscale / window.innerHeight
    camera.left = -xscale; camera.right = xscale; camera.top = yscale; camera.bottom = -yscale;
    camera.updateProjectionMatrix();
    }
});

//expressão do input e cálculo prévio
let expressionText = document.getElementById("expressionInput")
    function validação(){
        alert(math.evaluate(expressionText.value))
}

