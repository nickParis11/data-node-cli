
// shortcuts

const log = console.log;

// ********* dependencies **********

const assert = require('assert');
const { expect } = require("chai");
var stdout = require("test-console").stdout;

var robot = robot = require('./../robot');
var ETL = ETL = require('./../ETL');


log('testing ....')
log('\n\n****  please wait, it may take a while to compute all possibilities  ****')

// ************ processing tests *******************

describe('Standard out testing', function() {
  it("Should check if testing library works", () => {

  	var output = stdout.inspectSync(function() {
  	    console.log("foo");
  	});
  	
    expect(output).to.deep.equal([ 'foo\n' ])
  });

  it("Should check if testing library works with stdout write ", () => {

  	var output = stdout.inspectSync(function() {
  	    process.stdout.write('hey')
  	});
  	
    expect(output).to.deep.equal([ 'hey' ])
  });


});

describe('Robot algorithm - one direction only', function() {

  it("Should correctly count with only 2 moves north", () => {

    var output = stdout.inspectSync(function() {
        ETL.trigger( [ '1', '0 0', 'N 2' ],robot.getCleanedPiecesNum)
    });
    
    expect(output).to.deep.equal([ '=> cleaned: 3\n' ])
  });

  it("Should correctly count with 3 moves north w/o console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '1', '0 0', 'N 3' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 4\n'])
  });

  it("Should correctly count with 1000 moves north w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

    	ETL.trigger( [ '1', '0 0', 'N 1000' ],robot.getCleanedPiecesNum);

    });

    expect(output).to.deep.equal([ '=> cleaned: 1001\n' ])
   
  });

  it("Should correctly count with 4000 moves west w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {
  		ETL.trigger( [ '1', '0 95000', 'W 4000' ],robot.getCleanedPiecesNum);
  	});
	
    expect(output).to.deep.equal([ '=> cleaned: 4001\n' ])

  });

   it("Should correctly count with 5000 moves west out of board w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {
  		ETL.trigger( [ '1', '-95000 95000', 'W 6000' ],robot.getCleanedPiecesNum)
  	});
	
    expect(output).to.deep.equal([ '=> cleaned: 5001\n' ])
  });

  it("Should correctly count with 1 move south w/ console testing  ", () => {

  	var output = stdout.inspectSync(function() {
  	    ETL.trigger( [ '1', '0 0', 'S 1' ],robot.getCleanedPiecesNum)
  	});
  	
    expect(output).to.deep.equal([ '=> cleaned: 2\n' ])
  });

  it("Should correctly count with 1 move east w/ console testing  ", () => {

  	var output = stdout.inspectSync(function() {
  	    ETL.trigger( [ '1', '0 0', 'E 1' ],robot.getCleanedPiecesNum)
  	});
  	
    expect(output).to.deep.equal([ '=> cleaned: 2\n' ])
  });

  it("Should correctly count with 5000 move south w/ console testing  ", () => {

  	var output = stdout.inspectSync(function() {
  	    ETL.trigger( [ '1', '0 0', 'S 5000' ],robot.getCleanedPiecesNum)
  	});
  	
    expect(output).to.deep.equal([ '=> cleaned: 5001\n' ])
  });

  it("Should correctly count with 5000 move east w/ console testing  ", () => {

  	var output = stdout.inspectSync(function() {
  	    ETL.trigger( [ '1', '0 0', 'E 5000' ],robot.getCleanedPiecesNum)
  	});
  	
    expect(output).to.deep.equal([ '=> cleaned: 5001\n' ])
  });


  it("Should correctly count with 5000 moves south w/ console testing that goes out of the board ", () => {

  	var output = stdout.inspectSync(function() {
  	    ETL.trigger( [ '1', '0 -97000', 'S 5000' ],robot.getCleanedPiecesNum)
  	});
  	
    expect(output).to.deep.equal([ '=> cleaned: 3001\n' ])
  });

  it("Should correctly count with 5000 moves east w/ console testing that goes out of the board ", () => {

  	var output = stdout.inspectSync(function() {
  	    ETL.trigger( [ '1', '97000 0', 'E 5000' ],robot.getCleanedPiecesNum)
  	});
  	
    expect(output).to.deep.equal([ '=> cleaned: 3001\n' ])
  });



});

// goes backward

