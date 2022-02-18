let playerState = 'hearts';
const dropdown = document.getElementById('commands');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'images/Cards Pack/Preview.png';
const spriteWidth = 79;
const spriteHeight = 69;

let gameFrame = 0;
const staggerFrames = 37;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'diamonds',
        frames: 14
    },
    {
        name: 'clubs',
        frames: 14
    }, {
        name: 'hearts',
        frames: 13
    }, {
        name: 'spades',
        frames: 13
    },
    {
        name: 'deal',
        frames: 6
    }
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = j * spriteHeight;
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations)



function animate(){
ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
let frameX = spriteWidth * position;
let frameY = spriteAnimations[playerState].loc[position].y;
ctx.drawImage(playerImage,frameX,frameY,
    spriteWidth,spriteHeight,250,250,spriteWidth,spriteHeight)
gameFrame++;
requestAnimationFrame(animate);
}
animate();