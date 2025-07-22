import { countries,removed } from "./countries.js";
import * as global from "./globals.js";

const startPlaying = setInterval(() => {
  if(global.playAllPlainFlagsGamemode){
    global.displayGameChosen();
    playAllPlainGamemode();
    clearInterval(startPlaying);
  }
},1000);

let score = 0;
let wrong = 0;
let plainHiScore = 0;
let total = countries.length;

if(localStorage.getItem("plainHiScoreSaved") !== null){
  let savedPlainHiScore = JSON.parse(localStorage.getItem("plainHiScoreSaved"));
  global.plainHiScoreDisplay.innerHTML = `Plain Hi-Score: ${savedPlainHiScore} / ${total}`;
  plainHiScore = savedPlainHiScore;
}

function playAllPlainGamemode(){
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

  global.endGameAndReset(countries,score,total,wrong);

  global.displayImage("plainFlags",flagQuestion);

  global.setAndDisplayWrongAndCorrectAnswers(flagAnswer,wrong1,wrong2,wrong3);

  play(option1,flagAnswer,randomFlag,countries);
  play(option2,flagAnswer,randomFlag,countries);
  play(option3,flagAnswer,randomFlag,countries);
  play(option4,flagAnswer,randomFlag,countries);
}

function play(option,flagAnswer,randomFlag,countryArray){
  option.onclick = () => {
    if(option.innerHTML == flagAnswer){
      removed.push(`${flagAnswer}`);
      countryArray.splice(countryArray.indexOf(randomFlag), 1);
      score++;
      scoreDisplay.innerHTML = `${score} / ${total} CORRECT It Was ${flagAnswer}`;
      if(score > plainHiScore){
        plainHiScore = score;
        global.plainHiScoreDisplay.innerHTML = `Plain Hi-Score: ${plainHiScore} / ${total}`;
        localStorage.setItem("plainHiScoreSaved", JSON.stringify(plainHiScore));
      }
      playAllPlainGamemode();
    }
    else {
      removed.push(`${flagAnswer}`);
      countryArray.splice(countryArray.indexOf(randomFlag), 1);
      wrong++;
      scoreDisplay.innerHTML = `${score} / ${total} WRONG It Was ${flagAnswer}`;
      playAllPlainGamemode();
    }
  }
}