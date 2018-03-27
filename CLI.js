
// shortcuts

const log = console.log;

// ************* dependencies *************

const helper = require('./sharedHelpers');
const ETL = require('./ETL');
const robot = require('./robot');


// ************ CLI Creation ***************
const tty = require('tty');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'robot > '
});


// ********** init values **********************
const help =  `
run : run the robot algorithm

status : display the input state as stored

hstatus : display the input state with contextual title

clear : clear the input state and let you

exit : exit the robot CLI

undo : erase last non --robot-- instruction, after usage double check using robot status or robot hstatus

help : display description for each --robot-- command
`;

const context = "[ type 'robot run' to start algorithm or 'robot help' for further instructions ]"

let CLIstate = [];

let stateLevel=0;

const stateText = ["number of commands","starting coordinates","unitary cardinal command"];

stateLessText = '\n nothing in the state so far';

let insert = false;

// ************* init actions *****************
robotPrompt();


// ************* CLI PROCESSING **************************

rl.on('line', (line) => {

  line = helper.clearInput(line);

  if (line === 'robot run') {
    ETL.trigger(CLIstate,robot.getCleanedPiecesNum);
    robotPrompt()
  } else if (line === 'robot status') {
    console.log(rl.displayStatus()+'\n');
    robotPrompt();
  } else if (line === 'robot hstatus') {
    if (CLIstate.length === 0) {
      console.log(stateLessText);
    } else {
      console.log('\n');
      CLIstate.forEach((userEntry,i)=> {
        i < 2 ? console.log(stateText[i]+' : '+userEntry) : console.log(stateText[2]+' : '+userEntry)
      }) 
    }
    robotPrompt();
  } else if (line === 'robot clear') {
    readline.clearScreenDown(rl);
    console.log("\033[2J\033[0f")
    readline.cursorTo(process.stdin, 0, 0)
    CLIstate = [];
    stateLevel = 0;
    robotPrompt();
  } else if (line === 'robot help') {
    console.log(help)
    robotPrompt()
  } else if (line === 'robot exit') {
    process.exit(0);
  } else if (line === 'robot undo') {
    const erased = CLIstate.pop();
    console.log('\n just erased :',erased);
    robotPrompt('down');
  } else if (line.slice(0,5) !== 'robot') {
    CLIstate.push(line);
    robotPrompt(true);
  } else {

    console.log(`
      No command ${line} found,

      Usage: robot <command>

      where <command> is one of:

      run, status, hstatus, clear, exit, undo`

    );
    robotPrompt();
  }
}).on('close', () => {
  process.exit(0);
});


// ************** local helpers ****************

function robotPrompt (moveLevel) {
  
  if (moveLevel === true) {
    stateLevel += 1;
  } else if ( moveLevel === 'down') {
    stateLevel -= 1;
  }
  const promptText = stateLevel < 2 ? stateText[stateLevel] : stateText[2];
  console.log(' \n **** type '+ promptText +'\n'+ context + ' \n');
  
  rl.prompt();

}

rl.displayStatus = function () {

  return CLIstate.length > 0 ? CLIstate : stateLessText ;
  
}

