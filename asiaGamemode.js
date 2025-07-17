import { asianCountries,removed } from "./countries.js";
import * as global from "./globals.js";

const startPlaying = setInterval(() => {
  if(global.playAllAsiaFlagsGamemode){
    global.displayGameChosen();
    playAsianGamemode();
    clearInterval(startPlaying);
  }
});

let score = 0;
let wrong = 0;
let asiaHiScore = 0;
let total = asianCountries.length;

if(localStorage.getItem("asiaHiScoreSaved") !== null){
  let savedAsiaHiScore = JSON.parse(localStorage.getItem("asiaHiScoreSaved"));
  global.asiaHiScoreDisplay.innerHTML = `Asia HiScore ${savedAsiaHiScore} / ${total}`;
  asiaHiScore = savedAsiaHiScore;
}

function playAsianGamemode(){
  let randomFlag = asianCountries[Math.floor(Math.random() * asianCountries.length)];
  let wrong1 = asianCountries[Math.floor(Math.random() * asianCountries.length)];
  let wrong2 = asianCountries[Math.floor(Math.random() * asianCountries.length)];
  let wrong3 = asianCountries[Math.floor(Math.random() * asianCountries.length)];

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

  global.endGameAndReset(asianCountries,score,total,wrong);

  global.displayImage("drawnCountries",flagQuestion);

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
      asianCountries.splice(asianCountries.indexOf(rf), 1);
      score++;
      scoreDisplay.innerHTML = `${score} / ${total} CORRECT It Was ${fa}`;
      if(score > asiaHiScore){
        asiaHiScore = score;
        global.asiaHiScoreDisplay.innerHTML = `Asia HiScore ${asiaHiScore} / ${total}`;
        localStorage.setItem("asiaHiScoreSaved", JSON.stringify(asiaHiScore));
      }
      playAsianGamemode();
    }
    else {
      removed.push(`${fa}`);
      asianCountries.splice(asianCountries.indexOf(rf), 1);
      wrong++;
      scoreDisplay.innerHTML = `${score} / ${total} WRONG It Was ${fa}`;
      playAsianGamemode();
    }
  }
}