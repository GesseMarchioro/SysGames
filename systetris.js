/*while(1){
  window.open("", i, "width=200,height=100");
}*/

var i = 0;
var j = 0;
var t = 1000;
var y = 0;
var z = 0;
var x = 0;
var volume_geral = 0.05;
var startado = 0;
var interrupcao = setInterval(periodo, 1000); //de 1000 em 1000 mili segundos
var pausado = 0;
document.onkeydown = keydown;
document.onkeyup = keyup;
var para_peca = 1;
var peca_atual = 0;
var rotacao = 0;
var celulas_main_grid = document.getElementsByClassName("c_mg");
var celulas_grid_esquerda = document.getElementsByClassName("c_mg1");
var celulas_grid_direita1 = document.getElementsByClassName("c_mg2");
var celulas_grid_direita2 = document.getElementsByClassName("c_mg3");
var celulas_grid_direita3 = document.getElementsByClassName("c_mg4");
var quadro = document.getElementById("quadro");
var main_grid = document.getElementById("main_grid");
var pecas_fixas = [["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"]];
var peca_descendo = [["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"]];
var proxs_pcs = [0, 0, 0];
var peca_holdada = 0;
var hold_bloqueado = 0;

var sound_start = new Audio();
sound_start.src = "https://cdn.glitch.com/44fb80ee-8a3d-4276-8f6b-ed8ac2ef76b5%2Fstart.mp3?1551641308052";
sound_start.volume = 1;
var sound_game_over = new Audio();
sound_game_over.src = "https://cdn.glitch.com/44fb80ee-8a3d-4276-8f6b-ed8ac2ef76b5%2Fgameover.mp3?1551641307610";
sound_game_over.volume = 1;
var sound_up = new Audio();
sound_up.src = "https://cdn.glitch.com/44fb80ee-8a3d-4276-8f6b-ed8ac2ef76b5%2Frotate.mp3?1551641308478";
sound_up.volume = 1;
var sound_move = new Audio();
//sound_move.src = "https://cdn.glitch.com/44fb80ee-8a3d-4276-8f6b-ed8ac2ef76b5%2Fmove.mp3?1551641698618";
//sound_move.volume = 1;
var sound_arrived = new Audio();
sound_arrived.src = "https://cdn.glitch.com/44fb80ee-8a3d-4276-8f6b-ed8ac2ef76b5%2Farrived.mp3?1551641307373";
sound_arrived.volume = 1;
var sound_pause = new Audio();
sound_pause.src = "https://cdn.glitch.com/44fb80ee-8a3d-4276-8f6b-ed8ac2ef76b5%2Fpause.mp3?1551641307674";
sound_pause.volume = 1;
var sound_break_line = new Audio();
sound_break_line.src = "https://cdn.glitch.com/44fb80ee-8a3d-4276-8f6b-ed8ac2ef76b5%2Fbreakline.mp3?1551641307470";
sound_break_line.volume = 1;

clearInterval(interrupcao);
pausado = 1;

