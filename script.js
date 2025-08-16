// 9x9 将棋盤の初期配置を描画。盤反転時も駒の向きを保つ。
const board = document.getElementById('board');
let flipped = false;

// 9x9 のセル生成
const cells = [];
for (let r = 0; r < 9; r++) {
  for (let c = 0; c < 9; c++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.r = r;
    cell.dataset.c = c;
    board.appendChild(cell);
    cells.push(cell);
  }
}

// 初期配置
const INIT = [
  // 上段
  {r:0,c:0,t:'香',cls:'k-kyou',rev:true},
  {r:0,c:1,t:'桂',cls:'k-kei',rev:true},
  {r:0,c:2,t:'銀',cls:'k-gin',rev:true},
  {r:0,c:3,t:'金',cls:'k-kin',rev:true},
  {r:0,c:4,t:'玉',cls:'k-gyoku',rev:true},
  {r:0,c:5,t:'金',cls:'k-kin',rev:true},
  {r:0,c:6,t:'銀',cls:'k-gin',rev:true},
  {r:0,c:7,t:'桂',cls:'k-kei',rev:true},
  {r:0,c:8,t:'香',cls:'k-kyou',rev:true},
  // 角・飛
  {r:1,c:2,t:'角',cls:'k-kaku',rev:true},
  {r:1,c:7,t:'飛',cls:'k-hi',rev:true},
  // 歩×9
  ...Array.from({length:9},(_,i)=>({r:2,c:i,t:'歩',cls:'k-fu',rev:true})),
  // 下側
  ...Array.from({length:9},(_,i)=>({r:6,c:i,t:'歩',cls:'k-fu',rev:false})),
  {r:7,c:1,t:'飛',cls:'k-hi',rev:false},
  {r:7,c:6,t:'角',cls:'k-kaku',rev:false},
  {r:8,c:0,t:'香',cls:'k-kyou',rev:false},
  {r:8,c:1,t:'桂',cls:'k-kei',rev:false},
  {r:8,c:2,t:'銀',cls:'k-gin',rev:false},
  {r:8,c:3,t:'金',cls:'k-kin',rev:false},
  {r:8,c:4,t:'玉',cls:'k-gyoku',rev:false},
  {r:8,c:5,t:'金',cls:'k-kin',rev:false},
  {r:8,c:6,t:'銀',cls:'k-gin',rev:false},
  {r:8,c:7,t:'桂',cls:'k-kei',rev:false},
  {r:8,c:8,t:'香',cls:'k-kyou',rev:false},
];

function clearPieces(){
  cells.forEach(cell => cell.querySelector('.koma')?.remove());
}

function createPiece(p){
  const d = document.createElement('div');
  d.className = `koma ${p.cls} ${p.rev?'rev':''}`;
  d.textContent = p.t;
  return d;
}

function placePieces(list){
  clearPieces();
  list.forEach(p => {
    const cell = cells.find(c => +c.dataset.r===p.r && +c.dataset.c===p.c);
    if (!cell) return;
    const piece = createPiece(p);
    cell.appendChild(piece);
  });
  applyFlipToPieces(); // 反転状態に合わせる
}

function applyFlipToPieces(){
  board.querySelectorAll('.koma').forEach(k=>{
    const rev = k.classList.contains('rev');
    // 盤の反転状態に合わせて、駒の向きを維持
    k.style.transform = flipped
      ? `translate(-50%,-52%) rotate(${rev?0:180}deg)`
      : `translate(-50%,-52%) rotate(${rev?180:0}deg)`;
  });
}

// 初期化
placePieces(INIT);

// 反転
document.getElementById('btnFlip').addEventListener('click', ()=>{
  flipped = !flipped;
  board.style.transform = flipped ? 'rotate(180deg)' : 'none';
  applyFlipToPieces();
});

// リセット
document.getElementById('btnReset').addEventListener('click', ()=>{
  placePieces(INIT);
});
