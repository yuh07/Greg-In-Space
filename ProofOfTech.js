var tileLength = 200;
var gameHeightInTiles = 8;
var gameWidthInTiles = 6;

var scene1 = {
    preload: preload,
    create: create,
    update: update
};

var config = {
    type: Phaser.AUTO,
    width: tileLength * gameWidthInTiles,
    height: tileLength * gameHeightInTiles,
    scene: scene1,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};



var game = new Phaser.Game(config);

function preload ()
{
    
}

function create ()
{
}


function update ()
{
}