function start(){
  var i = 0;
  for(i=0; i<200; i++){
    celulas_main_grid[i].style.width = "22px";
    celulas_main_grid[i].style.height = "22px";
    celulas_main_grid[i].style.backgroundColor = "black"; 
    celulas_main_grid[i].style.boxShadow = "inset 1px 1px 3px -2px gray, inset -1px -1px 8px -2px gray";//" inset 3px 3px 5px -2px gray, inset -3px -3px 12px -2px gray";
  }
  for(i=0; i<12; i++){
    celulas_grid_esquerda[i].style.width = "15px";
    celulas_grid_esquerda[i].style.height = "15px";
    celulas_grid_esquerda[i].style.backgroundColor = "black"; 
    celulas_grid_esquerda[i].style.boxShadow = "inset 1px 1px 3px -2px gray, inset -1px -1px 8px -2px gray";//" inset 3px 3px 5px -2px gray, inset -3px -3px 12px -2px gray";
    celulas_grid_direita1[i].style.width = "15px";
    celulas_grid_direita1[i].style.height = "15px";
    celulas_grid_direita1[i].style.backgroundColor = "black"; 
    celulas_grid_direita1[i].style.boxShadow = "inset 1px 1px 3px -2px gray, inset -1px -1px 8px -2px gray";//" inset 3px 3px 5px -2px gray, inset -3px -3px 12px -2px gray";
    celulas_grid_direita2[i].style.width = "15px";
    celulas_grid_direita2[i].style.height = "15px";
    celulas_grid_direita2[i].style.backgroundColor = "black"; 
    celulas_grid_direita2[i].style.boxShadow = "inset 1px 1px 3px -2px gray, inset -1px -1px 8px -2px gray";//" inset 3px 3px 5px -2px gray, inset -3px -3px 12px -2px gray";
    celulas_grid_direita3[i].style.width = "15px";
    celulas_grid_direita3[i].style.height = "15px";
    celulas_grid_direita3[i].style.backgroundColor = "black"; 
    celulas_grid_direita3[i].style.boxShadow = "inset 1px 1px 3px -2px gray, inset -1px -1px 8px -2px gray";//" inset 3px 3px 5px -2px gray, inset -3px -3px 12px -2px gray";
  }
} 
start();
function random(){
  var x = 0;
  while((x>7)|(x<1)){
    x = Math.floor(Math.random()*10);
  }
  return x;
}
function insert_pc(numero_peca){
  rotacao = 0;
  switch(numero_peca){
    case 1: 
      /*         #
                ###                */
      peca_descendo[0][4] = "purple";
      peca_descendo[1][3] = "purple";
      peca_descendo[1][4] = "purple";
      peca_descendo[1][5] = "purple";
      break;
    case 2: 
      /*        ##
                 ##                */
      peca_descendo[0][4] = "red";
      peca_descendo[0][3] = "red";
      peca_descendo[1][4] = "red";
      peca_descendo[1][5] = "red";
      break;
    case 3: 
      /*          ##
                 ##                */
      peca_descendo[0][4] = "green";
      peca_descendo[0][5] = "green";
      peca_descendo[1][3] = "green";
      peca_descendo[1][4] = "green";
      break;
    case 4: 
      /*         ##
                 ##                */
      peca_descendo[0][4] = "yellow";
      peca_descendo[0][5] = "yellow";
      peca_descendo[1][4] = "yellow";
      peca_descendo[1][5] = "yellow";
      break;
    case 5: 
      /*          ###
                    #              */
      peca_descendo[0][3] = "blue";
      peca_descendo[1][4] = "blue";
      peca_descendo[1][5] = "blue";
      peca_descendo[1][3] = "blue";
      break;
    case 6: 
      /*          ###
                  #                */
      peca_descendo[1][3] = "orange";
      peca_descendo[1][4] = "orange";
      peca_descendo[1][5] = "orange";
      peca_descendo[0][5] = "orange";
      break;
    case 7: 
      peca_descendo[1][3] = "lightblue";
      peca_descendo[1][4] = "lightblue";
      peca_descendo[1][5] = "lightblue";
      peca_descendo[1][6] = "lightblue";
      break;
    default: 
       alert("Bugou aqui");
  }  
}
function atualiza_grid_principal(){
  for(j=0; j<20; j++){
    for(i=0; i<10; i++){
      celulas_main_grid[10*(j)+(i)].style.backgroundColor = pecas_fixas[j][i];
      if(peca_descendo[j][i]!="black"){
        celulas_main_grid[10*(j)+(i)].style.backgroundColor = peca_descendo[j][i];
      }
    }
  }
}
function atualiza_grids_direita(){
  var i=0;
  for(i=0;i<12;i++){
    celulas_grid_direita1[i].style.backgroundColor = "black";
    celulas_grid_direita2[i].style.backgroundColor = "black";
    celulas_grid_direita3[i].style.backgroundColor = "black";
  }
  switch(proxs_pcs[0]){
    case 0:
      i=i;
    case 1: 
      /*         #
                ###                */
      celulas_grid_direita1[1].style.backgroundColor = "purple";
      celulas_grid_direita1[4].style.backgroundColor = "purple";
      celulas_grid_direita1[5].style.backgroundColor = "purple";
      celulas_grid_direita1[6].style.backgroundColor = "purple";
      break;
    case 2: 
      /*        ##
                 ##                */
      celulas_grid_direita1[0].style.backgroundColor = "red";
      celulas_grid_direita1[1].style.backgroundColor = "red";
      celulas_grid_direita1[5].style.backgroundColor = "red";
      celulas_grid_direita1[6].style.backgroundColor = "red";
      break;
    case 3: 
      /*          ##
                 ##                */
      celulas_grid_direita1[1].style.backgroundColor = "green";
      celulas_grid_direita1[2].style.backgroundColor = "green";
      celulas_grid_direita1[4].style.backgroundColor = "green";
      celulas_grid_direita1[5].style.backgroundColor = "green";
      break;
    case 4: 
      /*         ##
                 ##                */
      celulas_grid_direita1[1].style.backgroundColor = "yellow";
      celulas_grid_direita1[2].style.backgroundColor = "yellow";
      celulas_grid_direita1[5].style.backgroundColor = "yellow";
      celulas_grid_direita1[6].style.backgroundColor = "yellow";
      break;
    case 5: 
      /*          ###
                    #              */
      celulas_grid_direita1[0].style.backgroundColor = "blue";
      celulas_grid_direita1[1].style.backgroundColor = "blue";
      celulas_grid_direita1[2].style.backgroundColor = "blue";
      celulas_grid_direita1[6].style.backgroundColor = "blue";
      break;
    case 6: 
      /*          ###
                  #                */
      celulas_grid_direita1[0].style.backgroundColor = "orange";
      celulas_grid_direita1[1].style.backgroundColor = "orange";
      celulas_grid_direita1[2].style.backgroundColor = "orange";
      celulas_grid_direita1[4].style.backgroundColor = "orange";
      break;
    case 7: 
      celulas_grid_direita1[4].style.backgroundColor = "lightblue";
      celulas_grid_direita1[5].style.backgroundColor = "lightblue";
      celulas_grid_direita1[6].style.backgroundColor = "lightblue";
      celulas_grid_direita1[7].style.backgroundColor = "lightblue";
      break;
    default: 
      alert("direita1");
  } 
  switch(proxs_pcs[1]){
    case 0:
      i=i;
    case 1: 
      /*         #
                ###                */
      celulas_grid_direita2[1].style.backgroundColor = "purple";
      celulas_grid_direita2[4].style.backgroundColor = "purple";
      celulas_grid_direita2[5].style.backgroundColor = "purple";
      celulas_grid_direita2[6].style.backgroundColor = "purple";
      break;
    case 2: 
      /*        ##
                 ##                */
      celulas_grid_direita2[0].style.backgroundColor = "red";
      celulas_grid_direita2[1].style.backgroundColor = "red";
      celulas_grid_direita2[5].style.backgroundColor = "red";
      celulas_grid_direita2[6].style.backgroundColor = "red";
      break;
    case 3: 
      /*          ##
                 ##                */
      celulas_grid_direita2[1].style.backgroundColor = "green";
      celulas_grid_direita2[2].style.backgroundColor = "green";
      celulas_grid_direita2[4].style.backgroundColor = "green";
      celulas_grid_direita2[5].style.backgroundColor = "green";
      break;
    case 4: 
      /*         ##
                 ##                */
      celulas_grid_direita2[1].style.backgroundColor = "yellow";
      celulas_grid_direita2[2].style.backgroundColor = "yellow";
      celulas_grid_direita2[5].style.backgroundColor = "yellow";
      celulas_grid_direita2[6].style.backgroundColor = "yellow";
      break;
    case 5: 
      /*          ###
                    #              */
      celulas_grid_direita2[0].style.backgroundColor = "blue";
      celulas_grid_direita2[1].style.backgroundColor = "blue";
      celulas_grid_direita2[2].style.backgroundColor = "blue";
      celulas_grid_direita2[6].style.backgroundColor = "blue";
      break
    case 6: 
      /*          ###
                  #                */
      celulas_grid_direita2[0].style.backgroundColor = "orange";
      celulas_grid_direita2[1].style.backgroundColor = "orange";
      celulas_grid_direita2[2].style.backgroundColor = "orange";
      celulas_grid_direita2[4].style.backgroundColor = "orange";
      break;
    case 7: 
      celulas_grid_direita2[4].style.backgroundColor = "lightblue";
      celulas_grid_direita2[5].style.backgroundColor = "lightblue";
      celulas_grid_direita2[6].style.backgroundColor = "lightblue";
      celulas_grid_direita2[7].style.backgroundColor = "lightblue";
      break;
    default: 
      alert("direita2");
  } 
  switch(proxs_pcs[2]){
    case 0:
      i=i;
    case 1: 
      /*         #
                ###                */
      celulas_grid_direita3[1].style.backgroundColor = "purple";
      celulas_grid_direita3[4].style.backgroundColor = "purple";
      celulas_grid_direita3[5].style.backgroundColor = "purple";
      celulas_grid_direita3[6].style.backgroundColor = "purple";
      break;
    case 2: 
      /*        ##
                 ##                */
      celulas_grid_direita3[0].style.backgroundColor = "red";
      celulas_grid_direita3[1].style.backgroundColor = "red";
      celulas_grid_direita3[5].style.backgroundColor = "red";
      celulas_grid_direita3[6].style.backgroundColor = "red";
      break;
    case 3: 
      /*          ##
                 ##                */
      celulas_grid_direita3[1].style.backgroundColor = "green";
      celulas_grid_direita3[2].style.backgroundColor = "green";
      celulas_grid_direita3[4].style.backgroundColor = "green";
      celulas_grid_direita3[5].style.backgroundColor = "green";
      break;
    case 4: 
      /*         ##
                 ##                */
      celulas_grid_direita3[1].style.backgroundColor = "yellow";
      celulas_grid_direita3[2].style.backgroundColor = "yellow";
      celulas_grid_direita3[5].style.backgroundColor = "yellow";
      celulas_grid_direita3[6].style.backgroundColor = "yellow";
      break;
    case 5: 
      /*          ###
                    #              */
      celulas_grid_direita3[0].style.backgroundColor = "blue";
      celulas_grid_direita3[1].style.backgroundColor = "blue";
      celulas_grid_direita3[2].style.backgroundColor = "blue";
      celulas_grid_direita3[6].style.backgroundColor = "blue";
      break
    case 6: 
      /*          ###
                  #                */
      celulas_grid_direita3[0].style.backgroundColor = "orange";
      celulas_grid_direita3[1].style.backgroundColor = "orange";
      celulas_grid_direita3[2].style.backgroundColor = "orange";
      celulas_grid_direita3[4].style.backgroundColor = "orange";
      break;
    case 7: 
      celulas_grid_direita3[4].style.backgroundColor = "lightblue";
      celulas_grid_direita3[5].style.backgroundColor = "lightblue";
      celulas_grid_direita3[6].style.backgroundColor = "lightblue";
      celulas_grid_direita3[7].style.backgroundColor = "lightblue";
      break;
    default: 
      alert("direita3");
  } 
}
function atualiza_grid_esquerda(){
  var i=0;
  for(i=0;i<12;i++){
    celulas_grid_esquerda[i].style.backgroundColor = "black";
  }
  switch(peca_holdada){
    case 0:
      //alert("a");
      break;
    case 1: 
      /*         #
                ###                */
      celulas_grid_esquerda[1].style.backgroundColor = "purple";
      celulas_grid_esquerda[4].style.backgroundColor = "purple";
      celulas_grid_esquerda[5].style.backgroundColor = "purple";
      celulas_grid_esquerda[6].style.backgroundColor = "purple";
      break;
    case 2: 
      /*        ##
                 ##                */
      celulas_grid_esquerda[0].style.backgroundColor = "red";
      celulas_grid_esquerda[1].style.backgroundColor = "red";
      celulas_grid_esquerda[5].style.backgroundColor = "red";
      celulas_grid_esquerda[6].style.backgroundColor = "red";
      break;
    case 3: 
      /*          ##
                 ##                */
      celulas_grid_esquerda[1].style.backgroundColor = "green";
      celulas_grid_esquerda[2].style.backgroundColor = "green";
      celulas_grid_esquerda[4].style.backgroundColor = "green";
      celulas_grid_esquerda[5].style.backgroundColor = "green";
      break;
    case 4: 
      /*         ##
                 ##                */
      celulas_grid_esquerda[1].style.backgroundColor = "yellow";
      celulas_grid_esquerda[2].style.backgroundColor = "yellow";
      celulas_grid_esquerda[5].style.backgroundColor = "yellow";
      celulas_grid_esquerda[6].style.backgroundColor = "yellow";
      break;
    case 5: 
      /*          ###
                    #              */
      celulas_grid_esquerda[0].style.backgroundColor = "blue";
      celulas_grid_esquerda[1].style.backgroundColor = "blue";
      celulas_grid_esquerda[2].style.backgroundColor = "blue";
      celulas_grid_esquerda[6].style.backgroundColor = "blue";
      break;
    case 6: 
      /*          ###
                  #                */
      celulas_grid_esquerda[0].style.backgroundColor = "orange";
      celulas_grid_esquerda[1].style.backgroundColor = "orange";
      celulas_grid_esquerda[2].style.backgroundColor = "orange";
      celulas_grid_esquerda[4].style.backgroundColor = "orange";
      break;
    case 7: 
      celulas_grid_esquerda[4].style.backgroundColor = "lightblue";
      celulas_grid_esquerda[5].style.backgroundColor = "lightblue";
      celulas_grid_esquerda[6].style.backgroundColor = "lightblue";
      celulas_grid_esquerda[7].style.backgroundColor = "lightblue";
      break;
    default: 
      alert("atualiza_display_esquerda_bugou");
  }
}

