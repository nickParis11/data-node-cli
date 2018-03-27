
// shortcuts

const log = console.log;

// ********* dependencies **********

const robot = require('./robot');  // optional

// state holder

let state = new State();

function State () {

	this.moves = []; 
	this.toggledPiece = {};
	this.currentKey='';
	this.Nummoves;
	this.positX;
	this.positY;
	
}

// for the sake of brevity EXTRACT TRANSFORM AND LOAD OPERATION will all happen in one step and with in memory data

function trigger (data,computeResult) {

	// clean any previous state in the ETL
	state.toggledPiece = {};
	state.moves= [];
	// if string
	if (typeof data === 'string') {
		// split string into an array
		data = data.split('\n');
	}
	// if array
		// put first entry in according const
		state.numMoves = data[0];
		// split second entry
		const secondEntry = data[1].split(' ');
			// convert second entry_firstHalf into a number and put it in according const
			state.positX = parseInt(secondEntry[0],10);
			// convert second entry_secondHalf into a number and put it in according const
			state.positY = parseInt(secondEntry[1],10);
		// for every remaining item
		for (var i = 2; i < data.length; i++) {
			// push it into according arr
			state.moves.push(data[i]);
		}
		const count = computeResult()
		const result = '=> cleaned: '+count+'\n';
		// launch robot algorithm
		displayResult(result);
		return result;

}

function displayResult (result) {

	process.stdout.write(result)

} 


//************** exports ************************

module.exports.trigger = trigger;
module.exports.state = state;