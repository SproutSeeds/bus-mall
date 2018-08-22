'use strict';

///////Global Variables live here///////
var imageElement1 = document.getElementById('left-image');
var imageElement2 = document.getElementById('center-image');
var imageElement3 = document.getElementById('right-image');
var container = document.getElementById('container');

var previous1 = -1;
var previous2 = -1;
var previous3 = -1;

var count = 0;
var userCount = 0;

///////////Arrays Live Here/////////
var allImages = [];
var voterCounter = [];
//gave this constructor function a new signature in relative to its properties
function ConstructorImage(name, amountShown, amountOfClicks) {
  this.name = name;
  this.amountShown = amountShown || 0;
  this.path = `img/${name}.jpg`;
  this.amountOfClicks = amountOfClicks || 0;

  allImages.push(this);
}

var allImageTitles = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

//Local Storage check
window.onload = objectInstorageCheck();

/////////Function Declarations Live here///////////
function showRandomImage() {
  // console.log('previous', previous1, previous2, previous3);

  var randomNumber1 = giveRandomNumber();
  while(randomNumber1 === previous1 || randomNumber1 === previous2 || randomNumber1 === previous3) {
    randomNumber1 = giveRandomNumber();
    // console.log('WE ARE IN THE LOOP FOR RANDOM NUMBER 1');
  }
  imageElement1.src = allImages[randomNumber1].path;
  imageElement1.title = allImageTitles[randomNumber1];
  allImages[randomNumber1].amountShown++;

  var randomNumber2 = giveRandomNumber();
  while(randomNumber2 === randomNumber1 || randomNumber2 === previous1 || randomNumber2 === previous2 || randomNumber2 === previous3){
    randomNumber2 = giveRandomNumber();
  }
  imageElement2.src = allImages[randomNumber2].path;
  imageElement2.title = allImageTitles[randomNumber2];
  allImages[randomNumber2].amountShown++;

  var randomNumber3 = giveRandomNumber();
  while(randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2 || randomNumber3 === previous3 || randomNumber3 === previous2 || randomNumber3 === previous1){
    randomNumber3 = giveRandomNumber();
  }

  imageElement3.src = allImages[randomNumber3].path;
  imageElement3.title = allImageTitles[randomNumber3];
  allImages[randomNumber3].amountShown++;

  previous1 = randomNumber1;
  previous2 = randomNumber2;
  previous3 = randomNumber3;
  // console.log('Current', randomNumber1, randomNumber2, randomNumber3);
  // console.log('====================');
}

function giveRandomNumber() {
  var randomNumber = Math.floor(allImages.length * Math.random());
  return randomNumber;
}

function endGame() {
  container.removeEventListener('click', handleClick, false);

  for(var i = 0; i < allImages.length; i++){
    voterCounter[i] = allImages[i].amountOfClicks;
  }
  userCount = 0;
  localStorage.setItem('user-count', userCount);
  // hide the container element
  container.style.display = 'none';
  localStorage.setItem('images-array', JSON.stringify(allImages));
  chartCreation();
}

function handleClick(event){
  console.log(event.target);
  for(var i = 0; i < allImages.length; i++) {
    if(allImages[i].name === event.target.title){
      console.log(allImages[i]);
      allImages[i].amountOfClicks++;
      console.log(allImages[i]);
    }
  }
  localStorage.setItem('images-array', JSON.stringify(allImages));

  count++;
  if(count >= 25) {
    endGame();
  } else {
    localStorage.setItem('user-count', count);

  }
  showRandomImage();
}
function chartCreation(){
  var ctx = document.getElementById('canvas').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allImageTitles,
      datasets: [{
        label: '# of Votes',
        data: voterCounter,
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',

        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
/////////EVENT LISTENER LIVES HERE///////////
container.addEventListener('click', handleClick);

function objectInstorageCheck() {

  if(!localStorage.getItem('images-array')){
    allImageTitles.forEach(function(title){
      new ConstructorImage(title);
    });
    console.log('You do not have the allImages array of objects in locale storage.');
  } else {
    count = JSON.parse(localStorage.getItem('user-count'));
    var retrievedObjects = JSON.parse(localStorage.getItem('images-array'));
    console.log(retrievedObjects);
    retrievedObjects.forEach(function(product) {
      new ConstructorImage(product.name, product.amountShown, product.amountOfClicks);
    });
    console.log('You do have the allImages array in locale storage');
  }
}

showRandomImage();



