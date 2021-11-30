var moves = [];
var selectedOp = 0;
var selectedNum = -1;
var index = 0;
function generatePuzzle() {
  resetSelect();
  index = 0;
  document.getElementById("grid").style.display = "grid";
  document.getElementById("operations").style.display = "grid";
  document.getElementById("undoredo").style.display = "grid";
  moves = [[Math.floor(Math.random() * 13) + 1, 1, Math.floor(Math.random() * 13) + 1, 1, Math.floor(Math.random() * 13) + 1, 1, Math.floor(Math.random() * 13) + 1, 1]];
  updateGrid();
}

function resetSelect() {
  if (document.getElementById(selectedOp.toString())) {
    document.getElementById(selectedOp.toString()).classList.remove("select");
  }
  if (document.getElementById(String.fromCharCode(97 + selectedNum))) {
    document.getElementById(String.fromCharCode(97 + selectedNum)).classList.remove("gridSelect");
  }
  selectedNum = -1;
  selectedOp = 0;
}
function advance(num) {
  if (index + num < moves.length && index + num >= 0) {
    index = index + num;
  }
  updateGrid();
  resetSelect();
}

function updateUndoRedo() {
  if (index > 0) {
    document.getElementById("undo").classList.add("select");
  }
  else {
    document.getElementById("undo").classList.remove("select");
  }
  if (index < moves.length - 1) {
    document.getElementById("redo").classList.add("select");
  }
  else {
    document.getElementById("redo").classList.remove("select");
  }
}
function getDisplay(num, denom) {
  if (num == 0) {
    return 0;
  }
  else if (gcd(Math.abs(num), Math.abs(denom)) == denom) {
    return (num / denom).toString();
  }
  else {
    return (num / gcd(Math.abs(num), Math.abs(denom))).toString() + "/" + (denom / gcd(Math.abs(num), Math.abs(denom))).toString();
  }
}

function updateGrid() {
  for (var i = 0; i < 4; i++) {
    if (moves[index][2 * i] != 'x') {
      document.getElementById(String.fromCharCode(97 + i)).style.visibility = "visible";
      document.getElementById(String.fromCharCode(97 + i)).innerHTML = getDisplay(moves[index][2 * i], moves[index][2 * i + 1]);
      textFit(document.getElementById(String.fromCharCode(97 + i)), { maxFontSize: 40 });
    }
    else {
      document.getElementById(String.fromCharCode(97 + i)).style.visibility = "hidden";
    }
  }
  updateUndoRedo();
}

function select(gridNum) {
  if (gridNum != selectedNum) {
    if (document.getElementById(String.fromCharCode(97 + selectedNum))) {
      document.getElementById(String.fromCharCode(97 + selectedNum)).classList.remove("gridSelect");
    }
    oldNum = selectedNum;
    selectedNum = gridNum;
    document.getElementById(String.fromCharCode(97 + selectedNum)).classList.add("gridSelect");
    newMove = [];
    if (oldNum > -1 && selectedOp > 0) {
      for (var i = 0; i < 4; i++) {
        if (i == oldNum) {
          newMove.push("x");
          newMove.push(1);
        }
        else if (i == selectedNum) {
          if (selectedOp == 1) {
            newMove.push(moves[index][2 * oldNum] * moves[index][2 * selectedNum + 1] + moves[index][2 * selectedNum] * moves[index][2 * oldNum + 1]);
            newMove.push(moves[index][2 * oldNum + 1] * moves[index][2 * selectedNum + 1])
          }
          else if (selectedOp == 2) {
            newMove.push(moves[index][2 * oldNum] * moves[index][2 * selectedNum + 1] - moves[index][2 * selectedNum] * moves[index][2 * oldNum + 1]);
            newMove.push(moves[index][2 * oldNum + 1] * moves[index][2 * selectedNum + 1])
          }
          else if (selectedOp == 3) {
            newMove.push(moves[index][2 * oldNum] * moves[index][2 * selectedNum]);
            newMove.push(moves[index][2 * oldNum + 1] * moves[index][2 * selectedNum + 1]);
          }
          else {
            newMove.push(moves[index][2 * oldNum] * moves[index][2 * selectedNum + 1]);
            newMove.push(moves[index][2 * oldNum + 1] * moves[index][2 * selectedNum]);
          }
        }
        else {
          newMove.push(moves[index][2 * i]);
          newMove.push(moves[index][2 * i + 1]);
        }
      }
      if (index < moves.length - 1) {
        moves = moves.slice(0, index + 1);
      }
      moves.push(newMove);
      document.getElementById(selectedOp.toString()).classList.remove("select");
      selectedOp = 0;
      index++;
      updateGrid();
    }
  }
}

function op(operation) {
  if (selectedNum > -1) {
    if (document.getElementById(selectedOp.toString())) {
      document.getElementById(selectedOp.toString()).classList.remove("select");
    }
    selectedOp = operation;
    document.getElementById(selectedOp.toString()).classList.add("select");
  }
}