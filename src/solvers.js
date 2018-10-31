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
window.findNRooksSolution = function(n) { //3
  var solution = [];

  //create board, to access conflict functions
  var chessboard = new Board({'n': n}); // 3 x 3

  var checker = function(row, col) { //begin of recursion func
  //place [row || col] > n (1,2) rook in board, to keep track
  //console.log('row: ',row,' col:',col);
    if (row < n) { // 0
      //posTried++; // 1
      //console.log('rows is: ', chessboard.get(row), ' row is: --> ', row)
      chessboard.togglePiece(row, col); // 0, 0//toggle piece at row,col for check
      //check for conflicts
      if (chessboard.hasAnyRooksConflicts()) { //if it finds a conflict  HERE
        //remove piece one from board array
        chessboard.togglePiece(row, col);
        checker(row, ++col);
      } else {
        checker(++row, 0);
      }
    //start recurcsion --end of recursion func
    }
  };

  checker(0,0);
  //update solution from our board
  for (var i = 0; i < n; i++) {
    var rowArr = chessboard.get(i); //232 baord.js
    solution.push(rowArr);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//SOLUTION:  There are N queens placed on an n  x n board 
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { //2
  var solutionCount = 0;
  // Method #2
  //CP Approach
  // create boards
  var constraintBoard = new Board({'n': n}); // 2 x 2
  var rooksBoard = new Board({'n': n}); // 2 x 2
  //keep track of queens on board
  var nRooks = 0;
  //iterate through rows 0-n   /n--> 2
  //position we are passing in // 0, 0
  //step A: place the rook in a non constraint position and also save the location // 0, 0
  //  toggle piece also in our rooks board // toggle position 0,0 to 1
  //  increment rook counter //++1 rook
  //step B: calculate and save constraints imposed (e.g. constraint is same row and column) [Constraints part]
  //  toggleRowCol(row,col) -> toggle entire row & entire column in our constraint board // entire and column
  //if the rook counter is the same size as n then we increment our solution counter // 1 
  //  return from recursion functiion
  //  calculate the next open position;now look at the next available spot 
  //  iterating over constraint board and finding a position that does not have a one
  //  board.get() -> row arrayr
  //    iterate throgu
  //pass in the position in our recursive function
  //repeat steps A - B; 
  //



  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// Method #1
//  create chessBoard
//  set row, col to keep track of our marker at 0, 0
//  our function will be looking at a row at a time
//  RECURSIVE FUNCTION
//  if row < n toggle piece at a position
//  check to see if there is a conflict (first time there is no conflicts)
//    true: increment col and untoggle
//    false: increment row
//  call recursive function