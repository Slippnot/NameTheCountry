import { countries,removed } from "./countries.js";


const countryFlag = document.getElementById("countryFlag");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const optionBTN = document.querySelectorAll(".optionBTN");
const resetBtn = document.getElementById("resetBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const hiScoreDisplay = document.getElementById("hiScoreDisplay");

getChoices();

let score = 0;
let wrong = 0;
let hiScore = 0;

if(localStorage.getItem("hiScoreSaved") !== null){
  let savedHiScore = JSON.parse(localStorage.getItem("hiScoreSaved"));
  hiScoreDisplay.innerHTML = `Hi-Score: ${savedHiScore} / 205`;
  hiScore = savedHiScore;
}

function getChoices(){
  
  let randomFlag = countries[Math.floor(Math.random() * countries.length)];
  let wrong1 = countries[Math.floor(Math.random() * countries.length)];
  let wrong2 = countries[Math.floor(Math.random() * countries.length)];
  let wrong3 = countries[Math.floor(Math.random() * countries.length)];

  if(wrong1 == wrong2 || wrong1 == wrong3){
    wrong1 = removed[Math.floor(Math.random() * removed.length)];
  }
  if(wrong2 == wrong1 || wrong2 == wrong3){
    wrong2 = removed[Math.floor(Math.random() * removed.length)];
  }
  if(wrong3 == wrong1 || wrong3 == wrong2){
    wrong3 = removed[Math.floor(Math.random() * removed.length)];
  }

  if(removed.includes("This Is Super Rare")){
    removed.shift();
  }

  let flagQuestion = randomFlag;
  let flagAnswer = randomFlag;

  endGameAndReset();

  countryFlag.src = `flags/countries/${flagQuestion}.png`;

  let rng = getRandomNum();
  if(rng == 1){
    optionChoices(flagAnswer,wrong1,wrong2,wrong3);
    preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 2){
    optionChoices(wrong1,flagAnswer,wrong2,wrong3);
    preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 3){
    optionChoices(wrong1,wrong2,flagAnswer,wrong3);
    preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 4){
    optionChoices(wrong1,wrong2,wrong3,flagAnswer);
    preventsTwoCorrectAnswerShowing(flagAnswer);
  }

  play(option1,flagAnswer,randomFlag);
  play(option2,flagAnswer,randomFlag);
  play(option3,flagAnswer,randomFlag);
  play(option4,flagAnswer,randomFlag);

}

function play(opt,fa,rf){
  opt.onclick = () => {
    if(opt.innerHTML == fa){
      removed.push(`${fa}`);
      countries.splice(countries.indexOf(rf), 1);
      score++;
      scoreDisplay.innerHTML = `${score} / 205 CORRECT It Was ${fa}`;
      if(score > hiScore){
        hiScore = score;
        hiScoreDisplay.innerHTML = `Hi-Score: ${hiScore} / 205`;
        localStorage.setItem("hiScoreSaved", JSON.stringify(hiScore));
      }
      getChoices();
    }
    else {
      removed.push(`${fa}`);
      countries.splice(countries.indexOf(rf), 1);
      wrong++;
      scoreDisplay.innerHTML = `${score} / 205 WRONG It Was ${fa}`;
      getChoices();
    }
  }
}

function optionChoices(opt1,opt2,opt3,opt4){
  option1.innerHTML = `${opt1}`;
  option2.innerHTML = `${opt2}`;
  option3.innerHTML = `${opt3}`;
  option4.innerHTML = `${opt4}`;
}

function preventsTwoCorrectAnswerShowing(fa){
  if(option1.innerHTML == fa && option2.innerHTML == fa){
    option2.innerHTML = removed[Math.floor(Math.random() * removed.length)];
  }
  if(option1.innerHTML == fa && option3.innerHTML == fa){
    option3.innerHTML = removed[Math.floor(Math.random() * removed.length)];
  }
  if(option1.innerHTML == fa && option4.innerHTML == fa){
    option4.innerHTML = removed[Math.floor(Math.random() * removed.length)];
  }
  if(option2.innerHTML == fa && option3.innerHTML == fa){
    option3.innerHTML = removed[Math.floor(Math.random() * removed.length)];
  }
  if(option2.innerHTML == fa && option4.innerHTML == fa){
    option4.innerHTML = removed[Math.floor(Math.random() * removed.length)];
  }
  if(option3.innerHTML == fa && option4.innerHTML == fa){
    option4.innerHTML = removed[Math.floor(Math.random() * removed.length)];
  }
}

function endGameAndReset(){
  if(countries.length <= 0){
    optionBTN.forEach((e) => {
      e.style.display = `none`;
    });
    countryFlag.style.display = `none`;
    hiScoreDisplay.style.display = `block`;
    scoreDisplay.innerHTML = `${score} / 205 CORRECT | INCORRECT : ${wrong}`;
    resetBtn.style.display = `block`;
    resetBtn.onclick = () => {
      location.reload();
    }
  }
}

function getRandomNum(){
  return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}