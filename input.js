
// shortcuts

const log = console.log;
const stdin = process.stdin;

// ********* dependencies **********

const helper = require('./sharedHelpers');
const ETL = require('./ETL');
const robot = require('./robot');

// initialization

let stateInput = [];
let stateInputStr= '';

stdin.setEncoding("utf-8");
stdin.resume();

// processing input


stdin.on("data", function (input) {

		if (input.trim() === ':wq') {
			ETL.trigger(stateInput,robot.getCleanedPiecesNum)
			process.exit();
		}
		if (input.trim() === ':q!') {
			process.exit();
		}
		if (input.trim() === ':q') {	
			if (stateInput.length === 0) {
				process.exit();
			} else {
				console.log(`please either save state and quit => :wq 
				or dismiss state and quit => :q!
				`)
			}
		} 

		// accumulate input in a string , keep linefeed so that ETL can parse it w/ a regExp or other text manipultation mehods
		input = helper.clearInput(input,true);
		stateInputStr += input;

		// accumulate input in an array , do not keep linefeed so that ETL can parse it with same methods it parses in the CLI
		input = helper.clearInput(input);
		stateInput.push(input);
		
});	

// ******************* exports *********************

module.exports.stateInput = stateInput;
module.exports.stateInputStr = stateInputStr;


