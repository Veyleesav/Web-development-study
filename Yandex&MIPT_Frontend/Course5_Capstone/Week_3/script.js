var cardFlipped=0;
var currentEmoji='';
var currentCard=0;
var currentCardMain=0;
var wrongCards=0;
function flip(event){
    let element = event.currentTarget;
    if (element.className === "thecard") {
        console.log('WRONG LENGTH: '+document.getElementsByClassName('wrong').length);
        if (document.getElementsByClassName('wrong').length>0){
            wrongCards=document.getElementsByClassName('wrong');
            for (let i=0; i<wrongCards.length;i++){             //to reset wrong cards after click
                if (wrongCards[i].style.transform == "rotateY(180deg)"){
                    wrongCards[i].style.transform = "rotateY(0deg)";
                    console.log('FINISHED I');
                    console.log('len: '+ wrongCards.length)
                }

            }
            while (wrongCards.length>0){  //removing 'wrong' classes
                wrongCards[0].classList.remove('wrong');
                console.log('len: '+ wrongCards.length)

            }

            wrongCards=0;
        }
        if(element.style.transform == "rotateY(180deg)") {
            element.style.transform = "rotateY(0deg)";
            currentEmoji='';
            currentCardMain=0;
            currentCard=0;
            --cardFlipped;
            console.log(cardFlipped);
        }
        else {
            element.style.transform = "rotateY(180deg)";
            ++cardFlipped;
            console.log(cardFlipped);
            if (currentEmoji.length<1){
                currentEmoji=element.children[1].lastChild.lastChild.id; //Saving the id of this card to currentEmoji variable
                currentCardMain=element;
                currentCard=element.children[1];
                console.log('CURRENT EMOJI: '+currentEmoji);
                console.log('THIS EMOJI CARD VALUE: '+element.children[1].lastChild.lastChild.dataset.value);
                console.log('CURRENT CARD:'+ currentCard);
            }
            else {
                if (element.children[1].lastChild.lastChild.dataset.value===document.getElementById(currentEmoji).dataset.value){ //in case if cards are equal
                    element.children[1].className+=' right';
                    element.className+=' right';
                    currentCard.className+=' right';
                    currentCardMain.className+=' right';
                    cardFlipped=0;
                    currentEmoji='';
                    currentCardMain=0;
                    currentCard=0;

                }
                else{               //in case if cards are wrong
                    element.children[1].className+=' wrong';
                    element.className+=' wrong';
                    currentCard.className+=' wrong';
                    currentCardMain.className+=' wrong';
                    cardFlipped=0;
                    currentEmoji='';
                    currentCardMain=0;
                    currentCard=0;
                }
            }

        }
    }
};
function shuffle(){
    let cardArray=['card-1','card-2','card-3','card-4','card-5','card-6','card-7','card-8','card-9','card-10','card-11','card-12'];
    let emojiArray=['🐰','🐻','🦁','🐷','🐸','🦄','🐰','🐻','🦁','🐷','🐸','🦄'];
    let shuffleCards = function() {
        while (emojiArray.length>0){
            let cardId = Math.round(Math.random() * (cardArray.length - 1));
            let card=cardArray[cardId];
            let emojiId = Math.round(Math.random() * (emojiArray.length - 1));
            document.getElementById(card).innerHTML = emojiArray[emojiId];
            document.getElementById(card).setAttribute('data-value',emojiArray[emojiId]);
            emojiArray.splice(emojiId, 1);
            cardArray.splice(cardId, 1);
            console.log(emojiArray);
        }
    };
    shuffleCards();
}

//timer
var timeleft = 60;
var isCounting=true;
function timer() {
    if (timeleft===60){
        startTimer();
    }

}
function startTimer() {
    isCounting=true;
    var downloadTimer = setInterval(function(){
        timeleft--;
        document.getElementById("countdowntimer").textContent = '00:'+timeleft;
        if(timeleft <= 0 || isCounting!==true){
            clearInterval(downloadTimer);
            document.getElementById("countdowntimer").textContent = '00:'+timeleft;
            gameStop();
        }

    },1000);
}
function stopTimer() {
    isCounting=false;
}
function resetTimer() {
    document.getElementById("countdowntimer").textContent = '01:'+'00';
    timeleft=60;
}

function flipCardsDown() {
    var cardsFlipped=document.getElementsByClassName('thecard');
    let wrongCards=document.getElementsByClassName('wrong');
    let rightCards=document.getElementsByClassName('right');
    for (let i=0; i<cardsFlipped.length;i++)
        if(cardsFlipped[i].style.transform == "rotateY(180deg)") {
            cardsFlipped[i].style.transform = "rotateY(0deg)";
            console.log(cardFlipped);
        }
    while (wrongCards.length>0){  //removing 'wrong' classes
        wrongCards[0].classList.remove('wrong');
        console.log('KEKS: '+ wrongCards.length)

    }
    while (rightCards.length>0){  //removing 'right' classes
        rightCards[0].classList.remove('right');
        console.log('PEKS: '+ rightCards.length)
    }
}
function restart() {
    flipCardsDown();
    stopTimer();
    setTimeout(resetTimer(), 1000);//TODO: MAKE IT STABLE, DOESN`T ALWAYS GET IN TIME TO STOP COUNTING
    shuffle();
    var cardFlipped=0;
    var currentEmoji='';
    var currentCard=0;
    var currentCardMain=0;
    var wrongCards=0;
    document.getElementById('modal').classList+=' closed';
    document.getElementById('modal-overlay').classList+=' closed';
    console.log('THE GAME RESTARTED.');
}

//Modal

// Wrap every letter in a span
function animate() {
    function wrapChars(str, tmpl) {                               //replacement with regexp
        return str.replace(/\w/g, tmpl || "<span>$&</span>");
    }
    let word=document.getElementById('moving-letters');
    console.log(word.innerHTML);
    word.innerHTML=wrapChars(word.innerHTML);
    console.log(word.innerHTML);
}

//checking if the player won
var hasWon=false;
function winCheck() {
    if (document.getElementsByClassName('right').length>=24) {
        document.getElementById('moving-letters').innerHTML='Win';
        animate();
        document.getElementById('modal').classList.remove('closed');
        document.getElementById('modal-overlay').classList.remove('closed');
        stopTimer();
    }
}
function gameStop() {
    document.getElementById('moving-letters').innerHTML='Lose';
    animate();
    document.getElementById('modal').classList.remove('closed');
    document.getElementById('modal-overlay').classList.remove('closed');
}
