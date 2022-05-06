const gameBoard = document.querySelector('.gameBoard');
const score = document.querySelectorAll('.scores');//array
// var playerOneScore = 0;
// var playerTwoScore = 0;
var clickSound = new Audio('./sounds/clickSound.mp3');
var wrongSound = new Audio('./sounds/wrong.m4a');
var rightSound = new Audio('./sounds/good job.m4a')
var totle = 0;
var playerScores = [];
var curCards = [];
// the start website.
gameBoard.innerHTML = 
`<div class="rules">
<h3> Memory Game Rules:</h3>
<p>Click two cards to match the same pictures.</p>
<p>Match one pair to get 10 points;</p>
<p>Every remaining second get 1 extra point.</p>
<p>This is a timer game, please pay attention.</p>
</div>`

// Classes the cards and back card.
class Card{
    constructor(name,src){
        this.name = name
        this.src = src
    }
}
const card1 = new Card('card1', './Image/1.jpeg')
const card2 = new Card('card2', './Image/2.jpeg')
const card3 = new Card('card3', './Image/3.jpeg')
const card4 = new Card('card4', './Image/4.jpeg')
const card5 = new Card('card5', './Image/5.jpeg')
const card6 = new Card('card6', './Image/6.jpeg')
const card7 = new Card('card7', './Image/7.jpeg')
const card8 = new Card('card8', './Image/8.jpeg')
const card9 = new Card('card9', './Image/1.jpeg')
const card10 = new Card('card10', './Image/2.jpeg')
const card11 = new Card('card11', './Image/3.jpeg')
const card12 = new Card('card12', './Image/4.jpeg')
const card13 = new Card('card13', './Image/5.jpeg')
const card14 = new Card('card14', './Image/6.jpeg')
const card15 = new Card('card15', './Image/7.jpeg')
const card16 = new Card('card16', './Image/8.jpeg')
const cards = [card1,card2,card3,card4,card5,card6,card7,card8,card9,card10,card11,card12,card13,card14,card15,card16]
const backCard = new Card('backCard','./Image/questionMark.jpeg')


// create a shuffle card function.
const shuffle = () =>{
    cards.sort(() => Math.random() - 0.5);
    console.log(cards)
    return cards;
}

var timer= document.querySelector('.time');   
var scoresall = document.querySelector('.scoresall') ;
var maxtime = 40; 
var timestart;
const startGame = () =>{
    gameBoard.innerHTML = "";
    timer.innerHTML = "Limit time:40s";
    scoresall.innerHTML = 'Scores:0';
}
const countDown = () =>{
    maxtime -= 1;
    if (maxtime >= 0) {
        msg = "Limit time:" + maxtime + "s";
        timer.innerHTML = msg;
    }
    else{
        
        clearInterval(timestart);
        playerScores.push(totle);
        scoresall.innerHTML = 'Scores:'+ totle;
        totle = 0;
        maxtime = 40;
        comparePlayers();
        
    }
}

const notMatch = () =>{
    wrongSound.play();
    curCards.forEach((a)=>{
        a.src = backCard.src;
    })
    curCards.splice(0,2);
}

// create a generate function.
const generateCards = () => {
    shuffle()
    startGame()
    timestart = setInterval(countDown,1000);
    cards.forEach((card,index) => {
        const cardItem = document.createElement('div');
        cardItem.classList = 'cardItem';
        const frontView = document.createElement('img');
        frontView.classList = 'front';
        // add the click event to every cards.
        frontView.addEventListener("click",(e) => {
            clickSound.play();
            curCards.push(e.target);
            flipCard(card,index)});
        gameBoard.appendChild(cardItem);
        cardItem.appendChild(frontView);
        frontView.src = backCard.src;
    })
    // var curCards = [];
    var frontViews = document.querySelectorAll(".front");
    function flipCard(card,index){
        // click the card to show the animals.
        frontViews[index].src = cards[index].src; 
        // when click two times.
        if(curCards.length === 2){
            // if two click aren't the same card and two cards matched.
                if(curCards[0] !== curCards[1] && curCards[0].src === curCards[1].src ){
                    // match than add scores.
                    rightSound.play();
                    totle += 10;
                    scoresall.innerHTML = 'Scores:'+ totle;
                    curCards[0].style.pointerEvents = "none";
                    curCards[1].style.pointerEvents = "none"; 
                    curCards.splice(0,2);  
                    // if all cards matched, than reset the time and scores.
                    if(totle === 80){
                        clearInterval(timestart);
                        totle += maxtime;
                        playerScores.push(totle);
                        scoresall.innerHTML = 'Scores:'+ totle;
                        totle = 0;
                        maxtime = 40;
                        
                        // compare two players scores.
                        comparePlayers();
                    }
                   
                }else {
                    setTimeout(notMatch,600);
                }
        }
    }   
}

const comparePlayers = () =>{
    if(playerScores.length===1){
        score[0].innerHTML = 'Player One:'+playerScores[0];
        gameBoard.innerHTML = 
            `<div class="rules-2">
            <h1>Click Start to Switch Player</h1>`
    }else if(playerScores.length === 2){
        score[1].innerHTML =  'Player two:'+playerScores[1];
        if(playerScores[0]>playerScores[1]){
            score[0].innerHTML = `
            <p>Player One: ${playerScores[0]}</p>
            <h3>I Win!!!</h3>`
            gameBoard.innerHTML = 
            `<div class="rules-2">
            <h3>Player One Win!</h3>
            <h3>Click New Game to Start a New Turn</h3>`
            document.querySelector('#player1').src = './Image/player1.gif';

        }else if(playerScores[1]>playerScores[0]){
            score[1].innerHTML = `
            <p>Player One: ${playerScores[1]}</p>
            <h3>I Win!!!</h3>`
            gameBoard.innerHTML = 
            `<div class="rules-2">
            <h3>Player Two Win!</h3>
            <h3>Click New Game to Start a New Turn</h3>`
            document.querySelector('#player2').src = './Image/player2.gif';
        }else{
            gameBoard.innerHTML = 
            `<div class="rules-2">
            <h3>No One Win!</h3>
            <h3>Click New Game to Start a New Turn</h3>`
        }
        
        playerScores.splice(0,2);
    }
}

const musicCheck = document.querySelector('.musicCheck');
const music =document.querySelector('.music iframe');
const musicOnOff = () =>{
    if(musicCheck.innerHTML === "On"){
        musicCheck.innerHTML = "Off";
        music.src=""
    }else{
        musicCheck.innerHTML = "On";
        music.src = "./sounds/backgroundMusic.mp3";
    }
}
