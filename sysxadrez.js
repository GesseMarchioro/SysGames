const currentTablechess = Array.from({ length: 8 }, () => Array(8).fill(0));
const selectionTable = Array.from({ length: 8 }, () => Array(8).fill(0));
// 100 = selected origin
// 1 = possible target
// 2 = possible kill
var currentPlayer = 0;
var selectedOrigin = [null, null];

function updateCell(position, value) {
  var number = 8 - parseInt(position[1]);
  var column = position.toLowerCase().charCodeAt(0) - 96 -1;

  currentTablechess[number][column] = value;
}

function updateTablechessScreen() {
  document.body.style.backgroundColor = currentPlayer ? 'black' : 'white';
  
  for (let l = 0; l < 8; l++) {
    for (let c = 0; c < 8; c++) {
      if(currentTablechess[l][c]){
        piecesImages[c + 8*l].src = piecesImagesSrc[currentTablechess[l][c]];  
        HTMLCells[c + 8*l].appendChild(piecesImages[c + 8*l]);
      } else{
        const img = HTMLCells[c + 8 * l].querySelector('img');
        if (img) {
          HTMLCells[c + 8 * l].removeChild(img);
        }
      }
      if(selectionTable[l][c]==100){
        HTMLCells[c + 8*l].classList.add('selectedOrigin');
      } else{
        HTMLCells[c + 8*l].classList.remove('selectedOrigin');
      }
      if(selectionTable[l][c]==1){
        HTMLCells[c + 8*l].classList.add('possibleTarget');
      } else{
        HTMLCells[c + 8*l].classList.remove('possibleTarget');
      }
      if(selectionTable[l][c]==2){
        HTMLCells[c + 8*l].classList.add('possibleKill');
      } else{
        HTMLCells[c + 8*l].classList.remove('possibleKill');
      }
    }
  }
}

function beginTablechess() {
  //peões brancos
  updateCell('a2', 16);
  updateCell('b2', 16);
  updateCell('c2', 16);
  updateCell('d2', 16);
  updateCell('e2', 16);
  updateCell('f2', 16);
  updateCell('g2', 16);
  updateCell('h2', 16);
  //torres brancas
  updateCell('a1', 13);
  updateCell('h1', 13);
  //cavalos brancos
  updateCell('b1', 15);
  updateCell('g1', 15);
  //bispos brancos
  updateCell('c1', 14);
  updateCell('f1', 14);
  //rei branco
  updateCell('e1', 11);
  //dama branca
  updateCell('d1', 12);
  
  //peões pretos
  updateCell('a7', 26);
  updateCell('b7', 26);
  updateCell('c7', 26);
  updateCell('d7', 26);
  updateCell('e7', 26);
  updateCell('f7', 26);
  updateCell('g7', 26);
  updateCell('h7', 26);
  //torres pretas
  updateCell('a8', 23);
  updateCell('h8', 23);
  //cavalos pretos
  updateCell('b8', 25);
  updateCell('g8', 25);
  //bispos pretos
  updateCell('c8', 24);
  updateCell('f8', 24);
  //rei preto
  updateCell('e8', 21);
  //dama preta
  updateCell('d8', 22);
 
  currentPlayer = 0;
}

