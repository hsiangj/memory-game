document.addEventListener('DOMContentLoaded',function(){

  let numCards = 0;
  let firstSelection = "";
  let secondSelection = "";
  let lockBoard = false;
  let clickBoard = document.querySelector(".clickBoard");
  let clicks = 0;
  let highscoreBoard = document.querySelector(".highscoreBoard");
  let highscore = localStorage.getItem('highscore') || 0;
  const cards = document.querySelectorAll(".cards .card");


  //shuffle card
  function shuffleCards(){
  const cardsToShuffle = document.querySelectorAll(".cards .card"); 
    for (let card of cardsToShuffle){
      let randomPos = Math.floor(Math.random()*cardsToShuffle.length);
      card.style.order = randomPos;
    }
  }
  shuffleCards(); 
  
  
  function loadGame(){
  
  highscoreBoard.innerHTML = highscore;

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
      const gameFinished = checkGameFinished(cards);
      if (gameFinished) {
        setHighscore(highscore, clicks);
        alert('Game over! Click restart to play again.')
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
  
  function checkGameFinished(cards){
    return Array.from(cards).every(card => card.classList.contains('correct'));
  }

  function setHighscore(highscore=0, clicks){
    console.log('setHighscore:', highscore, 'clicks', clicks)
    if(clicks<highscore || highscore === 0){
      localStorage.setItem('highscore', clicks);
      highscoreBoard.innerHTML = clicks;
      alert('Congratulations on the new high score: ' + clicks);
    }
  }


  })

