'use strict';

const eDOM = {
  form: document.querySelector('form'),
  startMenu: document.querySelector('.initial-state'),
  gameMenu: document.querySelector('.game-state'),
  restartMenu: document.querySelector('.end-state'),
  restartButton: document.querySelector('.restart'),
  nameInput: document.querySelector('#username'),
  nameHolder: ['Stefan'],
  buttons: document.querySelectorAll('.box'),
};

function toggleItem(x) {
  return x.classList.toggle('hidden');
}

eDOM.form.addEventListener('submit', (event) => {
  event.preventDefault();
  eDOM.nameHolder.push(eDOM.nameInput.value);
  eDOM.form.reset();
  toggleItem(eDOM.startMenu);
  toggleItem(eDOM.gameMenu);
  //Move game() to here once done!
});

eDOM.restartButton.addEventListener('click', () => {
  toggleItem(eDOM.restartMenu);
  toggleItem(eDOM.startMenu);
});

function play(type) {
  return type;
}

const set = {
  itemX: play('X'),
  itemO: play('O'),
};

const cpu = {
  moves: 4,
};

function cpuSelector() {
  return Math.floor(Math.random() * 9 + 1);
}

function game() {
  eDOM.buttons.forEach((button) => {
    button.addEventListener('click', () => {
      button.innerText = set.itemX;
      cpu.moves--;
      console.log(cpu.moves);
      if (cpu.moves >= 0) {
        applySelection();
      }
    });
  });
}
game(); //Move this to line 24 once done!

function printSelector(num) {
  function printToBox(boxId, val) {
    return document.getElementById(boxId).innerText === ''
      ? (document.getElementById(boxId).innerText = val)
      : applySelection();
  }

  const validator = function (boxId) {
    document.getElementById(boxId).innerText;
  };
  const validatorHold = function (boxId) {
    validator(boxId) != '' ? printToBox(boxId, set.itemO) : applySelection();
  };
  switch (num) {
    case 1:
      validatorHold('tl');
      break;
    case 2:
      validatorHold('tm');
      break;
    case 3:
      validatorHold('tr');
      break;
    case 4:
      validatorHold('ml');
      break;
    case 5:
      validatorHold('mm');
      break;
    case 6:
      validatorHold('mr');
      break;
    case 7:
      validatorHold('bl');
      break;
    case 8:
      validatorHold('bm');
      break;
    case 9:
      validatorHold('br');
      break;
  }
}

const applySelection = function () {
  printSelector(cpuSelector());
  winChecker.validator('X');
  winChecker.validator('0');
};

const winChecker = {
  vx(x) {
    return document.getElementById(x).innerText;
  },
  winConfirm(x) {
    console.log(`${x} won the match!`);
    // toggleItem(eDOM.gameMenu);
    // toggleItem(eDOM.restartMenu);
    this.winner = x;
    return this.winner;
  },
  preValidator(a, b, c, x) {
    return this.vx(a) === x && this.vx(b) === x && this.vx(c) === x;
  },
  validator(x) {
    switch (true) {
      case this.preValidator('tl', 'tm', 'tr', x):
        this.winConfirm(x);
        console.log('tl-tm-tr');
        break;
      case this.preValidator('ml', 'mm', 'mr', x):
        this.winConfirm(x);
        console.log('ml-mm-mr');
        break;
      case this.preValidator('bl', 'bm', 'br', x):
        this.winConfirm(x);
        console.log('bl-bm-br');
        break;
      case this.preValidator('tl', 'mm', 'bl', x):
        this.winConfirm(x);
        console.log('tl-ml-bl');
        break;
      case this.preValidator('tm', 'mm', 'bm', x):
        this.winConfirm(x);
        console.log('tm-mm-bm');
        break;
      case this.preValidator('tr', 'mr', 'br', x):
        this.winConfirm(x);
        console.log('tr-mr-br');
        break;
      case this.preValidator('tl', 'mm', 'br', x):
        this.winConfirm(x);
        console.log('tl-mm-br');
        break;
      case this.preValidator('tr', 'mm', 'bl', x):
        this.winConfirm(x);
        console.log('tr-mm-bl');
        break;
    }
  },
};