function updateSelectionTable(row, col, piece, color){
  if(row==null){
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        selectionTable[r][c] = 0;
      }
    }
    return 0;
  }
  
  //PEÃO----------------------------------------------------------------------------------------------
  if(piece==6){
    if(color==0 && row>0){
      if(currentTablechess[row-1][col]==0){
        selectionTable[row-1][col] = 1;
        if(row==6 && (currentTablechess[row-2][col]==0)){
          selectionTable[row-2][col] = 1;
        }
      }
      if(col>0 && currentTablechess[row-1][col-1]>20){
        selectionTable[row-1][col-1] = 2;
      }
      if(col<7 && currentTablechess[row-1][col+1]>20){
        selectionTable[row-1][col+1] = 2;
      }
    }
    if(color==1 && row<7){
      if(currentTablechess[row+1][col]==0){
        selectionTable[row+1][col] = 1;
        if(row==1 && (currentTablechess[row+2][col]==0)){
          selectionTable[row+2][col] = 1;
        }
      }
      if(col>0 && currentTablechess[row+1][col-1]<20 && currentTablechess[row+1][col-1]>10){
        selectionTable[row+1][col-1] = 2;
      }
      if(col<7 && currentTablechess[row+1][col+1]<20 && currentTablechess[row+1][col+1]>10){
        selectionTable[row+1][col+1] = 2;
      }
    }
  }
  
  //CAVALO---------------------------------------------------------------------------------------------
  if(piece==5){
    if(col<6){
      if(row>0){ 
        if(currentTablechess[row-1][col+2]==0){
          selectionTable[row-1][col+2]=1;
        } else if((Math.floor(currentTablechess[row-1][col+2]/10)-1)!=color){
          selectionTable[row-1][col+2]=2;
        }
      }
      if(row<7){ 
        if(currentTablechess[row+1][col+2]==0){
          selectionTable[row+1][col+2]=1;
        } else if((Math.floor(currentTablechess[row+1][col+2]/10)-1)!=color){
          selectionTable[row+1][col+2]=2;
        }
      }
    }
    
    if(col>1){
      if(row>0){ 
        if(currentTablechess[row-1][col-2]==0){
          selectionTable[row-1][col-2]=1;
        } else if((Math.floor(currentTablechess[row-1][col-2]/10)-1)!=color){
          selectionTable[row-1][col-2]=2;
        }
      }
      if(row<7){ 
        if(currentTablechess[row+1][col-2]==0){
          selectionTable[row+1][col-2]=1;
        } else if((Math.floor(currentTablechess[row+1][col-2]/10)-1)!=color){
          selectionTable[row+1][col-2]=2;
        }
      }
    }
    
    if(row<6){
      if(col>0){ 
        if(currentTablechess[row+2][col-1]==0){
          selectionTable[row+2][col-1]=1;
        } else if((Math.floor(currentTablechess[row+2][col-1]/10)-1)!=color){
          selectionTable[row+2][col-1]=2;
        }
      }
      if(col<7){ 
        if(currentTablechess[row+2][col+1]==0){
          selectionTable[row+2][col+1]=1;
        } else if((Math.floor(currentTablechess[row+2][col+1]/10)-1)!=color){
          selectionTable[row+2][col+1]=2;
        }
      }
    }
    
    if(row>1){
      if(col>0){ 
        if(currentTablechess[row-2][col-1]==0){
          selectionTable[row-2][col-1]=1;
        } else if((Math.floor(currentTablechess[row-2][col-1]/10)-1)!=color){
          selectionTable[row-2][col-1]=2;
        }
      }
      if(col<7){ 
        if(currentTablechess[row-2][col+1]==0){
          selectionTable[row-2][col+1]=1;
        } else if((Math.floor(currentTablechess[row-2][col+1]/10)-1)!=color){
          selectionTable[row-2][col+1]=2;
        }
      }
    }
    
    
    
    
  }
  
  //BISPO OU DAMA---------------------------------------------------------------------------------------------
  if(piece==4 || piece==2){
    for(let i=1; i<8; i++){
      if(((col+i)<8) && ((row-i)>=0)){
        if(currentTablechess[row-i][col+i]==0){
          selectionTable[row-i][col+i]=1;
        } else if((Math.floor(currentTablechess[row-i][col+i]/10)-1)!=color){
          selectionTable[row-i][col+i]=2;
          break;
        } else{
          break;
        }
      }
    }
    for(let i=1; i<8; i++){
      if(((col+i)<8) && ((row+i)<8)){
        if(currentTablechess[row+i][col+i]==0){
          selectionTable[row+i][col+i]=1;
        } else if((Math.floor(currentTablechess[row+i][col+i]/10)-1)!=color){
          selectionTable[row+i][col+i]=2;
          break;
        } else{
          break;
        }
      }
    }
    for(let i=1; i<8; i++){
      if(((col-i)>=0) && ((row+i)<8)){
        if(currentTablechess[row+i][col-i]==0){
          selectionTable[row+i][col-i]=1;
        } else if((Math.floor(currentTablechess[row+i][col-i]/10)-1)!=color){
          selectionTable[row+i][col-i]=2;
          break;
        } else{
          break;
        }
      }
    }
    for(let i=1; i<8; i++){
      if(((col-i)>=0) && ((row-i)>=0)){
        if(currentTablechess[row-i][col-i]==0){
          selectionTable[row-i][col-i]=1;
        } else if((Math.floor(currentTablechess[row-i][col-i]/10)-1)!=color){
          selectionTable[row-i][col-i]=2;
          break;
        } else{
          break;
        }
      }
    }
  }
  
  //TORRE OU DAMA---------------------------------------------------------------------------------------------
  if(piece==3 || piece==2){
    for(let i=1; i<8; i++){
      if((col+i)<8){
        if(currentTablechess[row][col+i]==0){
          selectionTable[row][col+i]=1;
        } else if((Math.floor(currentTablechess[row][col+i]/10)-1)!=color){
          selectionTable[row][col+i]=2;
          break;
        } else{
          break;
        }
      }
    }
    for(let i=1; i<8; i++){
      if((col-i)>=0){
        if(currentTablechess[row][col-i]==0){
          selectionTable[row][col-i]=1;
        } else if((Math.floor(currentTablechess[row][col-i]/10)-1)!=color){
          selectionTable[row][col-i]=2;
          break;
        } else{
          break;
        }
      }
    }
    for(let i=1; i<8; i++){
      if((row+i)<8){
        if(currentTablechess[row+i][col]==0){
          selectionTable[row+i][col]=1;
        } else if((Math.floor(currentTablechess[row+i][col]/10)-1)!=color){
          selectionTable[row+i][col]=2;
          break;
        } else{
          break;
        }
      }
    }
    for(let i=1; i<8; i++){
      if((row-i)>=0){
        if(currentTablechess[row-i][col]==0){
          selectionTable[row-i][col]=1;
        } else if((Math.floor(currentTablechess[row-i][col]/10)-1)!=color){
          selectionTable[row-i][col]=2;
          break;
        } else{
          break;
        }
      }
    }

    
    
  }
  
  //REI---------------------------------------------------------------------------------------------
  if(piece==1){
    if(col<7){
      if(currentTablechess[row][col+1]==0){
        selectionTable[row][col+1]=1;
      } else if((Math.floor(currentTablechess[row][col+1]/10)-1)!=color){
        selectionTable[row][col+1]=2;
      }
      if(row<7){
        if(currentTablechess[row+1][col+1]==0){
          selectionTable[row+1][col+1]=1;
        } else if((Math.floor(currentTablechess[row+1][col+1]/10)-1)!=color){
          selectionTable[row+1][col+1]=2;
        }
      }
      if(row>0){
        if(currentTablechess[row-1][col+1]==0){
          selectionTable[row-1][col+1]=1;
        } else if((Math.floor(currentTablechess[row-1][col+1]/10)-1)!=color){
          selectionTable[row-1][col+1]=2;
        }
      }
    }
    if(col>0){
      if(currentTablechess[row][col-1]==0){
        selectionTable[row][col-1]=1;
      } else if((Math.floor(currentTablechess[row][col-1]/10)-1)!=color){
        selectionTable[row][col-1]=2;
      }
      if(row<7){
        if(currentTablechess[row+1][col-1]==0){
          selectionTable[row+1][col-1]=1;
        } else if((Math.floor(currentTablechess[row+1][col-1]/10)-1)!=color){
          selectionTable[row+1][col-1]=2;
        }
      }
      if(row>0){
        if(currentTablechess[row-1][col-1]==0){
          selectionTable[row-1][col-1]=1;
        } else if((Math.floor(currentTablechess[row-1][col-1]/10)-1)!=color){
          selectionTable[row-1][col-1]=2;
        }
      }
    }
    
    if(row<7){
      if(currentTablechess[row+1][col]==0){
        selectionTable[row+1][col]=1;
      } else if((Math.floor(currentTablechess[row+1][col]/10)-1)!=color){
        selectionTable[row+1][col]=2;
      }
    }
    if(row>0){
      if(currentTablechess[row-1][col]==0){
        selectionTable[row-1][col]=1;
      } else if((Math.floor(currentTablechess[row-1][col]/10)-1)!=color){
        selectionTable[row-1][col]=2;
      }
    }
  }
}

