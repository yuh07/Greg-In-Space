var stageWidth = 10;
var stageHeight = 6;
var tileSize = 32;
var lastTime = Date.now();
var timeBetweenInputs = 50;

var gameMatrix = function createGameMatrix(n,m){
    var mat = new Array(n);
    for(var i = 0; i<n; i++){
        mat[i] = new Array(m);
    }
    for(var i = 0; i<n; i++){
        for(var j=0; j<m; j++){
            mat[i][j] = new tileObject(i,j,"empty");
        }
    }
    return mat
}(stageWidth,stageHeight);

function inBounds(x,y){
    return (0<= x < stageWidth && 0<= y <stageHeight)
}

function tileSwap(x1,y1,x2,y2){
    var placeholder = gameMatrix[x1][y1];
    gameMatrix[x1][y1] = gameMatrix[x2][y2];
    gameMatrix[x2][y2] = placeholder;
}

function tileObject(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    
    this.getTileAbove =  function(){
        return inBounds(this.x,this.y-1) ? gameMatrix[this.x][this.y-1] : null;
    };
    this.getTileBelow =  function(){
        return inBounds(this.x,this.y+1) ? gameMatrix[this.x][this.y+1] : null;
    };
    this.getTileRight =  function(){
        return inBounds(this.x+1,this.y) ? gameMatrix[this.x+1][this.y] : null;
    };
    this.getTileLeft =  function(){
        return inBounds(this.x-1,this.y) ? gameMatrix[this.x-1][this.y] : null;
    };
    
    this.isEmpty = function(){
        return !false;
    };
    
    this.moveUp = function(){
        if(inBounds(this.x,this.y-1)){
            if(gameMatrix[this.x][this.y-1].sprite.name == "empty"){
                tileSwap(this.x,this.y,this.x,this.y-1);
            }
        }
    };
    
    this.moveDown = function(){
        if(inBounds(this.x,this.y+1)){
            if(gameMatrix[this.x][this.y+1].sprite.name == "empty"){
                tileSwap(this.x,this.y,this.x,this.y+1);
            }
        }
    };
    
    this.moveRight = function(){
        if(inBounds(this.x+1,this.y)){
            if(gameMatrix[this.x+1][this.y].sprite.name == "empty"){
                tileSwap(this.x+1,this.y,this.x,this.y);
            }
        }
    };
    
    this.moveLeft = function(){
        if(inBounds(this.x-1,this.y)){
            if(gameMatrix[this.x-1][this.y].sprite.name == "empty"){
                tileSwap(this.x-1,this.y,this.x,this.y);
            }
        }
    };
    
}

var scene = {
    preload: preload,
    create: create,
    update: update
};

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: scene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};



var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('greg',"Greg in Space Assets/Character/Character_Up.png");
}

function create ()
{
    player = this.physics.add.sprite(32,32,'greg');
    playerObject = new tileObject(1,1,player);
    
}


function update ()
{
    var cursors = this.input.keyboard.createCursorKeys();
    
    if (Date.now()-lastTime > timeBetweenInputs){
        if (cursors.right.isDown){
            if(playerObject.getTileRight().isEmpty){
                player.x = player.x + tileSize;
                lastTime = Date.now();
                playerObject.moveRight();
            }
        } else if(cursors.left.isDown){
            player.x = player.x - tileSize;
            lastTime = Date.now();
        } else if (cursors.up.isDown){
            player.y = player.y - tileSize;
            lastTime = Date.now();
        } else if(cursors.down.isDown){
            player.y = player.y + tileSize;
            lastTime = Date.now();
        }
    }
}