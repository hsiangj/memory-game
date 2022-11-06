document.addEventListener('DOMContentLoaded',function(){

  let numCards = 0;
  let firstSelection = "";
  let secondSelection = "";
  let lockBoard = false;
  let clickBoard = document.querySelector(".clickBoard");
  let clicks = 0;
  const cards = document.querySelectorAll(".cards .card");


  //shuffle card
  // function shuffleCards(){
  // const cardsToShuffle = document.querySelectorAll(".cards .card"); 
  //   for (let card of cardsToShuffle){
  //     let randomPos = Math.floor(Math.random()*cardsToShuffle.length);
  //     card.style.order = randomPos;
  //   }
  // }
  // shuffleCards(); 
  
  function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
  
      // Decrease counter by 1
      counter--;
  
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
  
    return array;
  }


  function loadGame(){
  for (let card of cards){
   
  card.addEventListener('click',function(){
    if(lockBoard) return;  
    card.classList.add('clicked');
    //avoid same card being clicked twice
    card.classList.add('disabled'); 
    clicks += 1;
    clickBoard.innerHTML = clicks;

    if(numCards === 0){
      firstSelection = card.getAttribute("character");
      numCards++;
    }else if (numCards === 1){
      secondSelection = card.getAttribute("character");
      numCards = 0;
      
      
//check for match
      if (firstSelection === secondSelection) {
        const correctCards = document.querySelectorAll(".card[character=" +CSS.escape(firstSelection) + "]");

        correctCards[0].classList.add('correct');
        correctCards[0].classList.remove('clicked');
        correctCards[1].classList.add('correct');
        correctCards[1].classList.remove('clicked');
      } else {
        const incorrectCards = document.querySelectorAll(".card.clicked");
        lockBoard = true;
        setTimeout(function(){
          incorrectCards[0].classList.remove('clicked');
          incorrectCards[1].classList.remove('clicked');
          incorrectCards[0].classList.remove('disabled'); 
          incorrectCards[1].classList.remove('disabled');
          lockBoard = false;
        },1000);
      }
    }
    
   
  })  
  }
}
  loadGame();

  function resetGame(){
  const restartButton = document.getElementById('restart-btn');
  restartButton.addEventListener('click',function(){
    shuffleCards(cards);
    for (let card of cards){
      card.classList.remove('clicked','correct','disabled');
    }
    clicks = 0;
    clickBoard.innerHTML = clicks;
  })}
  resetGame();
  

  })

