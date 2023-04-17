'use strict';

const dom = {
  form: document.querySelector('form'),
  startMenu: document.querySelector('.initial-state'),
  gameMenu: document.querySelector('.game-state'),
  restartMenu: document.querySelector('.end-state'),
  restartButton: document.querySelector('.restart'),
  nameInput: document.querySelector('#username'),
  buttons: document.querySelectorAll('.box'),
  nameHolder: [],
};

const xo = {
  x: 'X',
  o: 'O',
};

const winner = {
  win: 'Somebody won!',
  noWin: 'Draw!',
};

const selection = {
  player: [],
  cpu: [],
};

const combos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 9],
];

function playerLogic() {
  for (const button of dom.buttons) {
    button.addEventListener('click', () => {
      if (selection.player.includes(event.target.id) === false) {
        button.innerText = xo.x;
        selection.player.push(event.target.id);
      }
    });
  }
}
playerLogic();

function cpuLogic() {}
cpuLogic();
