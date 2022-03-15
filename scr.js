
let suits = ['♥', '♣', '♦', '♠'];
let values = ['A', 'K', 'Q', 'J',
  '10', '9', '8', '7', '6',
  '5', '4', '3', '2'
];

const plucked = {
  "A": "images/cards/1.png",
  "K": "images/cards/7.png",
  "Q": "images/cards/9.png",
  "J": "images/cards/16.png",
  "10": "images/cards/19.png",
  "9": "images/cards/22.png" ,
  "8": "images/cards/27.png" ,
  "7": "images/cards/32.png",
  "6": "images/cards/35.png",
  "5": "images/cards/38.png" ,
  "4": "images/cards/43.png",
  "3": "images/cards/46.png" ,
  "2": "images/cards/50.png"
}

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');


let gameStart = false,
  gameOver = false,
  playWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
})

function createDeck() {
  let deck = []
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      }
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for(let i=0; i<deck.length; i++)
  {
    let swapIdx = Math.trunc(Math.random() *deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

const pluckedCard = (cardsuit) => {
  // console.log(cardsuit)
  let cardsuits = document.querySelector(".cardsuits");
  // cardsuit.style.display = "none"

  //show pluckedCard
  // let 


//the user plugged cards
document.getElementById("pluckedImage").src = plucked[cardsuit]
} 

function checkForEndOfGame(){
  updateScores();
  
  if(gameOver){
    while(dealerScore<playerScore &&
          playerScore <=21 &&
          dealerScore <=21){
            dealerCards.push(getNextCard());
            updateScores();
    }
  }
    
    if(playerScore>21){
      playerWon=false;
      gameOver = true;
    }
    
    else if(dealerScore>21){
      playerWon = true;
      gameOver = true;
    }
    
    else if(gameOver){
      if(playerScore>dealerScore){
        playerWon = true;
      }
      else{
        playerWon = false;
      }
    }
}

function getCardString(card) {
  return card.value + " of " + card.suit;
}


function getHTML() {
  const cardDiv = document.createElement('div')
  cardDiv.textArea.innerText = this.suit
  cardDiv.classList.add('cardsuit')
  cardDiv.dataset.value = src.plucked[cardsuit]
}
// function getCardNumericValue(card){
//   if(card.value == '1'){
//     return 1
//   } if (card.value == '2'){
//     return 2
//   }
//   if (card.value == '3'){
//     return 3
//   } if (card.value == '4'){
//     return 4
//   } if (card.value == '5'){
//     return 5
//   } if (card.value == '6'){
//     return 6
//   } if (card.value == '7'){
//     return 7
//   } if (card.value == '8'){
//     return 8
//   } if (card.value == '9'){
//     return 9
//   } if (card.value == 'A' && score > 21){
//     return 1
//   } else if (card.value == 'A' && score < 21){
//     return 11
//   } else {
//     return 10
//   }
// }
function getCardNumericValue(card){
  switch(card.value){
    case 'A':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
      // case 'A':
      //   return 1 
    default:
      return 10; 
  }
}
function showStatus()
{
  if(!gameStarted)
  {
    textArea.innerText = 'Welcome to Blackjack!';
    return; 
  }
    
  
  let dealerCardString = '';
  for(let i=0; i<dealerCards.length; i++)
  {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  let playerCardString='';
  for(let i=0; i<playerCards.length; i++)
  {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText = 'Dealer has:\n' + dealerCardString + '(score: ' + dealerScore + ')' + '\n' + '\n' +

                        
                        'Player has:\n' + playerCardString + '(score: ' + playerScore + ')';
                        
  if(gameOver){
    if(playerWon)
    {
      textArea.innerText += "YOU WIN!";
    }
    else{
      textArea.innerText += "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
}


function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value == 'A'){
      hasAce = true;
    }
    
    if(hasAce == true && score == 11 ){
  // alert("Do you want your Ace to count as a value of 1 or 11?")
      return score + 10;
    }
  } 
  if (hasAce == true && score + 10 < 21){

return score + 10
  }
   return score; 
}


function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards); 
}


function getNextCard() {
  return deck.shift();
}
