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

  checker(0, 0);
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
window.countNRooksSolutions = function(n) { //1
  var solutionCount = 0;
  // Method #2
  //CP Approach
  // create boards
  //var rooksBoard = new Board({'n': n});  
  //keep track of queens on board
  // var constraintBoard = new Board({'n': n}); 

  
  // var rowIndex = 0;

  var recurse = function (row, col) {
    // a value that has the position first used in a single solution
    // step A: place the rook in a non constraint position and also save the location
    //  toggle piece also in our rooks board // toggle position 0,0 to 1
    rooksBoard.togglePiece(row, col);
    // console.log("row=",row," col=",col);
    // console.log('value of rooksBoard.get(row) in recurse: ',rooksBoard.get(row));  
    //  increment rook counter //++2 rook
    nRooks++;
    // step B: calculate and save constraints imposed (e.g. constraint is same row and column) [Constraints part]
    // if the rook counter is the same size as n then we increment our solution counter 
    if (nRooks === n) {
      solutionCount++;
      return;
    }
    //untoggle pos
    //  return first position
    // iterate through the row and compare each index to see if there is a conflict and if we reach 
    //   the end of the row without placing a rook, a conflict exists for all positions in row, that
    //   means our previously placed rook is not a valid position
    //   --> conflict is defined as using method/function hasColumnConflictAt:
    var nextRow = rooksBoard.get(++row);

    for (var colPosition = 0; colPosition < nextRow.length; colPosition++) {
      rooksBoard.togglePiece(row, colPosition); //toggle on
      if (!rooksBoard.hasColConflictAt(colPosition)) { //false- no conflicts
        rooksBoard.togglePiece(row, colPosition);//toggle off before recurs
        recurse(row, colPosition); //row - 1 , validPos -  1  <-----
        nRooks--;
      } 
      rooksBoard.togglePiece(row, colPosition);//toggle off
    }
    // pass in the position in our recursive function   
    // repeat steps A - B; 
    // if (validPos !== -1) {
    //   recurse(row, validPos);
    //   //
    //}
    return;
  };

  //0 [1, 0, 0]
  //1 [0, 0, 1] 
  //2 [0, 1, 0]

  //iterate through col 0-n   /n--> 2
  for (var col = 0; col < n; col++) { //col - 1
    var rooksBoard = new Board({ 'n': n });
    var nRooks = 0;
    //we want a fresh new board with our first location, create one
    //declare var first position
    //var firstPosition;
    // console.log("col: --> ", col)
    recurse(0, col);//<--- (0 , 1)
    // position we are passing in(row,col)
    //implement backtrack
    //  look at constraint board
    //untoggle cur
    //  and change the previous location
  }

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