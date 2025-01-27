import * as THREE from 'three'; 
import { TrackballControls } from './modules/TrackballControls.js';
import { Linha, Chapeu, Plano, TextoView, CuboGraph } from './classes.js'

//Chamada de funções para os elementos do site
document.getElementById("onlyForm").addEventListener("submit", function(event) {event.preventDefault();calcularCubos()})
document.getElementById("cleanGraphButton").onclick = function () {mostrarObjetos(cubosCena, false)}
document.getElementById("checkboxShowAxisX").onchange = function () {mostrarObjetos(eixox, this.checked)}
document.getElementById("checkboxShowAxisY").onchange = function () {mostrarObjetos(eixoy, this.checked)}
document.getElementById("checkboxShowAxisZ").onchange = function () {mostrarObjetos(eixoz, this.checked)}

let eixoSize = 10 //Tamanho do eixo (valor de referência para a criação de todas as formas)

//Elementos de criação do viewport
var scene = new THREE.Scene() // criação da cena e do renderizador
var renderer = new THREE.WebGLRenderer({ antialias: true }) 
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearAlpha(0) //Fundo da cena transparente
document.body.appendChild(renderer.domElement)

var yscale
var xscale
if(window.innerWidth > window.innerHeight){
    yscale = eixoSize * 2.2 
    xscale = window.innerWidth * yscale / window.innerHeight
} else {
    xscale = eixoSize * 2.2
    yscale = window.innerHeight * xscale / window.innerWidth
}
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
//Ajuste do viewport no redimensionamento da página
window.addEventListener('resize', function(event){
    renderer.setSize(window.innerWidth, window.innerHeight) // muda o tamanho do canvas
    if(window.innerWidth > window.innerHeight){
        yscale = eixoSize * 2.2
        xscale = window.innerWidth * yscale / window.innerHeight
    } else {
        xscale = eixoSize * 2.2
        yscale = window.innerHeight * xscale / window.innerWidth
    }
    camera.left = -xscale; camera.right = xscale; camera.top = yscale; camera.bottom = -yscale;
    camera.updateProjectionMatrix();
});

//Raycaster 
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        var object = intersects[0].object;
        if(object.name){
            let objname = object.name.split("@")
            document.getElementById("graphProperties").innerText = "X: " + objname[1] + " / Y: " + objname[3] + " / Z: "+ objname[2]
            document.getElementById("graphValue").innerText = "Valor: " + objname[0]
            document.getElementById("colorCubeShow").style.backgroundColor = "rgb(" + parseInt(parseFloat(objname[4]) * 255) + "," + parseInt(parseFloat(objname[5]) * 255) + "," + parseInt(parseFloat(objname[6]) * 255) + ")"
        }
    }
}
window.addEventListener("mousemove", onMouseMove, false)

