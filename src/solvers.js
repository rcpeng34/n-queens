/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/












window.findCombinations = function(callback,n, piecesLeft, prev, occupiedColumns, occupiedMajors, occupiedMinors){
  if(piecesLeft === 0){
    // callback(n,prev);
    window.solutions++;
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
  // if(occupiedMajors === undefined){
  //   occupiedMajors = {};
  // }
  // if(occupiedMinors === undefined){
  //   occupiedMinors = {};
  // }

  //set next to start at row following last piece addition
  if(next%n > prev[prev.length-1]%n){
    next += n - next%n;
  }
// var conflictCount = 0;
  //stops looping if no piece is placed in a row
  for(var i = 0; i < n; i++){ // don't need i%n as we're starting i at 0 and incrementing to n-1, why i+1<n?
    // var majorIndex = i - Math.floor((next+i)/n);
    // var minorIndex = i + Math.floor((next+i)/n);
    if(!(i in occupiedColumns) /*&& !(majorIndex in occupiedMajors) && !(minorIndex in occupiedMinors)*/){
      next += i;
      prev.push(i);
      occupiedColumns[i] = true;
      // occupiedMajors[majorIndex] = true;
      // occupiedMinors[minorIndex] = true;
      //only recurses once
      window.findCombinations(callback,n,piecesLeft - 1, prev, occupiedColumns, occupiedMajors, occupiedMinors);
      //reverses latest changes to prev, occupiedColumns, and next as to not affect next iteration
      prev.splice(-1);
      delete occupiedColumns[i];
      next -= i;
    }
    // else {
    //   conflictCount++;
    // }
  }
  // if (conflictCount === n) {
  //   console.log("conflictCount = n", n, conflictCount);
  //   return;
  // }

};















window.makeGame = function (n, coordinateArray) {
  var game = new Board({'n': n});
  for (var coordinate = 0; coordinate < coordinateArray.length; coordinate++) {
    var row = coordinateArray[coordinate][0];
    var column = coordinateArray[coordinate][1];
    game.setPiece(row,column);
  }
  return game;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var allBoards = [];
  // build the map
  var coordinateMap = {};
  var mapId = 0;
  for (var row = 0; row < n; row++) {
    for (var column = 0; column < n; column ++) {
      coordinateMap[mapId++] = [row, column];
    }
  }

  // find all nCk location combinations

  var callback = function(n, coordinatesArray){
    var coordinates = [];
    for(var i = 0; i < coordinatesArray.length; i++){
      coordinates.push(coordinateMap[coordinatesArray[i]]);
    }
    var game = window.makeGame(n, coordinates);
    allBoards.push(game);
  };

   window.findCombinations(callback,n);

  // loop over all boards and check for solutions
  for (var i = 0; i < allBoards.length; i++) {
    if(!allBoards[i].hasAnyQueensConflicts()) { // no conflicts
      solutionCount++;
    }
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
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
      prev.push(i);
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
