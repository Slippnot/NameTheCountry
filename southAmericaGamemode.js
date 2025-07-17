import { southAmericanCountries,removed } from "./countries.js";
import * as global from "./globals.js";

const startPlaying = setInterval(() => {
  if(global.playAllSouthAmericaFlagsGamemode){
    global.displayGameChosen();
    playSouthAmericanGamemode();
    clearInterval(startPlaying);
  }
});

let score = 0;
let wrong = 0;
let saHiScore = 0;
let total = southAmericanCountries.length;

if(localStorage.getItem("southAmericaHiScoreSaved") !== null){
  let savedSaHiScore = JSON.parse(localStorage.getItem("southAmericaHiScoreSaved"));
  global.southAmericaHiScoreDisplay.innerHTML = `South America HiScore ${savedSaHiScore} / ${total}`;
  saHiScore = savedSaHiScore;
}

function playSouthAmericanGamemode(){
  let randomFlag = southAmericanCountries[Math.floor(Math.random() * southAmericanCountries.length)];
  let wrong1 = southAmericanCountries[Math.floor(Math.random() * southAmericanCountries.length)];
  let wrong2 = southAmericanCountries[Math.floor(Math.random() * southAmericanCountries.length)];
  let wrong3 = southAmericanCountries[Math.floor(Math.random() * southAmericanCountries.length)];

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

  global.endGameAndReset(southAmericanCountries,score,total,wrong);

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
      southAmericanCountries.splice(southAmericanCountries.indexOf(rf), 1);
      score++;
      scoreDisplay.innerHTML = `${score} / ${total} CORRECT It Was ${fa}`;
      if(score > saHiScore){
        saHiScore = score;
        global.southAmericaHiScoreDisplay.innerHTML = `South America HiScore ${saHiScore} / ${total}`;
        localStorage.setItem("southAmericaHiScoreSaved", JSON.stringify(saHiScore));
      }
      playSouthAmericanGamemode();
    }
    else {
      removed.push(`${fa}`);
      southAmericanCountries.splice(southAmericanCountries.indexOf(rf), 1);
      wrong++;
      scoreDisplay.innerHTML = `${score} / ${total} WRONG It Was ${fa}`;
      playSouthAmericanGamemode();
    }
  }
}