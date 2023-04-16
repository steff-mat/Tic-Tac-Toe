'use strict';

const playerItem = setPlayItem('X');
const computerItem = setPlayItem('0');

(function () {
  const buttons = document.querySelectorAll('.box');
  const movesLeftSelector = document.getElementById('move');
  let movesLeft = 5;
  for (const button of buttons) {
    button.addEventListener('click', () => {
      if (button.innerText == '') {
        console.log(event.target.id);
        button.innerText = playerItem;
        winChecker.validator('X');
        if (movesLeft > 1) {
          applySelection();
        }
        movesLeft--;
        movesLeftSelector.innerText = movesLeft;
      }
    });
  }
})();

const winChecker = {
  vx(x) {
    return document.getElementById(x).innerText;
  },
  winConfirm(x) {
    console.log(`${x} won the match!`);
  },
  validator(x) {
    if (this.vx('tl') === x && this.vx('tm') === x && this.vx('tr') === x) {
      this.winConfirm(x);
      console.log(this.vx('tl'), this.vx('tm'), this.vx('tr'), x);
      console.log('tl-tm-tr');
    } else if (
      this.vx('ml') === x &&
      this.vx('mm') === x &&
      this.vx('mr') === x
    ) {
      this.winConfirm(x);
      console.log('ml-mm-mr');
    } else if (
      this.vx('bl') === x &&
      this.vx('bm') === x &&
      this.vx('br') === x
    ) {
      this.winConfirm(x);
      console.log('bl-bm-br');
    } else if (
      this.vx('tl') === x &&
      this.vx('ml') === x &&
      this.vx('bl') === x
    ) {
      this.winConfirm(x);
      console.log('tl-ml-bl');
    } else if (
      this.vx('tm') === x &&
      this.vx('mm') === x &&
      this.vx('bm') === x
    ) {
      this.winConfirm(x);
      console.log('tm-mm-bm');
    } else if (
      this.vx('tr') === x &&
      this.vx('mr') === x &&
      this.vx('br') === x
    ) {
      this.winConfirm(x);
      console.log('tr-mr-br');
    } else if (
      this.vx('tl') === x &&
      this.vx('mm') === x &&
      this.vx('br') === x
    ) {
      this.winConfirm(x);
      console.log('tl-mm-br');
    } else if (
      this.vx('tr') === x &&
      this.vx('mm') === x &&
      this.vx('bl') === x
    ) {
      this.winConfirm(x);
      console.log('tr-mm-bl');
    }
  },
};

function setPlayItem(item) {
  return item;
}

function cpuSelector() {
  return Math.floor(Math.random() * 9 + 1);
}

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
    validator(boxId) != '' ? printToBox(boxId, computerItem) : applySelection();
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
  winChecker.validator('0');
}

const applySelection = function () {
  printSelector(cpuSelector());
};
