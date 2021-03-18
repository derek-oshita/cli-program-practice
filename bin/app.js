#!/usr/bin/env node

// tutorial: https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs

// REQUIRE MODULES --------------------------------------------------------------------------------------------------------------------
const chalk = require('chalk'); 
const boxen = require('boxen'); 
const yargs = require('yargs'); 

// DATE VARIABLES ---------------------------------------------------------------------------------------------------------------------
const today = new Date(); 

// padStart will add the 0's until we reach the length passed as first argument... 
const dd = String(today.getDate()).padStart(2, '0'); 
// months in timestamps are zero-based, so we add 1 to get the correct number value of today's month. 
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
// get full year
const yy = today.getFullYear();

const todaysDate = `${mm}/${dd}/${yy}`
const todaysTime = today.toLocaleTimeString(); 


// CLI STYLING ------------------------------------------------------------------------------------------------------------------------
// https://www.npmjs.com/package/boxen/v/4.0.0
const greetingOptions = {
    padding: 1, 
    margin: 1, 
    borderStyle: 'round', 
    borderColor: 'green', 
    backgroundColor: '#555555'
}; 

const dateGreeting = chalk.white.bold(todaysDate); 
const timeGreeting = chalk.white.bold(todaysTime)
const greeting = chalk.white.bold('Welcome to Off The Grid!'); 
const msgBox = boxen(greeting, greetingOptions); 

// CLI YARGS (ARGUMENTS) --------------------------------------------------------------------------------------------------------------
const options = yargs   
    .usage('Usage: -n <name>')
    .option('n', {alias: 'name', describe: 'Your name', type: 'string', demandOption: false})
    .argv; 

const yargGreeting = `Hello, ${options.name}`



// OUTPUT
console.log(msgBox); 
console.log(`------ Today's Date: ${dateGreeting} at ${timeGreeting} ------`)
// to get this to work, you run nodemon/node . -n someName otherwise it will return undefined
// console.log(yargGreeting); 
