import { africanCountries,removed } from "./countries.js";
import * as global from "./globals.js";

const startPlaying = setInterval(() => {
  if(global.playAllAfricaFlagsGamemode){
    global.displayGameChosen();
    playAfricanGamemode();
    clearInterval(startPlaying);
  }
},1000);

let score = 0;
let wrong = 0;
let total = africanCountries.length;

function playAfricanGamemode(){
  let randomFlag = africanCountries[Math.floor(Math.random() * africanCountries.length)];
  let wrong1 = africanCountries[Math.floor(Math.random() * africanCountries.length)];
  let wrong2 = africanCountries[Math.floor(Math.random() * africanCountries.length)];
  let wrong3 = africanCountries[Math.floor(Math.random() * africanCountries.length)];

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
  } // move somewhere else ??

  let flagQuestion = randomFlag;
  let flagAnswer = randomFlag;

  endGameAndReset();

  countryFlag.src = `flags/countries/${flagQuestion}.png`;

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
      africanCountries.splice(africanCountries.indexOf(rf), 1);
      score++;
      scoreDisplay.innerHTML = `${score} / ${total} CORRECT It Was ${fa}`;
      playAfricanGamemode();
    }
    else {
      removed.push(`${fa}`);
      africanCountries.splice(africanCountries.indexOf(rf), 1);
      wrong++;
      scoreDisplay.innerHTML = `${score} / ${total} WRONG It Was ${fa}`;
      playAfricanGamemode();
    }
  }
}

function endGameAndReset(){
  if(africanCountries.length <= 0){
    global.optionBTN.forEach((e) => {
      e.style.display = `none`;
    });
    global.countryFlag.style.display = `none`;
    hiScoreDisplay.style.display = `block`;
    scoreDisplay.innerHTML = `${score} / ${total} CORRECT | INCORRECT : ${wrong}`;
    resetBtn.style.display = `block`;
    resetBtn.onclick = () => {
      location.reload();
    }
  }
}