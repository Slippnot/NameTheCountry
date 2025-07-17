import { removed } from "./countries.js";

export const countryFlag = document.getElementById("countryFlag");
export const option1 = document.getElementById("option1");
export const option2 = document.getElementById("option2");
export const option3 = document.getElementById("option3");
export const option4 = document.getElementById("option4");
export const option5 = document.getElementById("option5");
export const option6 = document.getElementById("option6");
export const option7 = document.getElementById("option7");
export const optionBTN = document.querySelectorAll(".optionBTN");
export const resetBtn = document.getElementById("resetBtn");
export const scoreDisplay = document.getElementById("scoreDisplay");
export const hiScoreDisplay = document.getElementById("hiScoreDisplay");
export const africaHiScoreDisplay = document.getElementById("africaHiScoreDisplay");
export const asiaHiScoreDisplay = document.getElementById("asiaHiScoreDisplay");
export const northAmericaHiScoreDisplay = document.getElementById("northAmericaHiScoreDisplay");
export const southAmericaHiScoreDisplay = document.getElementById("southAmericaHiScoreDisplay");
export const europeHiScoreDisplay = document.getElementById("europeHiScoreDisplay");

document.getElementById("homeButton").onclick = (() => {
  location.reload();
});

export var playAllFlagsGamemode = false;
option1.onclick = () => {
  playAllFlagsGamemode = true;
}
export var playAllAfricaFlagsGamemode = false;
option2.onclick = () => {
  playAllAfricaFlagsGamemode = true;
}
export var playAllAsiaFlagsGamemode = false;
option3.onclick = () => {
  playAllAsiaFlagsGamemode = true;
}
export var playAllNorthAmericaFlagsGamemode = false;
option4.onclick = () => {
  playAllNorthAmericaFlagsGamemode = true;
}
export var playAllSouthAmericaFlagsGamemode = false;
option5.onclick = () => {
  playAllSouthAmericaFlagsGamemode = true;
}
export var playAllEuropeFlagsGamemode = false;
option6.onclick = () => {
  playAllEuropeFlagsGamemode = true;
}


export function displayGameChosen(){
  countryFlag.style.display = `block`;
  scoreDisplay.style.display = `block`;
  option5.style.display = `none`;
  option6.style.display = `none`;
  option7.style.display = `none`;
}

export function displayOptions(opt1,opt2,opt3,opt4){
  option1.innerHTML = `${opt1}`;
  option2.innerHTML = `${opt2}`;
  option3.innerHTML = `${opt3}`;
  option4.innerHTML = `${opt4}`;
}

export function preventsTwoCorrectAnswerShowing(fa){
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

export function makeHiScoresVisible(){
  hiScoreDisplay.style.display = `block`;
  africaHiScoreDisplay.style.display = `block`;
  asiaHiScoreDisplay.style.display = `block`;
  northAmericaHiScoreDisplay.style.display = `block`;
  southAmericaHiScoreDisplay.style.display = `block`;
  europeHiScoreDisplay.style.display = `block`;
}

export function endGameAndReset(countryArray,score,total,wrong){
  if(countryArray.length <= 0){
    optionBTN.forEach((e) => {
      e.style.display = `none`;
    });
    countryFlag.style.display = `none`;
    makeHiScoresVisible();
    scoreDisplay.innerHTML = `${score} / ${total} CORRECT | INCORRECT : ${wrong}`;
  }
}

export function displayImage(folderName,flagQuestion){
  countryFlag.src = `flags/${folderName}/${flagQuestion}.png`;
  countryFlag.alt = `${flagQuestion}`;
}

export function setAndDisplayWrongAndCorrectAnswers(flagAnswer,wrong1,wrong2,wrong3){
  let rng = getRandomNum();
  if(rng == 1){
    displayOptions(flagAnswer,wrong1,wrong2,wrong3);
    preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 2){
    displayOptions(wrong1,flagAnswer,wrong2,wrong3);
    preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 3){
    displayOptions(wrong1,wrong2,flagAnswer,wrong3);
    preventsTwoCorrectAnswerShowing(flagAnswer);
  }
  if(rng == 4){
    displayOptions(wrong1,wrong2,wrong3,flagAnswer);
    preventsTwoCorrectAnswerShowing(flagAnswer);
  }
}

export function getRandomNum(){
  return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}