const HTMLCells = document.querySelectorAll('.cell');

const piecesImagesSrc = [];
piecesImagesSrc[11] = 'raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/11.png';
piecesImagesSrc[12] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/12.png';
piecesImagesSrc[13] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/13.png';
piecesImagesSrc[14] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/14.png';
piecesImagesSrc[15] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/15.png';
piecesImagesSrc[16] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/16.png';
piecesImagesSrc[21] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/21.png';
piecesImagesSrc[22] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/22.png';
piecesImagesSrc[23] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/23.png';
piecesImagesSrc[24] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/24.png';
piecesImagesSrc[25] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/25.png';
piecesImagesSrc[26] = 'https://raw.githubusercontent.com/GesseMarchioro/SysGames/refs/heads/main/PecasXadrez/26.png';

const piecesImages = [];
for (let r = 0; r < 8; r++) {
  for (let c = 0; c < 8; c++) {
    piecesImages[c + 8*r] = document.createElement('img');
    piecesImages.alt = 'Piece';
  }
}







beginTablechess();

updateTablechessScreen();









HTMLCells.forEach((cell, index) => {
  cell.addEventListener('mouseenter', () => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    
    const canSelectOrigin = (selectedOrigin[0]==null)&&(((20*(currentPlayer+1))>currentTablechess[row][col]) && (currentTablechess[row][col]>(10*(currentPlayer+1))));
    const canSelectTarget = (selectedOrigin[0]!=null)&&(selectionTable[row][col]==1);
    const canSelectKill = (selectedOrigin[0]!=null)&&(selectionTable[row][col]==2);
    const canDeSelectOrigin = (selectedOrigin[0]==row && selectedOrigin[1]==col);
    
    cell.style.cursor = (canSelectOrigin||canSelectTarget||canDeSelectOrigin||canSelectKill) ? 'pointer' : 'default';
  });
});


