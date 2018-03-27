
// shortcuts

const log = console.log;

// ********* dependencies **********

	// dependdencies initializations
		const dataScreen = './input'; // to get a more graphical and complete CLI, change for => "./CLI"
		const dataSource = 'array'; // to force the ETL to use a string , change for => "string" // to be implmented

const ETL = require('./ETL');
const data = require(dataScreen);

// closures variable helper
const officeLimit = 100000;

function getCleanedPiecesNum () {

	// init current key
	setCurrentKey ();
	// toggle init piece ()
	togglePiece();
	// iterate th state moves
	ETL.state.moves.forEach(move => {
		moveRobot(move);
	})
	// display ETL.state counter;
	return Object.keys(ETL.state.toggledPiece).length;

}

//**************** helper functions****************

// toggle piece (x, y)
function togglePiece() {

	// create property x_y on toggledPiece
	ETL.state.toggledPiece[currentKey] = true;
	// increment counter
	ETL.state.counter++;

}

function moveRobot (move) {

	// set direction
	const increment = move[0] === 'N' || move[0] === 'E' ? true : 
	false;
	// set which coordinate to update
	const updatedCoordinate = move[0] === 'E' || move[0] === 'W' ? 'positX' : 'positY';
	function updateIndex (index) {

		// set new value for coordinate being updated in the current move
		ETL.state[updatedCoordinate] = increment ? ETL.state[updatedCoordinate]+1 : ETL.state[updatedCoordinate]-1
		// update currentkey
		setCurrentKey();

	}

	function goToNextPiece (remainingMoves) {

		// iterate remaningMoves time
		for ( remainingMoves; remainingMoves > 0; remainingMoves -= 1) {
			// if strictly less than limit
			if (Math.abs(ETL.state[updatedCoordinate]) < officeLimit) {
				// update coordinate
				updateIndex();
			}
			// if lower than limit
			if (Math.abs(ETL.state[updatedCoordinate]) <= officeLimit) {
				// if piece not toggled
				if ( ETL.state.toggledPiece[currentKey] !== true ) {
					// toggle piece
					togglePiece();
				}
			} 
			// if piece = limit and algo will increment a posit limit or algo will decrement a negative limit (meaning we don't want to exit if we re going up even if we reached negative limit)
			if (Math.abs(ETL.state[updatedCoordinate]) === officeLimit && (ETL.state[updatedCoordinate] > 0 && increment || ETL.state[updatedCoordinate] < 0 && !increment )) {
				// exit before incrementing position
				return;
			} else if ( Math.abs(ETL.state[updatedCoordinate]) === officeLimit ) { // else let's go backwards
				updateIndex() // by updating coordinate
			}
		}
		//exit
		return; 	
	}
	const remainingMoves = parseInt(move.slice(2),10);
	// launch goTonextPiece
	goToNextPiece(remainingMoves);
	
}

function setCurrentKey () {

	currentKey = ETL.state.positX.toString() + ETL.state.positY.toString();

}


//********************* exports ***********************
module.exports.getCleanedPiecesNum = getCleanedPiecesNum ;


// refactoring ideas :
 // factor out : Math.abs(state[updatedCoordinate])