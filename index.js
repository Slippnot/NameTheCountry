import { countries,removed } from "./countries.js";


const countryFlag = document.getElementById("countryFlag");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const optionBTN = document.querySelectorAll(".optionBTN");
const scoreDisplay = document.getElementById("scoreDisplay");

getChoices();

let score = 0;
let wrong = 0;

function getChoices(){
  let randomFlag = countries[Math.floor(Math.random() * countries.length)];
  let wrong1 = countries[Math.floor(Math.random() * countries.length)];
  let wrong2 = countries[Math.floor(Math.random() * countries.length)];
  let wrong3 = countries[Math.floor(Math.random() * countries.length)];

  preventMultipleWrongAnswerShowing(wrong1,wrong2,wrong3);
  preventMultipleWrongAnswerShowing(wrong2,wrong1,wrong3);
  preventMultipleWrongAnswerShowing(wrong3,wrong1,wrong2);

  if(removed.includes("This Is Super Rare")){
    removed.shift();
  }

  let flagQuestion = randomFlag;
  let flagAnswer = randomFlag;

  console.log(flagAnswer);

  if(countries.length <= 0){
    optionBTN.forEach((e) => {
      e.style.display = `none`;
    });
    countryFlag.style.display = `none`;
    scoreDisplay.innerHTML = `${score} / 205 CORRECT | INCORRECT : ${wrong}`;
    const reset = document.createElement('button');
    document.body.appendChild(reset);
    reset.innerHTML = `RESET`;
    reset.onclick = () => {
      location.reload();
    }
  }

  removed.push(`${flagAnswer}`);

  countries.splice(countries.indexOf(randomFlag), 1);

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

  play(option1,flagAnswer);
  play(option2,flagAnswer);
  play(option3,flagAnswer);
  play(option4,flagAnswer);

}

function play(opt,fa){
  opt.onclick = () => {
    if(opt.innerHTML == fa){
      score++;
      scoreDisplay.innerHTML = `${score} / 205 CORRECT It Was ${fa}`;
      getChoices();
    }
    else {
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

function preventMultipleWrongAnswerShowing(w1,w2,w3){
  if(w1 == w2 || w1 == w3){
    w1 = removed[Math.floor(Math.random() * removed.length)];
  }
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

function getRandomNum(){
  return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}