function keydown(e) {
  e = e || window.event;
  if (e.keyCode == '38'){
    if(pausado==0){
      turn();
    }
  }         // up arrow
  else if (e.keyCode == '40'){
    if(pausado==0){
      faster();
    }
  }    // down arrow
  else if (e.keyCode == '37'){
    if(pausado==0){  
      move_left();
    }
  }    // left arrow
  else if (e.keyCode == '39'){
    if(pausado==0){
      move_right();
    }
  }    // right arrow
  else if (e.keyCode == '80'){
    pause();
  }    // p
  else if (e.keyCode == '32'){
    if(pausado==0){
      drop();
    }
  }    // space
  else if (e.keyCode == '13'){
    ee();
  }    // enter
  else if (e.keyCode == '67'){
    if(pausado==0){
      hold();
    }
  }    // C
}
function keyup(e) {
  e = e || window.event;
  if (e.keyCode == '40'){
    if(pausado==0){
      slower();
    }
  }         // down arrow
}

function move_right(){
  var x = 0;
  for(i=0; i<20; i++){
    for(j=0; j<10; j++){
      if(peca_descendo[i][j]!="black"){
        if(j==9){
          x = 1;
        } else if(pecas_fixas[i][j+1]!="black"){
          x = 1;
        }
      }
    }
  }
  if(x==0){
    for(i=0; i<20; i++){
      for(j=9; j>0; j--){
        peca_descendo[i][j] = peca_descendo[i][j-1];
      }
      peca_descendo[i][0] = "black";
    }
    sound_move.play();
    atualiza_grid_principal();
  }
  x = 0;
}  //           >
function move_left(){
  var x = 0;
  for(i=0; i<20; i++){
    for(j=0; j<10; j++){
      if(peca_descendo[i][j]!="black"){
        if(j==0){
          x = 1;
        } else if(pecas_fixas[i][j-1]!="black"){
          x = 1;
        }
      }
    }
  }
  if(x==0){
    for(i=0; i<20; i++){
      for(j=0; j<9; j++){
        peca_descendo[i][j] = peca_descendo[i][j+1];
      }
      peca_descendo[i][9] = "black";
    }
    sound_move.play();
    atualiza_grid_principal();
  }
  x = 0;
}   //           <
function faster(){
  if(y==0){
    clearInterval(interrupcao);
    interrupcao = setInterval(periodo, t/15);
    y = 1;
  }
}      //   press   v 
function slower(){
  if(y==1){
    clearInterval(interrupcao);
    interrupcao = setInterval(periodo, t);
    y = 0;
  }
}      //   release v
function turn(){
  if(peca_atual==1){                
    if(rotacao==0){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<9; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(i>=0){
              if(pecas_fixas[i+2][j]=="black"){
                peca_descendo[i+1][j-1]="black";
                peca_descendo[i+2][j]="purple";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 1;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    } 
    else if(rotacao==1){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<9; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=0)&&(j>=1)){
              if(pecas_fixas[i+1][j-1]=="black"){
                peca_descendo[i][j]="black";
                peca_descendo[i+1][j-1]="purple";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 2;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==2){
      var x = 0;
      for(i=0; i<19; i++){
        for(j=0; j<8; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=0)){
              if(pecas_fixas[i-1][j+1]=="black"){
                peca_descendo[i][j+2]="black";
                peca_descendo[i-1][j+1]="purple";    if(i-1==19){  para_peca = 1; } else if(pecas_fixas[i-1+1][j]!="black"){  para_peca = 1; }
                rotacao = 3;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==3){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=1; j<10; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=1)&&(j<9)){
              if(pecas_fixas[i+1][j+1]=="black"){
                peca_descendo[i+2][j]="black";
                peca_descendo[i+1][j+1]="purple";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 0;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
  }    // tres em baixo e uma em cima no meio
  if(peca_atual==2){
    if(rotacao==0){
      var x = 0;
      for(i=0; i<19; i++){
        for(j=0; j<8; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(i>=1){
              if((pecas_fixas[i-1][j+1]=="black") && ((pecas_fixas[i+1][j]=="black"))){
                peca_descendo[i+1][j+1]="black";
                peca_descendo[i+1][j+2]="black";
                peca_descendo[i-1][j+1]="red";    if(i-1==19){  para_peca = 1; } else if(pecas_fixas[i-1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j]="red";      if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 1;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    } 
    else if(rotacao==1){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<10; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=0) && (j<9) && (j>0)){
              if((pecas_fixas[i][j-1]=="black") && ((pecas_fixas[i+1][j+1]=="black"))){
                peca_descendo[i+1][j-1]="black";
                peca_descendo[i+2][j-1]="black";
                peca_descendo[i][j-1]="red";      if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+1]="red";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 2;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==2){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<8; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=1)){
              if((pecas_fixas[i][j+2]=="black") && ((pecas_fixas[i+2][j+1]=="black"))){
                peca_descendo[i][j]="black";
                peca_descendo[i][j+1]="black";
                peca_descendo[i][j+2]="red";      if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j+1]="red";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 3;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==3){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<10; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=1)&&(j>1)){
              if((pecas_fixas[i+1][j-2]=="black") && ((pecas_fixas[i+2][j]=="black"))){
                peca_descendo[i][j]="black";
                peca_descendo[i+1][j]="black";
                peca_descendo[i+1][j-2]="red";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j]="red";      if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 0;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
  }    // duas em cima e duas embaixo --__
  if(peca_atual==3){
    if(rotacao==0){
      var x = 0;
      for(i=0; i<19; i++){
        for(j=0; j<9; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(i>=1){
              if((pecas_fixas[i-1][j-1]=="black") && ((pecas_fixas[i][j-1]=="black"))){
                peca_descendo[i][j+1]="black";
                peca_descendo[i+1][j-1]="black";
                peca_descendo[i-1][j-1]="green";    if(i-1==19){  para_peca = 1; } else if(pecas_fixas[i-1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i][j-1]="green";      if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                rotacao = 1;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    } 
    else if(rotacao==1){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<9; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((j<8)){
              if((pecas_fixas[i][j+1]=="black") && ((pecas_fixas[i+1][j+1]=="black"))){
                peca_descendo[i][j]="black";
                peca_descendo[i+2][j+1]="black";
                peca_descendo[i][j+1]="green";    if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i][j+2]="green";    if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                rotacao = 2;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==2){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<9; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((1)){
              if((pecas_fixas[i+1][j+1]=="black") && ((pecas_fixas[i+2][j+1]=="black"))){
                peca_descendo[i][j+1]="black";
                peca_descendo[i+1][j-1]="black";
                peca_descendo[i+1][j+1]="green";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j+1]="green";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 3;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==3){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<10; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=1)&&(j>=1)){
              if((pecas_fixas[i+2][j-1]=="black") && ((pecas_fixas[i+2][j]=="black"))){
                peca_descendo[i][j]="black";
                peca_descendo[i+2][j+1]="black";
                peca_descendo[i+2][j]="green";      if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j-1]="green";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 0;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
  }    // duas em cima e duas embaixo __--
  if(peca_atual==4){
    sound_up.play();
  }       //  quadrado
  if(peca_atual==5){
    if(rotacao==0){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<8; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(1){
              if((pecas_fixas[i][j+1]=="black") && (pecas_fixas[i][j+2]=="black") && (pecas_fixas[i+2][j+1]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i+1][j]="black";
                peca_descendo[i+1][j+2]="black";
                peca_descendo[i][j+1]="blue";      if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i][j+2]="blue";      if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j+1]="blue";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 1;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    } 
    else if(rotacao==1){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<9; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((j>0)){
              if((pecas_fixas[i+1][j-1]=="black") && (pecas_fixas[i+1][j+1]=="black") && (pecas_fixas[i+2][j+1]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i][j+1]="black";
                peca_descendo[i+2][j]="black";
                peca_descendo[i+1][j-1]="blue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+1]="blue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j+1]="blue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 2;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==2){
      var x = 0;
      for(i=0; i<19; i++){
        for(j=0; j<8; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=1)){
              if((pecas_fixas[i-1][j+1]=="black") && (pecas_fixas[i+1][j+1]=="black") && (pecas_fixas[i+1][j]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i][j+2]="black";
                peca_descendo[i+1][j+2]="black";
                peca_descendo[i-1][j+1]="blue";    if(i-1==19){  para_peca = 1; } else if(pecas_fixas[i-1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+1]="blue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j]="blue";      if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 3;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==3){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<10; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(j<9){
              if((pecas_fixas[i][j-1]=="black") && (pecas_fixas[i+1][j-1]=="black") && (pecas_fixas[i+1][j+1]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i+2][j]="black";
                peca_descendo[i+2][j-1]="black";
                peca_descendo[i][j-1]="blue";      if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j-1]="blue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+1]="blue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 0;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
  }
  if(peca_atual==6){
    if(rotacao==0){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<10; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(1){
              if((pecas_fixas[i][j-1]=="black") && (pecas_fixas[i+2][j-1]=="black") && (pecas_fixas[i+2][j]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i+1][j]="black";
                peca_descendo[i+1][j-2]="black";
                peca_descendo[i][j-1]="orange";      if(i==19){  para_peca = 1; } else if(pecas_fixas[i+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j-1]="orange";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j]="orange";      if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 1;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    } 
    else if(rotacao==1){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<9; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(j>0){
              if((pecas_fixas[i+1][j-1]=="black") && (pecas_fixas[i+1][j+1]=="black") && (pecas_fixas[i+2][j-1]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i+2][j]="black";
                peca_descendo[i+2][j+1]="black";
                peca_descendo[i+1][j-1]="orange";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+1]="orange";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j-1]="orange";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 2;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==2){
      var x = 0;
      for(i=0; i<19; i++){
        for(j=0; j<8; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=1)){
              if((pecas_fixas[i-1][j+1]=="black") && (pecas_fixas[i+1][j+1]=="black") && (pecas_fixas[i+1][j]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i][j+2]="black";
                peca_descendo[i+1][j]="black";
                peca_descendo[i-1][j]="orange";      if(i-1==19){  para_peca = 1; } else if(pecas_fixas[i-1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i-1][j+1]="orange";    if(i-1==19){  para_peca = 1; } else if(pecas_fixas[i-1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+1]="orange";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 3;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==3){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<9; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(j<8){
              if((pecas_fixas[i][j+2]=="black") && (pecas_fixas[i+1][j]=="black") && (pecas_fixas[i+1][j+2]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i][j+1]="black";
                peca_descendo[i+2][j+1]="black";
                peca_descendo[i][j+2]="orange";
                peca_descendo[i+1][j]="orange";
                peca_descendo[i+1][j+2]="orange";
                rotacao = 0;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
  }
  if(peca_atual==7){
    if(rotacao==0){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<7; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if(i>1){
              if((pecas_fixas[i-1][j+1]=="black") && (pecas_fixas[i-2][j+1]=="black") && (pecas_fixas[i+1][j+1]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i][j+2]="black";
                peca_descendo[i][j+3]="black";
                peca_descendo[i-1][j+1]="lightblue";    if(i-1==19){  para_peca = 1; } else if(pecas_fixas[i-1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i-2][j+1]="lightblue";    if(i-2==19){  para_peca = 1; } else if(pecas_fixas[i-2+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+1]="lightblue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 1;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    } 
    else if(rotacao==1){
      var x = 0;
      for(i=0; i<17; i++){
        for(j=0; j<10; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((j>0)&&(j<8)){
              if((pecas_fixas[i+1][j-1]=="black") && (pecas_fixas[i+1][j+1]=="black") && (pecas_fixas[i+2][j-1]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i+2][j]="black";
                peca_descendo[i+3][j]="black";
                peca_descendo[i+1][j-1]="lightblue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+1]="lightblue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+2]="lightblue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                rotacao = 2;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==2){
      var x = 0;
      for(i=0; i<18; i++){
        for(j=0; j<7; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((i>=1)){
              if((pecas_fixas[i-1][j+2]=="black") && (pecas_fixas[i+1][j+2]=="black") && (pecas_fixas[i+2][j+2]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i][j+1]="black";
                peca_descendo[i][j+3]="black";
                peca_descendo[i-1][j+2]="lightblue";    if(i-1==19){  para_peca = 1; } else if(pecas_fixas[i-1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+1][j+2]="lightblue";    if(i+1==19){  para_peca = 1; } else if(pecas_fixas[i+1+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j+2]="lightblue";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 3;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
    else if(rotacao==3){
      var x = 0;
      for(i=0; i<17; i++){
        for(j=0; j<10; j++){
          if((peca_descendo[i][j]!="black") && (x==0)){
            if((j>1)&&(j<=8)){
              if((pecas_fixas[i+2][j+1]=="black") && (pecas_fixas[i+2][j-1]=="black") && (pecas_fixas[i+2][j-2]=="black")){
                peca_descendo[i][j]="black";
                peca_descendo[i+1][j]="black";
                peca_descendo[i+3][j]="black";
                peca_descendo[i+2][j-2]="lightblue";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j-1]="lightblue";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                peca_descendo[i+2][j+1]="lightblue";    if(i+2==19){  para_peca = 1; } else if(pecas_fixas[i+2+1][j]!="black"){  para_peca = 1; }
                rotacao = 0;
                sound_up.play();
              }
            }
            x = 1;
          }
        }
      }
    }
  }
  atualiza_grid_principal();
}        //           ^
function pause(){
  if(startado==1){
    if(pausado==0){
      clearInterval(interrupcao);
      pausado = 1;
      sound_pause.play();
    } else{
      interrupcao = setInterval(periodo, t);
      pausado = 0;
      sound_pause.play();
    }
  }
}       //           p 
function drop(){
  clearInterval(interrupcao);
  interrupcao = setInterval(periodo, t/200);
  y = 1;
}        //           space
function ee(){
  /*sound_break_line.src = "https://cdn.glitch.com/44fb80ee-8a3d-4276-8f6b-ed8ac2ef76b5%2Fgemidao.mp3?1551629470081";
  sound_game_over.volume = volume_geral;
  sound_start.volume = volume_geral;
  sound_up.volume = volume_geral;
  sound_move.volume = volume_geral;
  sound_arrived.volume = volume_geral;
  sound_pause.volume = volume_geral;
  sound_break_line.volume = 1;*/

  if((pausado==1)&&(startado==0)){
    interrupcao = setInterval(periodo, t);
    pausado = 0;
    startado = 1;
    para_peca = 1;
    quadro.style.display = "none"
    pecas_fixas = [["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"]];
    peca_descendo = [["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"]];
    atualiza_grid_principal();
    proxs_pcs = [random(), random(), random()];
    peca_holdada = 0;
    atualiza_grids_direita();
    atualiza_grid_esquerda();
  }
}          //           enter
function hold(){
  if(hold_bloqueado==0){
    var peca_holdada_0 = peca_holdada;
    peca_holdada = peca_atual;
    atualiza_grid_esquerda();
    peca_descendo = [["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"]];
    if(peca_holdada_0==0){
      peca_atual = proxs_pcs[0];
      proxs_pcs[0]=proxs_pcs[1];
      proxs_pcs[1]=proxs_pcs[2];
      proxs_pcs[2]=random();
      atualiza_grids_direita();
      insert_pc(peca_atual);
      atualiza_grid_principal();
      clearInterval(interrupcao);
      interrupcao = setInterval(periodo, t);
    } else{
      peca_atual = peca_holdada_0;
      insert_pc(peca_atual);
      clearInterval(interrupcao);
      interrupcao = setInterval(periodo, t);
      atualiza_grid_principal();
    }
    hold_bloqueado = 1;
  }
}        //           C

function line_detect(){
  var cont = 0;
  for(x=0; x<20; x++){
    cont = 0;
    for(z=0; z<10; z++){
      if(pecas_fixas[x][z]!="black"){
        cont++;
      }
    }
    if(cont==10){
      del_line(x);
    }
  }
}
function del_line(line){
  sound_break_line.play();
  for(j=line; j>0; j--){
    for(i=0; i<10; i++){
      pecas_fixas[j][i] = pecas_fixas[j-1][i];
    }
  }
  atualiza_grid_principal();
}

function end_detection(){
  var i = 0;
  for(i=0; i<10; i++){
    if(pecas_fixas[1][i]!="black"){
      return 1;
    }
  }
}
function perdeu(){
  sound_game_over.play();
  quadro.style.display = "inline"
  pausado = 1;
  startado=0;
  clearInterval(interrupcao);
}

function periodo(){
  for(i=0; i<20; i++){
    for(j=0; j<10; j++){
      if(peca_descendo[i][j]!="black"){
        if(i==19){
          para_peca = 1;
        } else if(pecas_fixas[i+1][j]!="black"){
          para_peca = 1;
        }
      }
    }
  }
  if(pausado==0){
    if(para_peca==1){
      hold_bloqueado = 0;
      slower();
      for(i=0; i<20; i++){
        for(j=0; j<10; j++){
          if(pecas_fixas[i][j]=="black"){
            pecas_fixas[i][j] = peca_descendo[i][j];
          }
        }
      }
      peca_descendo = [["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"], ["black","black","black","black","black","black","black","black","black","black"]];
      para_peca = 0;
      
      if(end_detection()!=1){
        line_detect();
        peca_atual = proxs_pcs[0];
        proxs_pcs[0]=proxs_pcs[1];
        proxs_pcs[1]=proxs_pcs[2];
        proxs_pcs[2]=random();
        atualiza_grids_direita();
        insert_pc(peca_atual);
      } else{
        perdeu();
      }
      atualiza_grid_principal();
    } else{
      for(i=19; i>0; i--){
        for(j=0; j<10; j++){
          peca_descendo[i][j] = peca_descendo[i-1][j];
        }
      }
      peca_descendo[0] = ["black","black","black","black","black","black","black","black","black","black"];
      atualiza_grid_principal();
    }
  }
  for(i=0; i<20; i++){
    for(j=0; j<10; j++){
      if(peca_descendo[i][j]!="black"){
        if(i==19){
          sound_arrived.play();
        } else if(pecas_fixas[i+1][j]!="black"){
          sound_arrived.play();
        }
      }
    }
  }
}  