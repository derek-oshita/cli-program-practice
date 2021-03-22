#!/usr/bin/env node

// tutorial: https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs

// REQUIRE MODULES --------------------------------------------------------------------------------------------------------------------
const chalk = require('chalk'); 
const boxen = require('boxen'); 
const yargs = require('yargs'); 
const axios = require('axios'); 


// DATE VARIABLES ---------------------------------------------------------------------------------------------------------------------
const today = new Date(); 

// get number code according to day of the week
const todaysNumberCode = today.getDay(); 

// create day, month, and year variables to format
const dd = String(today.getDate()).padStart(2, '0'); 
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const yy = today.getFullYear();

// interpolate the variables to format
const todaysDate = `${mm}/${dd}/${yy}`
const todaysTime = today.toLocaleTimeString(); 
const todaysTime24Hours = today.getHours().toString()


// CLI STYLING ------------------------------------------------------------------------------------------------------------------------
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
const welcome = boxen(greeting, greetingOptions); 


// CLI YARGS (ARGUMENTS) --------------------------------------------------------------------------------------------------------------
// tutorial: https://dev.to/christopherkade/building-a-cli-with-yargs-ip8
const options = yargs
    .usage('Usage: -p <page>')
    .option('p', {alias: 'page', describe: 'Page number', type:'number', demandOption: false})
    .argv; 


// AXIOS FOR API ENDPOINT --------------------------------------------------------------------------------------------------------------
// Pass todaysNumberCode into URL to filter JSON for trucks that are open according to the day of the week.
const url = `https://data.sfgov.org/resource/jjew-r69b.json?dayorder=${todaysNumberCode}`; 

// API CALL 
const getData = function (pageNumber) {
    axios.get(url)
    .then(res => {
        // FILTER FOR TRUCKS THAT ARE OPEN AT CURRENT TIME
        res = res.data.filter(truck => {
            return todaysTime24Hours > truck.start24 && todaysTime24Hours < truck.end24
        })

        // SORT BY APPLICANT NAME
        res.sort((a,b) => a.applicant.toLowerCase() > b.applicant.toLowerCase() ? 1 : -1)

        // MAP THROUGH RES ARRAY AND RETURN ONLY APPLICANT NAME AND TRUCK LOCATION
        res = res.map(truck => {
            return truck.applicant + ' ---> ' + truck.location
        })

        // SHOW TOTAL PAGES
        const totalPages = Math.ceil(res.length / 10); 

        // IF NO PAGE NUMBER IS PROVIDED, SEND THE FIRST 10
        if (!pageNumber || pageNumber <= 1) {
            console.log(res.slice(0, 10))
        // IF THE USER PASSES A NUMBER GREATER THAN TOTAL AMOUNT OF PAGES, LOG ERROR MESSAGE
        } else if (pageNumber > totalPages || typeof pageNumber !== 'number') {
            console.error('Nothing to see here!')
        // IF THE DATA IS VALID
        } else {
            const resultsArr = res.slice((pageNumber * 10) - 10, (pageNumber * 10)); 
            console.log(resultsArr.map(truck => truck))
        }

        // SHOW CURRENT PAGE NUMBER / TOTAL PAGES
        console.log(`${pageNumber > totalPages ? `There are only ${totalPages} total pages..` : `Page: ${pageNumber || 1} / ${totalPages}`}`)
        // SHOW TOTAL FOOD TRUCKS OPEN
        console.log('Total Food Trucks: ', res.length)
    })
    .catch(err => {
        console.log(`Error with API endpoint: ${err}`)
    })
}


// OUTPUT ------------------------------------------------------------------------------------------------------------------------------

// WELCOME 
console.log(welcome); 

// DATE TABLE
console.log('----------------------------------------------------')
console.log(`||---- Today's Date: ${dateGreeting} at ${timeGreeting} ----||`); 
console.log('----------------------------------------------------')

// TRUCK DATA
getData(options.page)






