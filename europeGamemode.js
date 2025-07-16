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
  global.europeHiScoreDisplay.innerHTML = `Europe HiScore ${savedEuropeHiScore} / ${total}`;
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

  if(removed.includes("This Is Super Rare")){
    removed.shift();
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
      europeanCountries.splice(europeanCountries.indexOf(rf), 1);
      score++;
      scoreDisplay.innerHTML = `${score} / ${total} CORRECT It Was ${fa}`;
      if(score > europeHiScore){
        europeHiScore = score;
        global.europeHiScoreDisplay.innerHTML = `Europe HiScore ${europeHiScore} / ${total}`;
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

function endGameAndReset(){
  if(europeanCountries.length <= 0){
    global.optionBTN.forEach((e) => {
      e.style.display = `none`;
    });
    global.countryFlag.style.display = `none`;
    global.makeHiScoresVisible();
    scoreDisplay.innerHTML = `${score} / ${total} CORRECT | INCORRECT : ${wrong}`;
  }
}