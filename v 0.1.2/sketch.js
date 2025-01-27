import * as THREE from 'three'; 
import { TrackballControls } from './modules/TrackballControls.js';

import { Linha, Chapeu, Plano, TextoView, Cubo } from './classes.js'

//Chamada de funções para os checkboxs
document.getElementById("botaoCalcular").onclick = function () {calcularCubos()}
document.getElementById("plano").onchange = function () {mostrarObjetos(planos, this.checked)}
document.getElementById("eixoX").onchange = function () {mostrarObjetos(eixox, this.checked)}
document.getElementById("eixoY").onchange = function () {mostrarObjetos(eixoy, this.checked)}
document.getElementById("eixoZ").onchange = function () {mostrarObjetos(eixoz, this.checked)}


let eixoSize = 10 //Tamanho do eixo (valor de referência para a criação de todas as formas)

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

//Criação dos eixos e cones
    let pos = eixoSize * 1.5
    var eixox = [ //Vermelho
        new Linha([-2*eixoSize,0,0],[2*eixoSize,0,0],0xf06400), //Eixo
        new Chapeu([eixoSize/20,eixoSize/10,8],[eixoSize * 2,0,0],[0,0,-Math.PI/2],0xf06400), //Cone 1
        new Chapeu([eixoSize/20,eixoSize/10,8],[-eixoSize * 2,0,0],[0,0,Math.PI/2],0xf06400), //Cone 2
        new TextoView("x", [pos,0,0],[240,100,0,1]),
        new TextoView("-" + "x", [-pos,0,0],[240,100,0,1]),
    ]
    var eixoy = [//Verde
        new Linha([0,-2*eixoSize,0],[0,2*eixoSize,0],0x00f064),
        new Chapeu([eixoSize/20,eixoSize/10,8],[0,eixoSize * 2,0],[0,0,0],0x00f064),
        new Chapeu([eixoSize/20,eixoSize/10,8],[0,-eixoSize * 2,0],[0,0,Math.PI],0x00f064),
        new TextoView("  z", [0,pos,0],[0,240,100,1]),
        new TextoView("  -" + "z", [0,-pos,0],[0,240,100,1]),
    ]
    var eixoz = [//Azul
        new Linha([0,0,-2*eixoSize],[0,0,2*eixoSize],0x6400f0),
        new Chapeu([eixoSize/20,eixoSize/10,8],[0,0,eixoSize * 2],[Math.PI/2,0,0],0x6400f0),
        new Chapeu([eixoSize/20,eixoSize/10,8],[0,0,-eixoSize * 2],[-Math.PI/2,0,0],0x6400f0),
        new TextoView("y", [0,0,pos],[100,0,240,1]),
        new TextoView("-" + "y", [0,0,-pos],[100,0,240,1]),
    ]
    eixox.forEach(objeto => {
        scene.add(objeto.obj)
    })
    eixoy.forEach(objeto => {
        scene.add(objeto.obj)
    })
    eixoz.forEach(objeto => {
        scene.add(objeto.obj)
    })

    var planos = [
        new Plano([eixoSize*2,eixoSize*2],0x505050, 0.3,[-Math.PI / 2, 0, 0]),
        new Plano([eixoSize*2,eixoSize*2],0x505050, 0.7,[Math.PI / 2, 0, 0])
    ]
    planos.forEach(objeto => {
        scene.add(objeto.obj)
    })


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

let cubosCena = []
function calcularCubos(){
    cubosCena.forEach(cubo => {
        scene.remove(cubo.obj)
    })
    cubosCena = []
    let equation = document.getElementById("expressionInput").value
    let numbers = []
    let resolution = 20

        for(let x = -eixoSize; x <= eixoSize; x++){
            for(let y = -eixoSize; y <= eixoSize; y++){
                for(let z = -eixoSize; z <= eixoSize; z++){
                    if (Math.abs(x) == 10 || Math.abs(y) == 10 || Math.abs(z) == 10){
                        numbers.push(math.evaluate(calcularExpressao(equation, x, z, y)))
                    }
                }
            }
        }
        let minRange = Math.min(...numbers)
        let maxRange = Math.max(...numbers)
        let index = 0
        for(let x = -eixoSize; x <= eixoSize; x++){
            for(let y = -eixoSize; y <= eixoSize; y++){
                for(let z = -eixoSize; z <= eixoSize; z++){
                    if (Math.abs(x) == 10 || Math.abs(y) == 10 || Math.abs(z) == 10){
                        let cor = new THREE.Color("hsl("+mapRange(numbers[index], minRange, maxRange, 0, 120)+",100%,50%)")
                        cubosCena.push(new Cubo([1,1,1],[x,z,y],cor ))
                        index++
                    }
                }
            }   
        }
        cubosCena.forEach(cubo => {
            scene.add(cubo.obj)
        })
}




function mostrarObjetos(arrayObjetos, valorCheckbox){ //Serve para remover ou adicionar objetos dentro de arrays dependendo se o checkbox está ativo ou não
    arrayObjetos.forEach(objeto => {
        if (valorCheckbox) {
            scene.add(objeto.obj)
        } else {
            scene.remove(objeto.obj)
        }
    })
}

function mapRange(value, oldMin, oldMax, newMin, newMax) { //Map é uma função de regra de três bem bolada
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}

function calcularExpressao(equacao, x, y, z){ //Substitui os valores de x, y e z na string da equação
    equacao = equacao.replace(/x/g, "(" + x.toString() + ")")
    equacao = equacao.replace(/y/g, "(" + z.toString() + ")")
    equacao = equacao.replace(/z/g, "(" + y.toString() + ")")                    
    return math.evaluate(equacao)
}