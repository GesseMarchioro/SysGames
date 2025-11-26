let rTarget = Math.floor(Math.random() * 256);
let gTarget = Math.floor(Math.random() * 256);
let bTarget = Math.floor(Math.random() * 256);
document.getElementById("color-box").style.backgroundColor = `rgb(${rTarget},${gTarget},${bTarget})`;
document.getElementById("rTarget").value = rTarget;
document.getElementById("gTarget").value = gTarget;
document.getElementById("bTarget").value = bTarget;
document.getElementById("color-box-result").style.display = "none";
document.getElementById("player2").style.display = "none";




function rgbToLab(r, g, b) {
    function pivot(x) {
        return (x > 0.04045) ? Math.pow((x + 0.055) / 1.055, 2.4) : x / 12.92;
    }
    r = pivot(r / 255);
    g = pivot(g / 255);
    b = pivot(b / 255);

    let x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
    let y = (r * 0.2126729 + g * 0.7151522 + b * 0.0721750) / 1.00000;
    let z = (r * 0.0193339 + g * 0.1191920 + b * 0.9503041) / 1.08883;

    function f(t) { return (t > 0.008856) ? Math.pow(t, 1/3) : (7.787 * t) + (16/116); }

    return {
        l: (116 * f(y)) - 16,
        a: 500 * (f(x) - f(y)),
        b: 200 * (f(y) - f(z))
    };
}
        
function deltaE2000(lab1, lab2) {
    let deltaL = lab1.l - lab2.l;
    let deltaA = lab1.a - lab2.a;
    let deltaB = lab1.b - lab2.b;
    return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}
        

function gravarJ1() {
  document.getElementById("player2").style.display = "block";
  document.getElementById("player1").style.display = "none";
}
        
        
function gravarJ2() {
    let r1 = parseInt(document.getElementById("r1").value) || 0;
    let g1 = parseInt(document.getElementById("g1").value) || 0;
    let b1 = parseInt(document.getElementById("b1").value) || 0;
    let r2 = parseInt(document.getElementById("r2").value) || 0;
    let g2 = parseInt(document.getElementById("g2").value) || 0;
    let b2 = parseInt(document.getElementById("b2").value) || 0;

    let labTarget = rgbToLab(rTarget, gTarget, bTarget);
    let lab1 = rgbToLab(r1, g1, b1);
    let lab2 = rgbToLab(r2, g2, b2);

    let delta1 = deltaE2000(labTarget, lab1);
    let delta2 = deltaE2000(labTarget, lab2);

    document.getElementById("preview1").style.backgroundColor = `rgb(${r1},${g1},${b1})`;
    document.getElementById("preview2").style.backgroundColor = `rgb(${r2},${g2},${b2})`;
    document.getElementById("preview1").style.display = "inline-block";
    document.getElementById("preview2").style.display = "inline-block";

    let resultado;
    if (delta1 < delta2) {
        resultado = "Jogador 1 venceu!";
    } else if (delta2 < delta1) {
        resultado = "Jogador 2 venceu!";
    } else {
        resultado = "Empate!";
    }

    document.getElementById("resultado").innerText = resultado;

    document.getElementById("color-box-result").style.display = "block";
    document.getElementById("player1").style.display = "block";
    document.getElementById("buttonSaveP1").style.display = "none";
    document.getElementById("buttonSaveP2").style.display = "none";
}