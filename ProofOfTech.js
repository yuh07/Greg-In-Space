var stageWidth = 10;
var stageHeight = 6;
var tileSize = 32;
var playerObject;
var player;
var lastFrameDown = {
    right:false,
    left:false,
    up:false,
    down:false
};
var execsCollected;

var gameMatrix = new Array(stageWidth);

for(var i = 0; i<stageWidth; i++){
    gameMatrix[i] = new Array(stageHeight);
}

for(i = 0; i<stageWidth; i++){
    for(var j=0; j<stageHeight; j++){
        gameMatrix[i][j] = new tileObject(i,j,null);
    }
}

function inBounds(x,y){
    return (0<= x) && (x < stageWidth) && (0<= y) && (y <stageHeight);
}


function tileObject(x,y,sprite){
    this.x = x;
    this.y = y;
    this.foreground = sprite;
    
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
    
    this.moveUp = function(){
        this.foreground.y += -tileSize;
        this.getTileAbove().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveDown = function(){
        this.foreground.y += tileSize;
        this.getTileBelow().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveRight = function(){
        this.foreground.x += tileSize;
        this.getTileRight().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveLeft = function(){
        this.foreground.x += -tileSize;
        this.getTileLeft().foreground = this.foreground;
        this.foreground = null;
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
    this.load.image('greg',"Sprint1/Character/Character_Up.png");
    this.load.image('executive', "Sprint1/EyeBall Monster-Sheet.png")
}

function create ()
{
    player = this.physics.add.sprite(32,32,'greg');
    gameMatrix[1][1] = new tileObject(1,1,player);
    player.execsCollected = 0;
    player.name = "player";
    executive = this.physics.add.sprite(64,64,'executive');
    executive.name = "rock";
    gameMatrix[2][2] = new tileObject(2,2,executive);
    
    execsCollected = 0;
}

function update ()
{
    var cursors = this.input.keyboard.createCursorKeys();
    hasMoved = false;

    playerObject = gameMatrix[Math.floor(player.x/32)][Math.floor(player.y/32)];
    
    //move Right
    if (cursors.right.isDown && !lastFrameDown.right){
        var tileRight = playerObject.getTileRight();
        console.log(tileRight);
        if( tileRight != null){
            if(tileRight.foreground == null){
                playerObject.moveRight();
            }
            if(tileRight.foreground.name == "rock"){
                if(tileRight.getTileRight() != null){
                    if(tileRight.getTileRight().foreground == null){
                        tileRight.moveRight();
                    }
                }
            } else if(tileRight.foreground.name == "exec"){
                player.execsCollected += 1;
                playerObject.moveRight();
            }
        }
        lastFrameDown.right = true;
    } else if(cursors.right.isDown == false){
        lastFrameDown.right = false;
    }
    
    //move Left
    if (cursors.left.isDown && !lastFrameDown.left){
        var tileLeft = playerObject.getTileLeft();
        
        if(tileLeft != null){
            if(tileLeft.foreground == null){
                playerObject.moveLeft();
            }
            if(tileLeft.foreground.name == "rock"){
                if(tileLeft.getTileLeft() != null){
                    if(tileLeft.getTileLeft().foreground == null){
                        tileLeft.moveLeft();
                    }
                }
            } else if(tileLeft.foreground.name == "exec"){
                player.execsCollected += 1;
                playerObject.moveLeft();
            }
            lastFrameDown.left = true;
        }
        
    } else if(cursors.left.isDown == false){
        lastFrameDown.left = false;
    }
    
    //move Up
    if (cursors.up.isDown && !lastFrameDown.up){
        var tileAbove = playerObject.getTileAbove();
        if(tileAbove != null){
            if(tileAbove.foreground == null){
                playerObject.moveUp();
            }
            if(tileAbove.foreground.name == "rock"){
                if(tileAbove.getTileAbove() != null){
                    if(tileAbove.getTileAbove().foreground == null){
                        tileAbove.moveUp();
                    }
                }
            } else if(tileAbove.foreground.name == "exec"){
                player.execsCollected += 1;
                playerObject.moveUp();
            }
        }
        lastFrameDown.up = true;
    } else if(cursors.up.isDown == false){
        lastFrameDown.up = false;
    }
    
    //move Down    
    if (cursors.down.isDown && !lastFrameDown.down){
        var tileBelow = playerObject.getTileBelow();
        
        if(tileBelow != null){
            if(tileBelow.foreground == null){
                playerObject.moveDown();
            }
            if(tileBelow.foreground.name == "rock"){
                if(tileBelow.getTileBelow() != null){
                    if(tileBelow.getTileBelow().foreground == null){
                        tileBelow.moveDown();
                    }
                }
            } else if(tileBelow.foreground.name == "exec"){
                player.execsCollected += 1;
                playerObject.moveDown();
            }
        }
        lastFrameDown.down = true;
    } else if(cursors.down.isDown == false){
        lastFrameDown.down = false;
    }


}