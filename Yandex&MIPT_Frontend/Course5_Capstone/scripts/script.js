function flip(event){
    let element = event.currentTarget;
    if (element.className === "thecard") {
        if(element.style.transform == "rotateY(180deg)") {
            element.style.transform = "rotateY(0deg)";
        }
        else {
            element.style.transform = "rotateY(180deg)";
        }
    }
};
function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
var cardArray=['card-1','card-2','card-3','card-4','card-5','card-6','card-7','card-8','card-9','card-10','card-11','card-12']
var emojiArray=['🐰','🐻','🦁','🐷','🐸','🦄','🐰','🐻','🦁','🐷','🐸','🦄'];
var shuffleCards = function() {
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