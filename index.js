import { countries,removed } from "./countries.js";
import * as global from "./globals.js";

const startPlaying = setInterval(() => {
  if(global.playAllFlagsGamemode){
    global.displayGameChosen();
    playAllGamemode();
    clearInterval(startPlaying);
  }
},1000);

let score = 0;
let wrong = 0;
let hiScore = 0;
let total = countries.length;

if(localStorage.getItem("hiScoreSaved") !== null){
  let savedHiScore = JSON.parse(localStorage.getItem("hiScoreSaved"));
  hiScoreDisplay.innerHTML = `Hi-Score: ${savedHiScore} / ${total}`;
  hiScore = savedHiScore;
}

function playAllGamemode(){
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

  let flagQuestion = randomFlag;
  let flagAnswer = randomFlag;

  endGameAndReset();

  countryFlag.src = `flags/drawnCountries/${flagQuestion}.png`;

  let rng = global.getRandomNum();
  if(rng == 1){
    global.displayOptions(flagAnswer,wrong1,wrong2,wrong3);
    global.preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 2){
    global.displayOptions(wrong1,flagAnswer,wrong2,wrong3);
    global.preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 3){
    global.displayOptions(wrong1,wrong2,flagAnswer,wrong3);
    global.preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 4){
    global.displayOptions(wrong1,wrong2,wrong3,flagAnswer);
    global.preventsTwoCorrectAnswerShowing(flagAnswer);
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
      scoreDisplay.innerHTML = `${score} / ${total} CORRECT It Was ${fa}`;
      if(score > hiScore){
        hiScore = score;
        hiScoreDisplay.innerHTML = `Hi-Score: ${hiScore} / ${total}`;
        localStorage.setItem("hiScoreSaved", JSON.stringify(hiScore));
      }
      playAllGamemode();
    }
    else {
      removed.push(`${fa}`);
      countries.splice(countries.indexOf(rf), 1);
      wrong++;
      scoreDisplay.innerHTML = `${score} / ${total} WRONG It Was ${fa}`;
      playAllGamemode();
    }
  }
}

function endGameAndReset(){
  if(countries.length <= 0){
    global.optionBTN.forEach((e) => {
      e.style.display = `none`;
    });
    global.countryFlag.style.display = `none`;
    global.makeHiScoresVisible();
    scoreDisplay.innerHTML = `${score} / ${total} CORRECT | INCORRECT : ${wrong}`;
  }
}