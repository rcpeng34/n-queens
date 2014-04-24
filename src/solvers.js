/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // var solution = null; //fixme

  // // 1. build all possible boards into an array
  // // 2. check all




  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// ------------------------------------------------- SUPER IMPORTANT SLEEPY NOTES -----------------------------------------
// columns, how to prevent findcombination loop from making boards that have queens in the same column
// store an array = to prev but % each value in prev by n ie newarray[i] = prev[i]%n
// each time you push start further, check if start%n matches anythign in the new array
// diagonals, turn array 45 degrees and pretend it's an array
// diagonals array will have length 2*n
// for major diagonals, using row-col will give you -n+1 to n-1
// for minor diagnoals, think about it later
// find coordinate function, you row and column of a number between 0 and n*n can be mathed to be:
//    row: math.floor(number/n), col = number%n

window.findCombinations = function(callback, n, k, prev){
  if(k === undefined){
    k = n;
  }
  if(k === 0){
    callback(n,prev);
  } else{
    var start = prev ? prev[prev.length-1] + n - prev[prev.length - 1] % n: 0;
    for(var i = start; i < n*n; i++){

      if(!start){
        prev = [i];
      } else{
        prev.push(i);
      }
      findCombinations(callback,n,k-1,prev);
      prev.splice(-1);
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
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
    if(!allBoards[i].hasAnyRooksConflicts()) { // no conflicts
      solutionCount++;
    }
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
