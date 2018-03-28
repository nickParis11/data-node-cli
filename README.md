# INFORMATIONS

## How To Get Started

0. We assume that you already have node and npm installed

1. Run 'npm install' from the terminal in the root directory of the forked/cloned repo

2. Run 'npm start' from the terminal to open a prompt for advanced users ( no error message / no help command / no undo command )

3. Once you are finished inputing, then type your favorite vim commands :

   => ':wq' to save and output result

   => ':q' to exit

   => ':q!' to exit without saving

4. to use the more graphical CLI, run 'npm run start-cli'. Once in the CLI :

	 => type your different input step by step following the prompted instructions

	 => run 'robot run' to display the result 

	 => run 'robot help' to display informations about all commands

	 => run 'robot exit' to exit CLI

5. to run the tests, simply type 'npm test' in your terminal. 
	 Please note that it will run the full suite of tests, including very long to execute ones ( which simulates 10.000 moves of up to 100.000 each) 

	 => to run only the lightweight tests, run 'npm run test-fast'
	 => to run only the heavyweight tests, run 'npm run test-long'