describe('Robot algorithm - one direction then goes back', function() {
// for each cardinal point

	// go back but no added piece
	

  it("Should correctly count with 1 moves north & 1 'lower or equal' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 0', 'N 3', 'S 3' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 4\n'])
  });

  it("Should correctly count with 1 moves south & 1 'lower or equal' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 0', 'S 3', 'N 2' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 4\n'])
  });

  it("Should correctly count with 1 moves west & 1 'lower or equal' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 0', 'W 3', 'E 3' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 4\n'])
  });

  it("Should correctly count with 1 moves east & 1 'lower or equal' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 0', 'E 3', 'W 2' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 4\n'])
  });

  // go back w/ added piece

  it("Should correctly count with 1 moves north & 1 'greater' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 0', 'N 3', 'S 4' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 5\n'])
  });

  it("Should correctly count with 1 moves south & 1 'greater' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 0', 'S 3', 'N 5' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 6\n'])
  });

  it("Should correctly count with 1 moves west & 1 'greater' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 0', 'W 3', 'E 6' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 7\n'])
  });

  it("Should correctly count with 1 moves east & 1 'greater' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 0', 'E 3', 'W 4' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 5\n'])
  });

  // go off the board then back but no added piece

  it("Should correctly count with 1 moves north off board & 1 'lower or equal' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 99995', 'N 10', 'S 4' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 6\n'])
  });

  it("Should correctly count with 1 moves south off board & 1 'lower or equal' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 -99995', 'S 10', 'N 4' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 6\n'])
  });

  it("Should correctly count with 1 move west off board & 1 'lower or equal' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '-99995 0', 'W 10', 'E 4' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 6\n'])
  });

  it("Should correctly count with 1 move east off board & 1 'lower or equal' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '99995 0', 'E 10', 'W 4' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 6\n'])
  });
  // go off the board then back w/ added piece

  it("Should correctly count with 1 moves north off board & 1 'greater' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 99995', 'N 10', 'S 10' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 11\n'])
  });

  it("Should correctly count with 1 moves south off board & 1 'greater' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '0 -99995', 'S 10', 'N 10' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 11\n'])
  });

  it("Should correctly count with 1 move west off board & 1 'greater' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '-99995 0', 'W 10', 'E 10' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 11\n'])
  });

  it("Should correctly count with 1 move east off board & 1 'greater' move back w/ console testing ", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '2', '99995 0', 'E 10', 'W 10' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 11\n'])
  });

});

// misc of my own

describe('Robot algorithm - mixed and miscellaneous moves', function() {
// for each cardinal point

	// go back but no added piece
	

  it("Should correctly count mixed off board and backwards moves w/ console testing in upper right corner", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '5', '99995 99995', 'N 10', 'S 5', 'E 10', 'W 7', 'N 8' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 18\n'])
  });

  it("Should correctly count mixed off board and backwards moves w/ console testing in lower left corner", () => {

  	var output = stdout.inspectSync(function() {

  		ETL.trigger( [ '5', '-99995 -99995', 'S 10', 'N 5', 'W 10', 'E 7', 'S 8' ],robot.getCleanedPiecesNum)

  	});

    expect(output).to.deep.equal(['=> cleaned: 18\n'])
  });

});


describe('Robot algorithm - no or fake moves', function() {

  it("Should correctly count with no moves", () => {

    var output = stdout.inspectSync(function() {
        ETL.trigger( [ '1', '0 0'],robot.getCleanedPiecesNum)
    });
    
    expect(output).to.deep.equal([ '=> cleaned: 1\n' ])
  });

  it("Should correctly count with no moves", () => {

    var output = stdout.inspectSync(function() {
        ETL.trigger( [ '1', '0 0', 'N0'],robot.getCleanedPiecesNum)
    });
    
    expect(output).to.deep.equal([ '=> cleaned: 1\n' ])
  });

  it("Should correctly count with no moves", () => {

    var output = stdout.inspectSync(function() {
        ETL.trigger( [ '1', '0 0', '0'],robot.getCleanedPiecesNum)
    });
    
    expect(output).to.deep.equal([ '=> cleaned: 1\n' ])
  });

  it("Should correctly count with no moves", () => {

    var output = stdout.inspectSync(function() {
        ETL.trigger( [ '1', '0 0', '',''],robot.getCleanedPiecesNum)
    });
    
    expect(output).to.deep.equal([ '=> cleaned: 1\n' ])
  });

});

describe('Robot algorithm - 10 000 moves', function() {

 const letters = ['N','S','E','W'];

 const moves = [];

 const length = 10000;

 function getMoveNum () {
   return Math.floor((Math.random()*200001)-100000);
 }

 for ( var i = length; i > 0; i -= 1) {
  const index = Math.floor(Math.random()*letters.length);
  const num = getMoveNum();
  const move = letters[index]+ ' ' + num.toString();
  moves.push(move);
 }

 var output =  stdout.inspectSync(function() {
   ETL.trigger( moves,robot.getCleanedPiecesNum)
 });

  it("Should correctly count a lot of moves", () => {
    expect(output).to.not.be.undefined;
 });

});
