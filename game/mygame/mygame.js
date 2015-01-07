var W_WIDTH = 500;
var W_HEIGHT = 500;
var C_WIDTH = 20;
var C_HEIGHT = 20;
var CELL_W = W_WIDTH / C_WIDTH;
var CELL_H = W_HEIGHT / C_HEIGHT;
var DEL_NUM = 3;
var canvas;
var context;

var cell;


window.onload = function() {
  makeArray();
  canvas = document.getElementById('world');
  canvas.width = W_WIDTH;
  canvas.height = W_HEIGHT;

  var scaleRate = Math.min(window.innerWidth/W_WIDTH, window.innerHeight/W_HEIGHT); // Canvas引き伸ばし率の取得
  canvas.style.width = W_WIDTH*scaleRate+'px';
  canvas.style.height = W_HEIGHT*scaleRate+'px';  // キャンバスを引き伸ばし
  context = canvas.getContext('2d');                // コンテキスト

  makePuyo();

  update();
}

function makeArray() {
  cell = new Array(C_HEIGHT);
  for(var i = 0; i < C_HEIGHT; i++) {
    cell[i] = new Array(C_WIDTH);
    for(var j = 0; j < C_WIDTH; j++) {
      //cell[i][j] = Math.floor(Math.random()*4);
      cell[i][j] = 0;
    }
  }
}

function update() {
  draw();
  if(!dropBlock()) {
    //deletePuyo();
    makePuyo();
  }

  setTimeout(update, 100);
}

function deletePuyo() {
  for(var i = 0; i < C_HEIGHT; i++) {
    for(var j = 0; j < C_WIDTH; j++) {
      if(cell[j][i] != 0) {
        var num = countPuyoJoin(j, i);
        if(num >= DEL_NUM) {
          deletePuyoJoin(j, i, cell[j][i]);
        }
      }
    }
  }
}

function deletePuyoJoin(x, y, col) {
  if(x < 0 || x > C_WIDTH || y < 0 || y > C_HEIGHT) {
    return 0;
  }
  if(cell[y][x] != col || cell[y][x] == 0) {
    return 0;
  }
  cell[y][x] = 0;

  deletePuyoJoin(x+1, y, col);
  deletePuyoJoin(x-1, y, col);
  deletePuyoJoin(x, y-1, col);
  deletePuyoJoin(x, y+1, col);
}

function countPuyoJoin(x, y) {
  var c= cell[y][x]; // ぷよの色
  var n = 1;     // 1で初期化しているのは自分もカウントするため。
  cell[y][x] = -1; // この場所をチェックした証として一時的に空白に
  if (y-1>=0 && cell[y-1][x]==c) n += countPuyoJoin(x, y-1);  
  if (y+1<=C_HEIGHT-1 && cell[y+1][x]==c) n += countPuyoJoin(x, y+1);
  if (x-1>=0 && cell[y][x-1]==c) n += countPuyoJoin(x-1, y);
  if (x+1<=C_WIDTH-1 && cell[y][x+1]==c) n += countPuyoJoin(x+1, y);
  cell[y][x] = c;   // 色を戻す
  return n;
}

function makePuyo() {
  for(var i = 0; i < C_WIDTH; i++) {
    if(cell[0][i] == 0) {
      cell[0][i] = Math.floor(Math.random() * 4);
    }
  }
}

function dropBlock() {
  var isMoved = false;

  for(var i = C_HEIGHT-1; i > 0; i--) {
    for(var j = 0; j < C_WIDTH; j++) {
      if(cell[i][j] == 0 && cell[i-1][j] != 0) {
        isMoved = true;
        cell[i][j] = cell[i-1][j];
        cell[i-1][j] = 0;
      }
    }
  }

  return isMoved;
}

function draw() {
  context.clearRect(0, 0, W_WIDTH, W_HEIGHT);
  drawCell();
}

function drawCell() {
  for(var i = 0; i < C_HEIGHT; i++) {
    for(var j = 0; j < C_WIDTH; j++) {
      switch(cell[i][j]) {
      case 0:
        context.fillStyle = 'rgb(0, 0, 0)';          // 色update();
        break;
      case 1:
        context.fillStyle = 'rgb(255, 100, 100)';          // 色update();
        break;
      case 2:
        context.fillStyle = 'rgb(100, 255, 100)';          // 色update();
        break;
      case 3:
        context.fillStyle = 'rgb(100, 100, 255)';          // 色update();
        break;
      }
      context.fillRect(j*CELL_W, i*CELL_H, j*CELL_W+CELL_W, i*CELL_H + CELL_H);
    }
  }
}
