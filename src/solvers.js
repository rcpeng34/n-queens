/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = 0;
  solutions = window.findQueensCombinations(solutions,n);
  console.log('Number of solutions for ' + n + ' queens:', solutions);
  return solutions;
};

window.findQueensCombinations = function(solutions, n, piecesLeft, prev, occupiedColumns, occupiedMajors, occupiedMinors){
  if(piecesLeft === 0 || n === 0){
    solutions ++;
  } else if(piecesLeft === undefined){
    piecesLeft = n;
  }
  if(prev === undefined){
    var next = 0;
    prev = [];
  } else{
    var next = prev[prev.length - 1] + 1;
  }
  if(occupiedColumns === undefined){
    occupiedColumns = {};
  }
  if(occupiedMajors === undefined){
    occupiedMajors = {};
  }
  if(occupiedMinors === undefined){
    occupiedMinors = {};
  }

  //set next to start at row following last piece addition
  if(next%n > prev[prev.length-1]%n){
    next += n - next%n;
  }

  //stops looping if no piece is placed in a row
  for(var i = 0; i < n; i++){
    var majorIndex = i - next/n; //next is still at the start of the row, /n gives row number
    var minorIndex = i + next/n;
    if(!(i in occupiedColumns) && !(majorIndex in occupiedMajors) && !(minorIndex in occupiedMinors)){
      next += i;
      prev.push(next);
      occupiedColumns[i] = true;
      occupiedMajors[majorIndex] = true;
      occupiedMinors[minorIndex] = true;
      solutions = window.findQueensCombinations(solutions,n,piecesLeft - 1, prev, occupiedColumns, occupiedMajors, occupiedMinors);
      //reverses latest changes to prev, occupiedColumns, and next as to not affect next iteration
      prev.splice(-1);
      delete occupiedColumns[i];
      delete occupiedMajors[majorIndex];
      delete occupiedMinors[minorIndex];
      next -= i;
    }
  }
  return solutions;
};







// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = 0;
  solutions = window.findRooksCombinations(solutions,n);
  return solutions;
};

window.findRooksCombinations = function(solutions, n, piecesLeft, prev, occupiedColumns){
  if(piecesLeft === 0){
    solutions++;
  } else if(piecesLeft === undefined){
    piecesLeft = n;
  }
  if(prev === undefined){
    var next = 0;
    prev = [];
  } else{
    var next = prev[prev.length - 1] + 1;
  }
  if(occupiedColumns === undefined){
    occupiedColumns = {};
  }

  //set next to start at row following last piece addition
  if(next%n > prev[prev.length-1]%n){
    next += n - next%n;
  }

  //stops looping if no piece is placed in a row
  for(var i = 0; i < n; i++){
    if(!(i in occupiedColumns)){
      next += i;
      prev.push(next);
      occupiedColumns[i] = true;
      solutions = window.findRooksCombinations(solutions, n,piecesLeft - 1, prev, occupiedColumns);
      //reverses latest changes to prev, occupiedColumns, and next as to not affect next iteration
      prev.splice(-1);
      delete occupiedColumns[i];
      next -= i;
    }
  }
  return solutions;
};
