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
  nameHolder: [],
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

const human = new gameObject(dom.nameHolder, 'X', []);
const cpu = new gameObject('CPU', 'O', []);
const xType = new movValue('X');
const oType = new movValue('O');

const select = {
  moveCount: 0,
};

function toggler(x) {
  return x.classList.toggle('hidden');
}

dom.form.addEventListener('submit', (e) => {
  e.preventDefault();
  dom.nameHolder.push(dom.nameInput.value);
  dom.form.reset();
  toggler(dom.startMenu);
  toggler(dom.gameMenu);
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
          button.innerText = xType.box;
          human.selection.push(parseInt(event.target.id));
          select.moveCount++;
          loopCombo(human.selection, combos, human.name);
          draw();
          if (select.moveCount <= 8 && winnerFound !== true) {
            cpuLogic();
          }
        }
      });
    }
  }
}
playerLogic();

function cpuLogic() {
  const docLoader = function (x) {
    if (
      cpu.selection.includes(x) == false &&
      human.selection.includes(x) == false
    ) {
      select.moveCount++;
      cpu.selection.push(x);
      document.getElementById(`${x}`).innerText = oType.box;
      loopCombo(cpu.selection, combos, cpu.name);
    } else {
      docLoader(xzy());
    }
  };
  const xzy = () => {
    return Math.floor(Math.random() * 9 + 1);
  };
  docLoader(xzy());
}

function loopCombo(a, b, c) {
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
  toggler(dom.restartMenu);
  toggler(dom.startMenu);
  location.reload();
});

function draw() {
  if (winnerFound === false && select.moveCount === 9) {
    dom.winner.innerText = 'Draw!';
    gameState = false;
    toggler(dom.gameMenu);
    toggler(dom.restartMenu);
  }
}
