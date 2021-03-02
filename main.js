var cardsArray = [
  {    'name': 'CSS',    'img': 'https://cdn.drawception.com/images/avatars/848542-3E2.jpg?raw=true',  },
  {    'name': 'HTML',    'img': 'https://pbs.twimg.com/media/EZCRgu-WAAIwEBx.png',  },
  {    'name': 'jQuery',    'img': 'https://i.redd.it/wggff5tz8sw21.jpg?raw=true',  },
  {    'name': 'JS',    'img': 'https://static.wikia.nocookie.net/meme/images/f/fa/E.png/revision/latest/scale-to-width-down/340?cb=20180606022633?raw=true',  },
  {    'name': 'Node',    'img': 'https://lh3.googleusercontent.com/proxy/kskhj6bN_D06YkdJ6Ec-_30sQLRxcgVXAfWDy9ec-CnLNBgJMhEl4kG1gHVahTRPsqAqbLiSeXDzLIHzzUdxxzbSe331Sj7PqqoCEtPHjC4LonoVVAWf3BOtAnSO0cAUq1NHIwmAL4unK_nVMlWng5p6V0JpWtws98SvKnpRsw3YMQMjtgfePg?raw=true',  },
  {    'name': 'Photo Shop',    'img': 'https://steamuserimages-a.akamaihd.net/ugc/396679215190883236/A704D3410DCE4CDA368B20A81558A4BA4EB8D663/?raw=true',  },
  {    'name': 'PHP',    'img': 'https://lh3.googleusercontent.com/proxy/rJLr7mMCTYIj_Rp5iKENGrhiJepAoqUDdeaLtB3kuJSSG2_BoE5McpA8OeUBf0HLyzgwS-xcpzIEHoZ_SQ',  },
  {    'name': 'Python',    'img': 'https://i.pinimg.com/474x/14/15/b8/1415b85f8e1f7e1cdb9dfdc246926825.jpg',  },
  {    'name': 'Ruby',    'img': 'https://github.com/Banana1265/Matching/blob/main/chciken%20nugget.jpg?raw=true',  },
  {    'name': 'Sass',    'img': 'http://pa1.narvii.com/6864/46e6a4307c9cb1919313548dcde13be7fda95a68r1-226-236_00.gif',  },
  {    'name': 'Sublime',    'img': 'https://i.redd.it/m1h5xf88m5g61.jpg',  },
  {    'name': 'Wordpress',    'img': 'https://media1.tenor.com/images/cfa722629239e703540567e49f5ef754/tenor.gif?itemid=15958289',  },
];

// Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(function() {
  return 0.5 - Math.random();
})

// Grab the div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');
// Create a section element and assign it to variable grid
var grid = document.createElement('section');
// Give section element a class of grid.
grid.setAttribute('class', 'grid');
// Append the grid section to the game-board div
game.appendChild(grid);

// Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++) {
  // create a div element and assign to variable card
  var card = document.createElement('div');
  // Apply a card class to that div
  card.classList.add('card');
  // Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = gameGrid[i].name;

  // Create front of card
  var front = document.createElement('div');
  front.classList.add('front');

  // Create back of card
  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${gameGrid[i].img})`;

  // Append card to grid
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';
// Set count to 0
var count = 0;
var previousTarget = null;
var delay = 1200;

// Add match CSS
var match = function() {
  var selected = document.querySelectorAll('.selected');
  // loop through the array like object containing `selected` class
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
};

// Reset guesses after two attempts
var resetGuesses = function() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
  }
};


// Add event listener to grid
grid.addEventListener('click', function(event) {
  // Declare variable to target our clicked item
  var clicked = event.target;
  // Do not allow the grid section itself to be selected;
  // only select divs inside the grid
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  // We only want to add `selected` class if the current count is less than 2
  if (count < 2) {
    count++;

    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    // If both guesses are not empty
    if (firstGuess !== '' && secondGuess !== '') {
      // And the firstGuess matches secondGuess
      if (firstGuess === secondGuess) {
        // Run the match function
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});
  
