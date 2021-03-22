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
const greeting = chalk.white.bold('Welcome to Off The Grid, CLI!'); 
const msgBox = boxen(greeting, greetingOptions); 

// CLI YARGS (ARGUMENTS) --------------------------------------------------------------------------------------------------------------
// tutorial: https://dev.to/christopherkade/building-a-cli-with-yargs-ip8

// const options = yargs   
//     .usage('Usage: -n <name>')
//     .option('n', {alias: 'name', describe: 'Your name', type: 'string', demandOption: false})
//     .argv; 

// const yargGreeting = `Hello, ${options.name}`

// to get this to work, you run nodemon/node . -n someName otherwise it will return undefined
// console.log(yargGreeting); 

const options = yargs
    .usage('Usage: -p <page>')
    .option('p', {alias: 'page', describe: 'Page number', type:'number', demandOption: false})
    .argv; 


// AXIOS FOR API ENDPOINT --------------------------------------------------------------------------------------------------------------

// ALL TODAY 
const url = `https://data.sfgov.org/resource/jjew-r69b.json?dayorder=${todaysNumberCode}`; 

// ALL LIMIT 10
// const url = `https://data.sfgov.org/resource/jjew-r69b.json?$limit=10&dayorder=${todaysNumberCode}`; 

// ALL LIMIT 10 OFFSET 10
// const url = `https://data.sfgov.org/resource/jjew-r69b.json?$limit=10&$offset=10&dayorder=${todaysNumberCode}`; 

const getData = function (pageNumber) {
    axios.get(url)
    .then(res => {
        // FILTER FOR OPEN TODAY AT CURRENT TIME
        res = res.data.filter(truck => {
            return today.getHours().toString() > truck.start24 
            && today.getHours().toString() < truck.end24
        })

        // SORT BY APPLICANT NAME
        res.sort((a,b) => a.applicant > b.applicant ? 1 : -1)

        // MAP THROUGH RES ARRAY AND RETURN ONLY APPLICANT NAME AND TRUCK LOCATION
        res = res.map(truck => {
            return truck.applicant + ' ---> ' + truck.location
        })

        // SHOW TOTAL PAGES
        const totalPages = Math.ceil(res.length / 10); 


        // IF NO PAGE NUMBER IS PROVIDED, SEND THE FIRST 10
        if (!pageNumber || pageNumber <= 1) {
            console.log(res.slice(0, 10))
        } else if (pageNumber > totalPages) {
            console.log('Nothing to see here!')
        } else {
            const resultsArr = res.slice((pageNumber * 10) - 10, (pageNumber * 10)); 
            console.log(resultsArr.map(truck => truck))
        }


        console.log(`${pageNumber > totalPages ? `There are only ${totalPages} total pages..` : `Page: ${pageNumber || 1} / ${totalPages}`}`)
        console.log('Total Food Trucks: ', res.length)
    })
    .catch(err => {
        console.log(`Error with API endpoint: ${err}`)
    })
}





// OUTPUT
console.log(msgBox); 
console.log('----------------------------------------------------')
console.log(`||---- Today's Date: ${dateGreeting} at ${timeGreeting} ----||`); 
console.log('----------------------------------------------------')

// TRUCK DATA
// getData(); 
getData(options.page)






