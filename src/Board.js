// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {
  var cbpCount = 0;
  window.Board = Backbone.Model.extend({
    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      // console.log(' this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex) --> ', this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex));
      // console.log(' rowIndex AND colIndex: --> ', rowIndex, ' ', colIndex, ' RESULT is colIndex - rowIndex')
      //console.log(' this._getFirstRowColumnIndexForMinoDiagonalOn(rowIndex, colIndex) --> ', this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex));
      //console.log(' rowIndex AND colIndex: --> ', rowIndex, ' ', colIndex, ' RESULT is colIndex + rowIndex');
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))

      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      //console.log(row);
      //iterate over the array(row)
      var count = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
        }
      }
      if (count > 1) { return true; }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var matrixLength = this.get('n');
      //iterate through each row
      for (var i = 0; i < matrixLength; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      //determine if more then one exists in each row
      //if more than 1 exists -->return true
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var boardLength = this.get('n');
      //iiterate over column by
      var count = 0;
      for (var rowIndex = 0; rowIndex < boardLength; rowIndex++) {
        var row = this.get(rowIndex);
        if (row[colIndex] === 1) {
          count++;
        }
      }
      if (count > 1) { return true; }
      return false; //
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardLength = this.get('n');
      //
      for (var column = 0; column < boardLength; column++) {
        if (this.hasColConflictAt(column)) { return true; }
      }

      return false; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // VALUE AT INDEX MAP BELOW
    // [0,   1,   0,  0]
    // [0,   0,   0,  1]
    // [1,   0,   0,  0]
    // [0,   0,   1,  0]
    // INDEX MAP BELOW
    //[ 0,   1,   2,  3]
    //[-1,   0,   1,  2]
    //[-2,  -1,   0,  1]
    //[-3,  -2,  -1,  0]

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) { //1
      var boardLength = this.get('n'); //4
      // console.log('this.get(\'n\') is ', this.get('n'));
      // var i = majorDiagonalColumnIndexAtFirstRow;
      var row = 0; //row needs to be rowIndex
      var count = 0;
      // console.log(' RESULT is used as FOR LOOP length --> ', majorDiagonalColumnIndexAtFirstRow)
      var mDCIAFRLength = majorDiagonalColumnIndexAtFirstRow;
      //check mDCIAFRLength < 0
      var col;
      if (mDCIAFRLength < 0) {
        //update row -> abs(mDCIAFRLength);
        row = Math.abs(mDCIAFRLength);
        col = 0; //handles negative
      } else {
        col = mDCIAFRLength; //assign when pos
      }
      for (; col < boardLength; col++) { //iterate over column
        // console.log('col: ', col);
        var rows = this.get(row); // rows is an array of row
        //  console.log('rows is: ', rows, ' row is: --> ', row)
        //console.log(rows, i)
        // set a conditional to stop at 14
        if ( rows[col] === 1) { //check specific index i
          count++;
        }
        row++;//move to next row
        //if row < boardLength
        if (row === boardLength) { break; }
        //break
      }
      if (count > 1) { return true; }
      return false; // fixme
    },
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardLength = this.get('n');
      var column = (boardLength - 1) * -1;
      for (; column < boardLength; column++) {
        if (this.hasMajorDiagonalConflictAt(column)) { return true; }
      }

      return false;
    },


    // INDEX MAP BELOW
    //[0,  1,  2,  3,  4]
    //[1,  2,  3,  4,  5]
    //[2,  3,  4,  5,  6]
    //[3,  4,  5,  6,  7]
    //[4,  5,  6,  7,  8]
    //colIndex + rowIndex
    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) { //3
      //iterate row form last item to first item
      // console.log('this.get(\'n\') is ', this.get('n'));
      var boardLength = this.get('n');
      var row = 0;
      var count = 0;//keeps track of our rooks and queens
      var mDCIAFRLength = minorDiagonalColumnIndexAtFirstRow;
      var col;

      // console.log(' RESULT is used as FOR LOOP length --> ', minorDiagonalColumnIndexAtFirstRow);
      if (mDCIAFRLength > (boardLength - 1)) {
        row = mDCIAFRLength - (boardLength - 1);
        col = boardLength - 1;
      } else {
        col = mDCIAFRLength;//4
      }
      //we start at the end of row, and llast column
      for ( ;col >= 0; col--) {
        var rowArr = this.get(row);
        // console.log('rows is: ', rowArr, ' row is: --> ', row);
        // console.log(rowArr, col);
        if (rowArr[col] === 1) { count++; } //check index
        row++;//increment row
        //check if row exceeded the board length
        if (row === boardLength) { break; }
      }

      if (count > 1) { return true; }
      return false; // fixme
    },
    //[0,  1,  2,  3,  4]     [0,  1,  2]
    //[1,  2,  3,  4,  5]     [1,  2,  3]
    //[2,  3,  4,  5,  6]     [2,  3,  4]
    //[3,  4,  5,  6,  7]
    //[4,  5,  6,  7,  8]
    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // we have to iterate through all rows and columns
      // iterate from index 0 to  (boardLength -1)*2
      var lastIndex = (this.get('n') - 1) * 2;
      for (var col = 0; col <= lastIndex; col++) {
        if (this.hasMinorDiagonalConflictAt(col)) { return true; }
      }
      // call hasAnyMinorDiagonalConflictsAt for each item in loop
      return false;
    }
    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
