
let maze1 = [
  `##################`,
  `#_...............#`,
  `#..###############`,
  `#................#`,
  `#..####..######..#`,
  `#........#.......#`,
  `#######..######..#`,
  `#........#.......#`,
  `#..###############`,
  `#...............!#`,
  `##################`,
];

let i = 0;
let currentLevel = maze1;
let levels = [maze1];
let body = document.querySelector('body');
let divTable = document.getElementById('cover');
let tableEl = document.querySelector('table');
let info = () => {
  let b1 = document.querySelector('#foo')
  b1.textContent = 'Tekan WASD untuk bergerak. Tekan tombol Mulai pada halaman ini untuk mulai bermain.';
};
let loadPage = () => {
  let clearPage = () => {
    let b1 = document.querySelector('#one');
    let b2 = document.querySelector('#two');
    let b3 = document.querySelector('#foo');
    b1.style.display = 'none';
    b2.style.display = 'none';
    b3.style.display = 'none';
    body.style.flexDirection = 'row';
    body.style.justifyContent = 'flex-start';
    body.style.alignItems = 'flex-start';

  };
  clearPage();

  let lose = () => {
    let looseP = document.createElement('section');
    let para = document.createElement('p');
    let h1 = document.createElement('h1');
    let button = document.createElement('button');
    clearTable(tableEl);
    mover.style.display = 'none';
    h1.textContent = 'GAME OVER';
    para.textContent = 'Tekan tombol di bawah untuk kembali ke menu utama.';
    button.textContent = 'Kembali';
    button.setAttribute('onclick', 'window.location.reload();');
    button.setAttribute('type', 'button');
    body.appendChild(looseP);
    looseP.appendChild(h1);
    looseP.appendChild(para);
    looseP.appendChild(button);
    body.style.justifyContent = 'center';
  };


  const clearTable = (tableEl) => {
    while (tableEl.firstChild) {
      tableEl.removeChild(tableEl.firstChild);
    }
  };

  let mover = document.createElement('div');
  const drawMaze = (maze) => {
    clearTable(tableEl);
    divTable.appendChild(mover);
    mover.style.left = '40px';
    mover.style.top = '50px';
    mover.setAttribute('id', 'player');
    mover.textContent = '@';
    

    for ( i; i < currentLevel.length; i++) {

      let rowEl = document.createElement('tr');

      tableEl.appendChild(rowEl);

      for (let x = 0; x < currentLevel[i].length; x++) {
        let tdEl = document.createElement('td');
        rowEl.appendChild(tdEl)

        tdEl.innerHTML = maze[i].charAt(x);

        switch (maze[i].charAt(x)) {
          case '#':
            tdEl.setAttribute('class', 'wall');
            break;
          case '.':
            tdEl.setAttribute('class', 'freespace');
            break;
          case '_':
            tdEl.setAttribute('id', 'start');
            break;
          case '!':
            tdEl.setAttribute('id', 'win');
            break;

        }

      }

    };

  };

  drawMaze(currentLevel);

  window.addEventListener('keydown', event => {
    switch (event.key) {
      case 'w':
        mover.style.top = parseInt(mover.style.top) - 10 + 'px';
        break;
      case 'a':
        mover.style.left = parseInt(mover.style.left) - 10 + 'px';
        break;
      case 's':
        mover.style.top = parseInt(mover.style.top) + 10 + 'px';

        break;
      case 'd':

        mover.style.left = parseInt(mover.style.left) + 10 + 'px';
        break;
    }

    let pos = mover.getBoundingClientRect();
    let win = document.querySelector('#win');
    let wins = win.getBoundingClientRect();
    let walls = document.querySelectorAll('.wall');

    for (let wall of walls) {
      let wowWalls = wall.getBoundingClientRect();
      if (pos.x < wowWalls.x + wowWalls.width && pos.x + pos.width > wowWalls.x && pos.y < wowWalls.y + wowWalls.height && pos.y + pos.height > wowWalls.y) {
        lose();
      } else if (pos.x < wins.x + wins.width && pos.x + pos.width > wins.x && pos.y < wins.y + wins.height && pos.y + pos.height > wins.y) {
            window.location.replace("menang.html");
      }
      if (pos.x < 0 ) {
        lose();
      }
    }

  });

};
