import * as THREE from 'three'; 

export class Linha {
    constructor (pontoInicial, pontoFinal, cor ) {
        this.pontoInicial = pontoInicial
        this.pontoFinal = pontoFinal
        this.cor = cor
        
            let points = [new THREE.Vector3(this.pontoInicial[0],this.pontoInicial[1],this.pontoInicial[2]), new THREE.Vector3(this.pontoFinal[0],this.pontoFinal[1],this.pontoFinal[2])]
            let geometry = new THREE.BufferGeometry().setFromPoints(points)
            let material = new THREE.LineBasicMaterial({color: this.cor})
        this.obj =  new THREE.Line(geometry, material)
    }

    
}

export class Chapeu {
    constructor (geometria, posicao, rotacao, cor) {
        this.geometria = geometria
        this.posicao = posicao
        this.rotacao = rotacao
        this.cor = cor

            let geometriaCone = new THREE.ConeGeometry(this.geometria[0],this.geometria[1],this.geometria[2]) //Radius, height, Segments
            let materialCone = new THREE.MeshBasicMaterial({color: this.cor})
        this.obj = new THREE.Mesh(geometriaCone, materialCone)
        this.obj.position.set(this.posicao[0],this.posicao[1],this.posicao[2])
        this.obj.rotation.set(this.rotacao[0],this.rotacao[1],this.rotacao[2])
    }
}

export class Plano {
    constructor (geometria, cor, opacidade, rotacao) {
        this.geometria = geometria
        this.cor = cor
        this.opacidade = opacidade
        this.rotacao = rotacao
        
            let geometriaPlano = new THREE.PlaneGeometry(this.geometria[0],this.geometria[1])
            let materialPlano = new THREE.MeshBasicMaterial({color: this.cor, transparent: true, opacity: this.opacidade, /*side: THREE.DoubleSide*/})
        this.obj = new THREE.Mesh(geometriaPlano, materialPlano)
        this.obj.rotation.set(this.rotacao[0],this.rotacao[1],this.rotacao[2])
    }
}

export class TextoView {
    constructor (texto, posicao, cor) {
        this.texto = texto
        this.posicao = posicao
        this.cor = cor

        this.obj = makeTextSprite( this.texto, { fontsize: 30, textColor: {r:this.cor[0], g:this.cor[1], b:this.cor[2], a:this.cor[3]}} );
        this.obj.position.set(this.posicao[0],this.posicao[1],this.posicao[2]);

        function makeTextSprite( message, parameters )
        {
        if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Courier New";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 1;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 10;
        var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:255, a:1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText( message );
        var textWidth = metrics.width;

        
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.clearRect(0,0,canvas.width, canvas.height)
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        //context.fillText( message, borderThickness, fontsize + borderThickness);
        context.fillText( message, (canvas.width - textWidth)/2 , (canvas.height - textWidth)/2);

        var texture = new THREE.Texture(canvas) 
        texture.transparent = true
        texture.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial( { map: texture} );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        return sprite;  
    }
    }
}

export class TextoOld {
    constructor (texto, posicao, cor) {
        this.texto = texto
        this.posicao = posicao
        this.cor = cor

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.clearRect(0,0,1000,1000);
            context.font = '80px Calibri';
            context.fillStyle = this.cor;
            context.fillText(this.texto, canvas.width/2 - 40, canvas.height/2 - 2); // Text and position

            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });

        this.obj = new THREE.Sprite(material);
        this.obj.scale.set(10,10,10); // Scale of the sprite
        this.obj.position.set(this.posicao[0],this.posicao[1],this.posicao[2])  
    }

    novoTexto(textoNovo){
        this.texto = textoNovo
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.clearRect(0,0,1000,1000);
            context.font = 'Bold 40px Arial';
            context.fillStyle = this.cor;
            context.fillText(this.texto, 0, 40); // Text and position

            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });

            // Create a sprite
            this.obj = new THREE.Sprite(material);
    }
}

export class CuboGraph1 {
    constructor (size, position, color, graphValue, graphState) {
        this.size = size
        this.position = position
        this.color = color
        this.graphValue = graphValue
        this.graphState = graphState
    }
    construct (){
        let geometry = new THREE.BoxGeometry(this.size[0],this.size[1],this.size[2])
        let material = new THREE.MeshBasicMaterial({color: this.color})
        this.obj = new THREE.Mesh(geometry, material)
        this.obj.position.set(this.position[0],this.position[1],this.position[2])
        this.obj.name = this.graphValue + "@" + this.position[0] + "@" + this.position[1] + "@" + this.position[2] + "@" + this.color
    }
}

export class CuboGraph  {
    constructor (size, position, color, graphValue, graphState){
        this.size = size
        this.position = position
        this.color = color
        this.graphValue = graphValue
        this.graphState = graphState
    }
    construct (){
    
    const geometry = new THREE.BoxGeometry( this.size[0], this.size[1], this.size[2] ).toNonIndexed();
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } ); 
    
    const positionAttribute = geometry.getAttribute( 'position' );
    const colors = [];  
    let fv = [0.9,0.5,1,0.4,0.7,0.6] //face values
    //x, -x, z, -z, y, - y
    for ( let i = 0; i < positionAttribute.count; i += 6 ) {  
        colors.push( this.color.r * fv[i/6], this.color.g * fv[i/6], this.color.b * fv[i/6] );
        colors.push( this.color.r * fv[i/6], this.color.g * fv[i/6], this.color.b * fv[i/6] );
        colors.push( this.color.r * fv[i/6], this.color.g * fv[i/6], this.color.b * fv[i/6] );
        colors.push( this.color.r * fv[i/6], this.color.g * fv[i/6], this.color.b * fv[i/6] );
        colors.push( this.color.r * fv[i/6], this.color.g * fv[i/6], this.color.b * fv[i/6] );
        colors.push( this.color.r * fv[i/6], this.color.g * fv[i/6], this.color.b * fv[i/6] );
    } 
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    this.obj = new THREE.Mesh( geometry, material );
    this.obj.position.set(this.position[0],this.position[1],this.position[2])
    this.obj.name = this.graphValue + "@" + this.position[0] + "@" + this.position[1] + "@" + this.position[2] + "@" + this.color.r + "@" + this.color.g + "@" + this.color.b
    }
}