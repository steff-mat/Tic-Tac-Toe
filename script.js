'use strict';

let gameState = true;
let winnerFound = false;

const dom = {
  form: document.querySelector('form'),
  startMenu: document.querySelector('.initial-state'),
  gameMenu: document.querySelector('.game-state'),
  restartMenu: document.querySelector('.end-state'),
  restartButton: document.querySelector('.restart'),
  nameInput: document.querySelector('#username'),
  buttons: document.querySelectorAll('.box'),
  winner: document.querySelector('.winner-confirmation'),
};

class gameObject {
  constructor(name, sign, selection) {
    this.name = name;
    this.sign = sign;
    this.selection = selection;
  }
}

class movValue {
  constructor(box) {
    this.box = box;
  }
}

const human = new gameObject(localStorage.getItem('player'), 'X', []);
const cpu = new gameObject('CPU', 'O', []);
const xType = new movValue('X');
const oType = new movValue('O');

const select = {
  moveCount: 0,
};

function toggler(x) {
  return x.classList.toggle('hidden');
}

(function () {
  //Save username to localstorage and keep as default unless changed
  if (localStorage.player !== typeof undefined) {
    document.querySelector('#username').value = localStorage.player;
  }
  if (document.querySelector('#username').value === 'undefined') {
    document.querySelector('#username').value = '';
  }
})();

dom.form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (dom.nameInput.value !== '' && localStorage.player !== typeof undefined) {
    localStorage.setItem('player', dom.nameInput.value);
    toggler(dom.startMenu);
    toggler(dom.gameMenu);
  }
});

const combos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function playerLogic() {
  if (gameState === true) {
    for (const button of dom.buttons) {
      button.addEventListener('click', () => {
        if (
          human.selection.includes(parseInt(event.target.id)) === false &&
          button.innerText === ''
        ) {
          design(button, 'red');
          button.innerText = xType.box;
          human.selection.push(parseInt(event.target.id));
          select.moveCount++;
          loopCombo(human.selection, combos, localStorage.getItem('player'));
          draw();
          if (select.moveCount <= 8 && winnerFound !== true) {
            // cpuLogic();
            setTimeout(cpuLogic, 250);
          }
        }
      });
    }
  }
}
playerLogic();

function cpuLogic() {
  //Brain for CPU
  const docLoader = function (x) {
    //Make sure as p/cpu box is not in-use already
    if (
      cpu.selection.includes(x) == false &&
      human.selection.includes(x) == false
    ) {
      select.moveCount++;
      cpu.selection.push(x);
      design(document.getElementById(`${x}`), 'blue');
      document.getElementById(`${x}`).innerText = oType.box;
      loopCombo(cpu.selection, combos, cpu.name);
    } else {
      docLoader(xzy()); //Thy to print to box otherwise call again
    }
  };
  const xzy = () => {
    return Math.floor(Math.random() * 9 + 1);
  };
  docLoader(xzy());
}

function loopCombo(a, b, c) {
  //Checks if there's a combination match and post winner
  for (const arr of b) {
    const matches = a.filter((item) => arr.includes(item));
    if (matches.length === 3) {
      dom.winner.innerText = `${c} has won!`;
      gameState = false;
      toggler(dom.gameMenu);
      toggler(dom.restartMenu);
      if (!winnerFound) {
        winnerFound = true;
      }
      break;
    }
  }
}

dom.restartButton.addEventListener('click', () => {
  location.reload(); //Reload webpage for next round
});

function draw() {
  //Confirm no winner this round
  if (winnerFound === false && select.moveCount === 9) {
    dom.winner.innerText = 'Draw!';
    gameState = false;
    toggler(dom.gameMenu);
    toggler(dom.restartMenu);
  }
}

function design(tag, color) {
  //Colorify the game
  tag.style.color = color;
  tag.style.fontSize = '6rem';
  tag.style.fontWeigth = 'boldest';
  tag.style.transition = 'all 250ms';
}
