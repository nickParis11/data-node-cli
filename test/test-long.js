
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