HTMLCells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    
    
    const canSelectOrigin = (selectedOrigin[0]==null)&&(((20*(currentPlayer+1))>currentTablechess[row][col]) && (currentTablechess[row][col]>(10*(currentPlayer+1))));
    const canSelectTarget = (selectedOrigin[0]!=null)&&(selectionTable[row][col]==1);
    const canDeSelectOrigin = (selectedOrigin[0]==row && selectedOrigin[1]==col);
    const canSelectKill = (selectedOrigin[0]!=null)&&(selectionTable[row][col]==2);

    
    
    
    if(canSelectOrigin){
      selectionTable[row][col] = 100; //100 = selected origin
      selectedOrigin[0]=row;
      selectedOrigin[1]=col;      
    }
    
    if(canDeSelectOrigin){
      selectionTable[row][col] = 0;
      selectedOrigin[0]=null;
      selectedOrigin[1]=null;
    }
    
    if(canSelectTarget||canSelectKill){
      currentTablechess[row][col] = currentTablechess[selectedOrigin[0]][selectedOrigin[1]];
      currentTablechess[selectedOrigin[0]][selectedOrigin[1]] = 0;
      selectedOrigin[0]=null;
      selectedOrigin[1]=null;
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          selectionTable[r][c] = 0;
        }
      }
      
      currentPlayer = currentPlayer ? 0 : 1;
    }
    
    if(canSelectOrigin||canDeSelectOrigin||canSelectTarget||canSelectKill){
      const color = currentPlayer;
      const piece = currentTablechess[row][col]-(10*(color+1));
      updateSelectionTable(selectedOrigin[0], selectedOrigin[1], piece, color);
    }
    
    updateTablechessScreen();

  });
});

