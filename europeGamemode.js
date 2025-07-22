import { europeanCountries,removed } from "./countries.js";
import * as global from "./globals.js";

const startPlaying = setInterval(() => {
  if(global.playAllEuropeFlagsGamemode){
    global.displayGameChosen();
    playEuropeanGamemode();
    clearInterval(startPlaying);
  }
});

let score = 0;
let wrong = 0;
let europeHiScore = 0;
let total = europeanCountries.length;

if(localStorage.getItem("europeHiScoreSaved") !== null){
  let savedEuropeHiScore = JSON.parse(localStorage.getItem("europeHiScoreSaved"));
  global.europeHiScoreDisplay.innerHTML = `Europe Hi-Score ${savedEuropeHiScore} / ${total}`;
  europeHiScore = savedEuropeHiScore;
}

function playEuropeanGamemode(){
  let randomFlag = europeanCountries[Math.floor(Math.random() * europeanCountries.length)];
  let wrong1 = europeanCountries[Math.floor(Math.random() * europeanCountries.length)];
  let wrong2 = europeanCountries[Math.floor(Math.random() * europeanCountries.length)];
  let wrong3 = europeanCountries[Math.floor(Math.random() * europeanCountries.length)];

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

  global.endGameAndReset(europeanCountries,score,total,wrong);

  global.displayImage("drawnCountries",flagQuestion);

  global.setAndDisplayWrongAndCorrectAnswers(flagAnswer,wrong1,wrong2,wrong3);

  play(option1,flagAnswer,randomFlag);
  play(option2,flagAnswer,randomFlag);
  play(option3,flagAnswer,randomFlag);
  play(option4,flagAnswer,randomFlag);
}

function play(opt,fa,rf){
  opt.onclick = () => {
    if(opt.innerHTML == fa){
      removed.push(`${fa}`);
      europeanCountries.splice(europeanCountries.indexOf(rf), 1);
      score++;
      scoreDisplay.innerHTML = `${score} / ${total} CORRECT It Was ${fa}`;
      if(score > europeHiScore){
        europeHiScore = score;
        global.europeHiScoreDisplay.innerHTML = `Europe Hi-Score ${europeHiScore} / ${total}`;
        localStorage.setItem("europeHiScoreSaved", JSON.stringify(europeHiScore));
      }
      playEuropeanGamemode();
    }
    else {
      removed.push(`${fa}`);
      europeanCountries.splice(europeanCountries.indexOf(rf), 1);
      wrong++;
      scoreDisplay.innerHTML = `${score} / ${total} WRONG It Was ${fa}`;
      playEuropeanGamemode();
    }
  }
}