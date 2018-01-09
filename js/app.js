/*
 * Create a list that holds all of your cards
 */
var Cards = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o",
"fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube",
"fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];
//Stores the array of open cards turned on the table.
var openCards=[];
//Stores the shuffled cards when game begins.
var shuffledDeck=[];
var cardsUp=0;
var movesCount=0;

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
/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */





  $('.deck').on('click','.card', function(event){
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
    }
  });
