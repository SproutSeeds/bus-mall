'use strict';

var imageElement1 = document.getElementById('left-image');
var imageElement2 = document.getElementById('center-image');
var imageElement3 = document.getElementById('right-image');

var previous1 = -1;
var previous2 = -1;
var previous3 = -1;

var count = 0;

var allImages = [];

function ConstructorImage(name) {
  this.name = name;
  this.amountOfClicks = 0;
  this.path = `img/${name}.jpg`;

  allImages.push(this);
}

var allImageTitles = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

allImageTitles.forEach(function(title){
  new ConstructorImage(title);
});
//This function gives random numbers to my three randomNumber variables.
function showRandomImage() {
  console.log('previous', previous1, previous2, previous3);

  var randomNumber1 = giveRandomNumber();
  while(randomNumber1 === previous1 || randomNumber1 === previous2 || randomNumber1 === previous3) {
    randomNumber1 = giveRandomNumber();
    console.log('WE ARE IN THE LOOP FOR RANDOM NUMBER 1');
  }
  imageElement1.src = allImages[randomNumber1].path;
  allImages[randomNumber1].amountOfClicks++;

  var randomNumber2 = giveRandomNumber();
  while(randomNumber2 === randomNumber1 || randomNumber2 === previous1 || randomNumber2 === previous2 || randomNumber2 === previous3){
    randomNumber2 = giveRandomNumber();
  }
  imageElement2.src = allImages[randomNumber2].path;
  allImages[randomNumber2].amountOfClicks++;

  var randomNumber3 = giveRandomNumber();
  while(randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2 || randomNumber3 === previous3 || randomNumber3 === previous2 || randomNumber3 === previous1){
    randomNumber3 = giveRandomNumber();
  }

  imageElement3.src = allImages[randomNumber3].path;
  allImages[randomNumber3].amountOfClicks++;

  previous1 = randomNumber1;
  previous2 = randomNumber2;
  previous3 = randomNumber3;
  console.log('Current', randomNumber1, randomNumber2, randomNumber3);
  console.log('====================');

//   if(count >= 25)
//   {
//     imageElement1.removeEventListener('click', function(event) {
//       showRandomImage(event);});
//     imageElement2.removeEventListener('click', function(event) {
//       showRandomImage(event);});
//     imageElement3.removeEventListener('click', function(event) {
//       showRandomImage(event);});

//     console.log('WE MADE IT!');
//     window.location.href = 'graph.html';
//     // var ulElement = document.getElementById('image-list');
//     // var liElement = document.createElement('li');

//     for(var i = 0; i < allImages.length; i++) {
//       console.log(`${allImages[i].amountOfClicks} votes for ${allImages[i].name}`);
//     }
//   }else{
//     console.log('nothing happened.');
//   }
}

function giveRandomNumber() {
  var randomNumber = Math.floor(allImages.length * Math.random());
  return randomNumber;
}


imageElement1.addEventListener('click', function(event) {
  showRandomImage(event);
  console.log(event.target);
  count++;
});

imageElement2.addEventListener('click', function(event) {
  showRandomImage(event);
  console.log(event.target);
  count++;
});

imageElement3.addEventListener('click', function(event) {
  showRandomImage(event);
  console.log(event.target);
  count++;
});

showRandomImage();


