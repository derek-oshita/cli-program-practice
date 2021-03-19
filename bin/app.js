#!/usr/bin/env node

// tutorial: https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs

// REQUIRE MODULES --------------------------------------------------------------------------------------------------------------------
const chalk = require('chalk'); 
const boxen = require('boxen'); 
const yargs = require('yargs'); 
const axios = require('axios'); 

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

// AXIOS FOR API ENDPOINT --------------------------------------------------------------------------------------------------------------
// https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/
// https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b
// https://www.youtube.com/watch?v=i4ftNgo6MtA&ab_channel=ProgrammingTree
// axios tutorial: https://www.youtube.com/watch?v=6LyagkoRWYA&ab_channel=TraversyMedia

const url = 'https://data.sfgov.org/resource/jjew-r69b.json'; 

const getData = function () {axios.get(url)
    .then(res => {
        // res.data = []
        console.log(res.data.filter(truck => {
            return truck.locationid === "1509789"
        }))

    })
    .catch(err => {
        console.log(`Error with API endpoint: ${err}`)
    })
}



// OUTPUT
console.log(msgBox); 
console.log(`------ Today's Date: ${dateGreeting} at ${timeGreeting} ------`)
console.log(getData())
// console.log(typeof mm)
// to get this to work, you run nodemon/node . -n someName otherwise it will return undefined
// console.log(yargGreeting); 
