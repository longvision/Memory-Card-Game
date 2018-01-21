/*
 * Create a list that holds all of your cards
 */
var Cards = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o",
"fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube",
"fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];
//Stores the array of open cards turned on the table.

//Stores the shuffled cards when game begins.
var shuffledDeck=[];



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//shuffle the cards when game starts.

shuffledDeck=shuffle(Cards);


// HTML elements creation for deck and cards

$('.container').append('<ul class="deck"></ul>');
for (var i = 0;i < Cards.length;i++){
  $('.deck').prepend('<li class="card"></li>');
}
$('.card').prepend('<i></i>');
for (var i = 0;i < Cards.length;i++){
  $('.card').eq(i).find('i').addClass(shuffledDeck[i]);
}


//Restart the game and reload the table.

$('.restart').click(function(){
  location.reload();
 });

let seconds=0;
let minutes=0;
let hours=0;
let h, min, sec;
let updateTime;



function clock(){
    if(seconds === 60){
      seconds = 0;
      minutes = minutes + 1;
    }
    if(minutes === 60){
      minutes = 0;
      hours=hours+1;
    }
    h=(hours<10)?('0'+hours+': '):(hours + ': ');
    min=(minutes<10)?('0'+minutes+': '):(minutes + ': ');
    sec=( seconds < 10 ) ? ( '0' + seconds ) : ( seconds );
    let time= h + min + sec;
    $('.container').find('.timer').html(time);
    seconds++;
    updateTime = setTimeout("clock()", 1000);
}

function endGame(){
var modalReplay=$('.modal-element').eq(3);
var modalStars=$('.modal-element').eq(2);
var modalMoves=$('.modal-element').eq(1);
var modalTime=$('.modal-element').eq(0);

$('.stars').clone().appendTo(modalStars);
$('.moves').clone().appendTo(modalMoves);
$('.timer').clone().appendTo(modalTime);
$('.restart').clone().appendTo(modalReplay);
$('.restart').click(function(){
  location.reload();
 });
}

function startTime(){
  if(seconds ===0 && minutes ===0 && hours ===0){
  clock();
  }
}

function stopTime(){
  if(seconds !==0 || minutes !==0 || hours!==0){
    let time= h + min + sec;
    $('.container').find('.timer').html(time);
    clearTimeout(updateTime);
    endGame();
  }
}
let openCards=[];
let cardsUp=0;
let movesCount=0;
$('.deck').on('click','.card', function(event){
    startTime();

    /*Essential condition for flipping a card i.e. a card may be flipped only if class='card' is present which is true always and only one other card is open.*/
    if($(this).attr('class')==='card' && openCards.length<2){
    //Class name of a open card is pushed to opencards array when only one card is opened.
      if (openCards.length===0){
        $(this).toggleClass('show');
        openCards.push($(this).children().attr('class'));
      }
      else if(openCards.length===1){
        $(this).toggleClass('show');
        openCards.push($(this).children().attr('class'));

      //Comparison of two open cards-If matched
        if (openCards[0]===openCards[1]){
            $('.card').filter($('.show')).toggleClass('show match');
            //Increases the number os cards turned up by two in the list.
            cardsUp=cardsUp+2;
            //Increases the number of movement made after clicked on a card.
            movesCount=movesCount+1;
            $('.moves').text(movesCount);
            //Clears the comparison array list.
            openCards=[];
        }
        else{
          function flipBack(){
          $('.card').filter($('.show')).toggleClass('show');
          openCards = [];
          movesCount=movesCount+1;
          $('.moves').text(movesCount);
          }
        setTimeout(flipBack, 600);
        }
      }
      //starRating
      if(movesCount > 10 && movesCount < 16){
        $('.stars').find('li').eq(2).css('display','none');
      }
      if(movesCount > 16){
        $('.stars').find('li').eq(1).css('display','none');
      }
    }
      if (cardsUp === Cards.length) {
          stopTime();
          $('.modal').css('display','block');
  }
  });
