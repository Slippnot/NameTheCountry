import { northAmericanCountries,removed } from "./countries.js";
import * as global from "./globals.js";

const startPlaying = setInterval(() => {
  if(global.playAllNorthAmericaFlagsGamemode){
    global.displayGameChosen();
    playNorthAmericanGamemode();
    clearInterval(startPlaying);
  }
});

let score = 0;
let wrong = 0;
let naHiScore = 0;
let total = northAmericanCountries.length;

if(localStorage.getItem("northAmericaHiScoreSaved") !== null){
  let savedNaHiScore = JSON.parse(localStorage.getItem("northAmericaHiScoreSaved"));
  global.northAmericaHiScoreDisplay.innerHTML = `North America HiScore ${savedNaHiScore} / ${total}`;
  naHiScore = savedNaHiScore;
}

function playNorthAmericanGamemode(){
  let randomFlag = northAmericanCountries[Math.floor(Math.random() * northAmericanCountries.length)];
  let wrong1 = northAmericanCountries[Math.floor(Math.random() * northAmericanCountries.length)];
  let wrong2 = northAmericanCountries[Math.floor(Math.random() * northAmericanCountries.length)];
  let wrong3 = northAmericanCountries[Math.floor(Math.random() * northAmericanCountries.length)];

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

  global.endGameAndReset(northAmericanCountries,score,total,wrong);

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
      northAmericanCountries.splice(northAmericanCountries.indexOf(rf), 1);
      score++;
      scoreDisplay.innerHTML = `${score} / ${total} CORRECT It Was ${fa}`;
      if(score > naHiScore){
        naHiScore = score;
        global.northAmericaHiScoreDisplay.innerHTML = `North America HiScore ${naHiScore} / ${total}`;
        localStorage.setItem("northAmericaHiScoreSaved", JSON.stringify(naHiScore));
      }
      playNorthAmericanGamemode();
    }
    else {
      removed.push(`${fa}`);
      northAmericanCountries.splice(northAmericanCountries.indexOf(rf), 1);
      wrong++;
      scoreDisplay.innerHTML = `${score} / ${total} WRONG It Was ${fa}`;
      playNorthAmericanGamemode();
    }
  }
}