//Criação dos eixos e cones
let posNum = eixoSize * 1.5
let posAxs = eixoSize * 2.3
var escalaDoGrafico = Number(document.getElementById("inputGraphScale").value)
var eixox = [ //Vermelho
    new Linha([-2*eixoSize,0,0],[2*eixoSize,0,0],0xf06400), //Eixo
    new Chapeu([eixoSize/20,eixoSize/10,8],[eixoSize * 2,0,0],[0,0,-Math.PI/2],0xf06400), //Cone 1
    new Chapeu([eixoSize/20,eixoSize/10,8],[-eixoSize * 2,0,0],[0,0,Math.PI/2],0xf06400), //Cone 2
    new TextoView("x", [posAxs,-1,0],[240,100,0,1]),
    new TextoView("-x", [-posAxs,-1.2,0],[240,100,0,1]),
    new TextoView(escalaDoGrafico, [posNum,0,0],[240,100,0,1]),
    new TextoView("-" + escalaDoGrafico, [-posNum,0,0],[240,100,0,1]),
]
var eixoy = [//Verde
    new Linha([0,-2*eixoSize,0],[0,2*eixoSize,0],0x00f064),
    new Chapeu([eixoSize/20,eixoSize/10,8],[0,eixoSize * 2,0],[0,0,0],0x00f064),
    new Chapeu([eixoSize/20,eixoSize/10,8],[0,-eixoSize * 2,0],[0,0,Math.PI],0x00f064),
    new TextoView("z     ", [0,posNum,0],[0,240,100,1]),
    new TextoView("-z    ", [0,-posNum,0],[0,240,100,1]),
    new TextoView("    "+escalaDoGrafico, [0,posNum,0],[0,240,100,1]),
    new TextoView("   -"+escalaDoGrafico, [0,-posNum,0],[0,240,100,1]),
]
var eixoz = [//Azul
    new Linha([0,0,-2*eixoSize],[0,0,2*eixoSize],0x6400f0),
    new Chapeu([eixoSize/20,eixoSize/10,8],[0,0,eixoSize * 2],[Math.PI/2,0,0],0x6400f0),
    new Chapeu([eixoSize/20,eixoSize/10,8],[0,0,-eixoSize * 2],[-Math.PI/2,0,0],0x6400f0),
    new TextoView("y", [0,-1,posAxs],[100,0,240,1]),
    new TextoView("-y", [0,-1.2,-posAxs],[100,0,240,1]),
    new TextoView(escalaDoGrafico, [0,0,posNum],[100,0,240,1]),
    new TextoView("-"+escalaDoGrafico, [0,0,-posNum],[100,0,240,1]),
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
function mostrarObjetos(arrayObjetos, valorCheckbox){ //Serve para remover ou adicionar objetos dentro de arrays dependendo se o checkbox está ativo ou não
    arrayObjetos.forEach(objeto => {
        if (valorCheckbox) {
            scene.add(objeto.obj)
        } else {
            scene.remove(objeto.obj)
        }
    })
}

//Criação do gráfico
let cubosCena = []
function calcularCubos(){
    //Recriação dos valores dos eixos e valores
    eixox.forEach(objeto => {scene.remove(objeto.obj)})
    eixoy.forEach(objeto => {scene.remove(objeto.obj)})
    eixoz.forEach(objeto => {scene.remove(objeto.obj)})
    escalaDoGrafico = Number(document.getElementById("inputGraphScale").value)
    eixox[5] = new TextoView(escalaDoGrafico, [posNum,0,0],[240,100,0,1]),
    eixox[6] = new TextoView("-" + escalaDoGrafico, [-posNum,0,0],[240,100,0,1]),
    eixoy[5] = new TextoView("    "+escalaDoGrafico, [0,posNum,0],[0,240,100,1]),
    eixoy[6] = new TextoView("   -"+escalaDoGrafico, [0,-posNum,0],[0,240,100,1]),
    eixoz[5] = new TextoView(escalaDoGrafico, [0,0,posNum],[100,0,240,1]),
    eixoz[6] = new TextoView("-"+escalaDoGrafico, [0,0,-posNum],[100,0,240,1]),
    mostrarObjetos(eixox, document.getElementById("checkboxShowAxisX").checked)
    mostrarObjetos(eixoy, document.getElementById("checkboxShowAxisY").checked) 
    mostrarObjetos(eixoz, document.getElementById("checkboxShowAxisZ").checked)
    //Limpeza do gráfico anterior
    cubosCena.forEach(cubo => {
        scene.remove(cubo.obj)
    })
    cubosCena = []
    //Importação dos valores
    document.getElementById("colorCubeMax").style.backgroundColor = "#fff"
    document.getElementById("colorCubeMin").style.backgroundColor = "#fff"
    document.getElementById("graphMaxValue").textContent = "Máximo: 0.0"
    document.getElementById("graphMinValue").textContent = "Mínimo: 0.0"
    document.getElementById("graphValue").innerText = "Valor: 0.0"
    document.getElementById("graphProperties").innerText = "X: 0.0 / Y: 0.0 / Z: 0.0"
    document.getElementById("labelErrorMessage").innerText = ""
    let equation = document.getElementById("expressionInput").value
    let resolution = Number(document.getElementById("inputGraphResolution").value)
    let minColor = Number(document.getElementById("minGraphColor").value)
    let maxColor = Number(document.getElementById("maxGraphColor").value)
    let minX = document.getElementById("inputMinValueX").value
    let maxX = document.getElementById("inputMaxValueX").value
    let minY = document.getElementById("inputMinValueY").value
    let maxY = document.getElementById("inputMaxValueY").value
    let minZ = document.getElementById("inputMinValueZ").value
    let maxZ = document.getElementById("inputMaxValueZ").value
    let minA = document.getElementById("inputMinValueA").value
    let maxA = document.getElementById("inputMaxValueA").value
    

    let pattern = 2 * eixoSize / resolution
    let numbers = []

    for(let x = -resolution; x < resolution; x += 2){
        for(let y = -resolution; y < resolution; y += 2){
            for(let z = -resolution; z < resolution; z += 2){
                let valorNoPonto
                let xscale = escalaDoGrafico * (x + 1) / resolution
                let yscale = escalaDoGrafico * (z + 1) / resolution
                let zscale = escalaDoGrafico * (y + 1) / resolution
                try {
                    valorNoPonto = math.evaluate(calcularExpressao(equation, xscale, yscale, zscale)) 
                    numbers.push(valorNoPonto)
                } catch (error) {
                    valorNoPonto = "erro"
                    console.log("Houve um erro ao calcular o valor")
                    document.getElementById("labelErrorMessage").innerText = "Houveram erros ao calcular determinados valores. Erros foram descartados do gráfico."
                }
                cubosCena.push(new CuboGraph(
                    [pattern,pattern,pattern], 
                    [(x + 1) * eixoSize / resolution, (z + 1) * eixoSize / resolution, (y + 1) * eixoSize / resolution],
                    "",
                    valorNoPonto,
                    [xscale, yscale, zscale],
                    false))
            }
        }
    }
    //Cálculo do menor e do maior valor encontrado no gráfico para escalonar as cores.
    let maxRange = Math.max(...numbers)
    let minRange = Math.min(...numbers)
    document.getElementById("colorCubeMax").style.backgroundColor = "hsl("+maxColor+", 100%, 50%)"
    document.getElementById("colorCubeMin").style.backgroundColor = "hsl("+minColor+", 100%, 50%)"
    document.getElementById("graphMaxValue").textContent = "Máximo: " + maxRange;
    document.getElementById("graphMinValue").textContent = "Mínimo: " + minRange;
    cubosCena.forEach(cubo => {
        //Define o graphState para true se o cubo estiver dentro das restrições do gráfico
        if(cubo.graphValue == "erro"){
            return
        }
        if(minX != "" && !(Number(minX) < cubo.graphCoordinates[0])){
            return
        }
        if(maxX != "" && !(Number(maxX) > cubo.graphCoordinates[0])){
            return
        }
        if(minY != "" && !(Number(minY) < cubo.graphCoordinates[2])){
            return
        }
        if(maxY != "" && !(Number(maxY) > cubo.graphCoordinates[2])){
            return
        }
        if(minZ != "" && !(Number(minZ) < cubo.graphCoordinates[1])){
            return
        }
        if(maxZ != "" && !(Number(maxZ) > cubo.graphCoordinates[1])){
            return
        }
        if(minA != "" && !(Number(minA) < cubo.graphValue)){
            return
        }
        if(maxA != "" && !(Number(maxA) > cubo.graphValue)){
            return
        }
        cubo.graphState = true
    })

    let index = 0
    cubosCena.forEach(cubo => {   
        //Mostra somente os cubos que estão visíveis (ou os que estão em contato com o ar)
        if(cubo.graphState){
            //Define a cor e contrói o cubo sem o adicionar na cena
            cubo.color = new THREE.Color("hsl("+mapRange(cubo.graphValue, minRange, maxRange, minColor, maxColor)+",100%,50%)")
            cubo.construct()
            if(Math.abs(cubo.position[0]) == eixoSize - pattern/2 || Math.abs(cubo.position[1]) == eixoSize - pattern/2 || Math.abs(cubo.position[2]) == eixoSize - pattern/2){
                scene.add(cubo.obj)  
            } else {
                if(!cubosCena[index + 1].graphState || !cubosCena[index - 1].graphState ||
                    !cubosCena[index + resolution].graphState || !cubosCena[index -resolution].graphState ||
                    !cubosCena[index + resolution**2].graphState || !cubosCena[index - resolution**2].graphState){
                        scene.add(cubo.obj)
                }
            }
        }
        index ++ 
    })
        
}


function calcularExpressao(equacao, x, y, z){ //Substitui os valores de x, y e z na string da equação
    equacao = equacao.replace(/x/g, "(" + x.toString() + ")")
    equacao = equacao.replace(/y/g, "(" + z.toString() + ")")
    equacao = equacao.replace(/z/g, "(" + y.toString() + ")")   
    while (true){
        let mathF = "abs"
        if(equacao.indexOf(mathF) == -1){
            break
        } else {
            let minPos = equacao.indexOf(mathF) + mathF.length
            let maxPos 
            let parenteses = 0
            for(let mathInd = minPos; mathInd < equacao.length; mathInd++){
                if(equacao.at(mathInd) == "("){
                    parenteses += 1
                } else if (equacao.at(mathInd) == ")"){
                    parenteses -= 1
                }

                if (parenteses == 0){
                    maxPos = mathInd
                    break
                }
            }
            let expressao = calcularExpressao(equacao.slice(minPos, maxPos + 1), 0,0,0)
            let valorCortado = Math.abs(expressao)
            equacao = equacao.replace(equacao.slice(equacao.indexOf(mathF), maxPos + 1), String(valorCortado))
        }
    }
    while (true){
        let mathF = "ln"
        if(equacao.indexOf(mathF) == -1){
            break
        } else {
            let minPos = equacao.indexOf(mathF) + mathF.length
            let maxPos 
            let parenteses = 0
            for(let mathInd = minPos; mathInd < equacao.length; mathInd++){
                if(equacao.at(mathInd) == "("){
                    parenteses += 1
                } else if (equacao.at(mathInd) == ")"){
                    parenteses -= 1
                }

                if (parenteses == 0){
                    maxPos = mathInd
                    break
                }
            }
            let expressao = calcularExpressao(equacao.slice(minPos, maxPos + 1), 0,0,0)
            let valorCortado
            if (expressao <= 0){
                valorCortado = "erro"
            } else {
                valorCortado = Math.log(calcularExpressao(equacao.slice(minPos, maxPos + 1), 0,0,0)) 
            }
            equacao = equacao.replace(equacao.slice(equacao.indexOf(mathF), maxPos + 1), String(valorCortado))
        }
    }
    while (true){
        let mathF = "log"
        if(equacao.indexOf(mathF) == -1){
            break
        } else {
            let minPos = equacao.indexOf(mathF) + mathF.length
            let maxPos 
            let parenteses = 0
            for(let mathInd = minPos; mathInd < equacao.length; mathInd++){
                if(equacao.at(mathInd) == "("){
                    parenteses += 1
                } else if (equacao.at(mathInd) == ")"){
                    parenteses -= 1
                }

                if (parenteses == 0){
                    maxPos = mathInd
                    break
                }
            }
            let expressao = calcularExpressao(equacao.slice(minPos, maxPos + 1), 0,0,0)
            let valorCortado
            if (expressao <= 0){
                valorCortado = "erro"
            } else {
                valorCortado = Math.log10(calcularExpressao(equacao.slice(minPos, maxPos + 1), 0,0,0)) 
            }
            equacao = equacao.replace(equacao.slice(equacao.indexOf(mathF), maxPos + 1), String(valorCortado))
        }
    }
    return math.evaluate(equacao)
}

function mapRange(value, oldMin, oldMax, newMin, newMax) { //Map é uma função de regra de três bem bolada
    if(oldMin == oldMax){
        return newMin
    }
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}

//Loop da cena
function animate(){
    requestAnimationFrame(animate)
    controls.update(1)
    renderer.render(scene, camera)
}
animate()