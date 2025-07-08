import { countries } from "./countries.js";


const countryFlag = document.getElementById("countryFlag");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

let randomFlag = countries[Math.floor(Math.random() * countries.length)];
let wrong1 = countries[Math.floor(Math.random() * countries.length)];
let wrong2 = countries[Math.floor(Math.random() * countries.length)];
let wrong3 = countries[Math.floor(Math.random() * countries.length)];
console.log(wrong1,wrong2,wrong3)

let flagQuestion = randomFlag;
let flagAnswer = randomFlag;

countryFlag.src = `flags/countries/${flagQuestion}.png`;


function chooseOptions(){
  let rng = getRandomNum();
  if(rng == 1){
    option1.innerHTML = `${flagAnswer}`;
    option2.innerHTML = `${wrong1}`;
    option3.innerHTML = `${wrong2}`;
    option4.innerHTML = `${wrong3}`;
  }
  if(rng == 2){
    option2.innerHTML = `${flagAnswer}`;
  }
  if(rng == 3){
    option3.innerHTML = `${flagAnswer}`;
  }
  if(rng == 4){
    option4.innerHTML = `${flagAnswer}`;
  }
}

function getRandomNum(){
  return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}
chooseOptions();