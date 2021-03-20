#!/usr/bin/env node

// tutorial: https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs

// REQUIRE MODULES --------------------------------------------------------------------------------------------------------------------
const chalk = require('chalk'); 
const boxen = require('boxen'); 
const yargs = require('yargs'); 
const axios = require('axios'); 

// DATE VARIABLES ---------------------------------------------------------------------------------------------------------------------
const today = new Date(); 
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// date number value according to the day of the month
const todaysNumberCode = today.getDay(); 

const dd = String(today.getDate()).padStart(2, '0'); 
// month number value
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
        // OPEN TODAY
        res = res.data.filter(truck => {
            return daysOfWeek[todaysNumberCode] === truck.dayofweekstr && today.getHours().toString() > truck.start24 && today.getHours().toString() < truck.end24
        })

        // SORT BY APPLICANT NAME
        res.sort((a,b) => a.applicant > b.applicant ? 1 : -1)

        // MAP AND RETURN THE APPLICANT NAME AND TRUCK LOCATION
        console.log(res.map(truckData => {
            return truckData.applicant + ' ---> ' + truckData.location
        }))
    })

    .catch(err => {
        console.log(`Error with API endpoint: ${err}`)
    })
}



// OUTPUT
console.log(msgBox); 
console.log(`------ Today's Date: ${dateGreeting} at ${timeGreeting} ------`); 

// TRUCK DATA
console.log(getData())
// console.log(today.getHours())

// to get this to work, you run nodemon/node . -n someName otherwise it will return undefined
// console.log(yargGreeting); 
