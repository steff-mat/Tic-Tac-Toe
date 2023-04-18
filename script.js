'use strict';

let gameState = true;

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

const select = {
  x: 'X',
  o: 'O',
  player: [],
  cpu: [],
  moveCount: 0,
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
  if (gameState === true) {
    for (const button of dom.buttons) {
      button.addEventListener('click', () => {
        if (select.player.includes(event.target.id) === false) {
          button.innerText = select.x;
          select.player.push(parseInt(event.target.id));
          select.moveCount++;
          loopCombo(select.player, combos);
          if (select.moveCount <= 8) {
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
    if (select.cpu.includes(x) == false && select.player.includes(x) == false) {
      select.moveCount++;
      select.cpu.push(x);
      loopCombo(select.cpu, combos);
      return (document.getElementById(`${x}`).innerText = select.o);
    } else {
      docLoader(xzy());
    }
  };
  const xzy = () => {
    return Math.floor(Math.random() * 9 + 1);
  };
  docLoader(xzy());
}

function loopCombo(a, b) {
  for (const arr of b) {
    const matches = a.filter((item) => arr.includes(item));
    if (matches.length > 2) {
      gameState = false;
      console.log(`At least 3 items in ${a} are present in ${arr}`);
      toggler(dom.gameMenu);
      toggler(dom.restartMenu);
      break;
    }
  }
}

dom.restartButton.addEventListener('click', () => {
  toggler(dom.restartMenu);
  toggler(dom.startMenu);
  location.reload();
});
