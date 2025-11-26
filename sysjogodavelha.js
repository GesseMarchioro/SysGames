var cells_main_grid = document.getElementsByClassName("mg_place");  //array de 9 posições. Cada uma é uma célula da grid externa
var tables_main_grid = document.getElementsByClassName("sub_grid"); //array de 9 posições. Cada uma é uma das grids internas
var currentPlayer = document.getElementById("currentPlayer");

var current_player = 1;                      // 1 = X; 2 = O.
var playerSymbol = [null, 'X', 'O', 'V']; 
currentPlayer.innerHTML = playerSymbol[current_player];
const indexes = [0, 0, 1, 1, 2];
var enabledSubGrids = [[1, 1, 1],[1, 1, 1],[1, 1, 1]];
var games_result = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
var games_matrix = [[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]],[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]],[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]]];
var winner = 0;

function changePlayer(){
  if (current_player==1)
    current_player = 2;
  else
    current_player = 1;
}

function updatePositions(mg_row, mg_cell, sg_row, sg_cell, player){
  games_matrix[mg_row][mg_cell][sg_row][sg_cell] = player;
  /*console.log(games_matrix);*/
}

function enableSubgrids(lastRow, lastCell){
  if(games_result[lastRow][lastCell]===0){
    enabledSubGrids = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    enabledSubGrids[lastRow][lastCell] = 1;
  } else{
    for (let i = 0; i <= 2; i++)
      for (let j = 0; j <= 2; j++)
        if(games_result[i][j]===0)
          enabledSubGrids[i][j] = 1;
        else
          enabledSubGrids[i][j] = 0;
  }
}

function checkWinner(){
  for (let i = 0; i <= 2; i++){
    for (let j = 0; j <= 2; j++){           /*Pra cada um dos 9 jogos (i=linhas, j=colunas)*/
      if(games_result[i][j]==0){            /*Se ainda não foi definido esse jogo*/
        var game = games_matrix[i][j];      /*Seleciona o jogo interno*/
        
        var m = 0;                          /*Verifica se já foram marcadas todas as casas*/
        for (let k = 0; k <= 2; k++)
          for (let l = 0; l <= 2; l++)
            if(game[k][l]===0)
              m = 1;
        if(m===0)
        games_result[i][j] = 3;
        
        for (let k = 0; k <= 2; k++){  /*verifica se ganhou*/
          if(      (game[k][0] === game[k][1]) && (game[k][0] === game[k][2]) && (game[k][0] !== 0)){
            games_result[i][j] = game[k][0];
          }
          else if( (game[0][k] === game[1][k]) && (game[0][k] === game[2][k]) && (game[0][k] !== 0)){
            games_result[i][j] = game[0][k];
          }
        }
        if(        (game[0][0] === game[1][1]) && (game[0][0] === game[2][2]) && (game[0][0] !== 0)){
          games_result[i][j] = game[0][0];
        }
        else if(   (game[2][0] === game[1][1]) && (game[2][0] === game[0][2]) && (game[2][0] !== 0)){
          games_result[i][j] = game[2][0];
        }
      }
    }
  }
    
  game = games_result;
  for (let k = 0; k <= 2; k++){
    if(      (game[k][0] === game[k][1]) && (game[k][0] === game[k][2]) && (game[k][0] !== 0) && (game[k][0] !== 3))
      winner = game[k][0];
    else if( (game[0][k] === game[1][k]) && (game[0][k] === game[2][k]) && (game[0][k] !== 0) && (game[0][k] !== 3))
      winner = game[0][k]
  }
  if(        (game[0][0] === game[1][1]) && (game[0][0] === game[2][2]) && (game[0][0] !== 0) && (game[0][0] !== 3))
    winner = game[0][0];
  else if(   (game[2][0] === game[1][1]) && (game[2][0] === game[0][2]) && (game[2][0] !== 0) && (game[2][0] !== 3))
    winner = game[2][0];
}

function updateScreen(){
  for (let i = 0; i <= 2; i++)
    for (let j = 0; j <= 2; j++){
      if(games_result[i][j] !== 0)
        cells_main_grid[(i*3)+j].innerHTML = '<div class="finishedGames">'+playerSymbol[games_result[i][j]]+'</div>';
      if(enabledSubGrids[i][j] === 0)
        cells_main_grid[(i*3)+j].style.backgroundColor = 'lightgray';
      else
        cells_main_grid[(i*3)+j].style.backgroundColor = 'white';
    }
  if (winner !== 0)
    alert("Fim de jogo.\nParabéns, jogador "+playerSymbol[winner]+"!");
  currentPlayer.innerHTML = playerSymbol[current_player];
}

function game(){
  for (let i = 0; i <= 2; i++){
    for (let j = 0; j <= 2; j++){
      tables_main_grid[(i*3)+j].addEventListener('click', function(event){
        if((enabledSubGrids[i][j]===1) && (winner===0)){
          const cell = event.target;
          if(cell.textContent === '' && (cell.tagName.toLowerCase() === 'td')){
            const cellIndex = cell.cellIndex;
            const rowIndex = cell.parentElement.rowIndex;
            if((cellIndex!==1) && (cellIndex!==3) && (rowIndex!==1) && (rowIndex!==3)){
              cell.textContent = playerSymbol[current_player];
              updatePositions(i, j, indexes[rowIndex], indexes[cellIndex], current_player);
              checkWinner();
              enableSubgrids(indexes[rowIndex], indexes[cellIndex]);
              changePlayer();
              updateScreen();
            }
          }
        }
      });
    }
  } 
}

game();
