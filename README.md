## CLI Practice

The purpose of this project is to create a simple command line program that returns a list of food trucks from SF's public API. Food trucks that are displayed must be open at the time the program is run. They must be sorted in ascending order by the food truck name and display its location. The food trucks must be pagniated where each page holds a list of 10 food trucks. Users must be able to enter a prompt to change the pages and display different results. 

## Dependencies 

- Node.js
- chalk v2.4
- boxen v4.0 
- Yargs v13.2
- Axios v.19
- Nodemon (optional)

## Installation

Directions for installation should run on any operating system, including macOS and Linux. 

1. Install Node.js (LTS is sufficient)

https://nodejs.org/en/download/

2. Confirm installation by running 'node -v' from your CLI. 

$ node -v

3. From your CLI, navigate inside of the project folder. 

$ cd project_folder

4. Run 'npm install' from the CLI to install the dependencies. 

project_folder $ npm install 

## How To Run the Program 

After you have installed all of the dependencies, there are only two commands necessary in order to see the results. 

1. $ node app.js 

- This will execute the program and return the first page of open food trucks. 
- You will see the total amount of pages beneath the list of food trucks. 
- To change pages, please see step 2. 

2. node app.js -p (page number)

- Replace (page number) with any number between 1 and the total number of pages. 
- This will execute the program and return thelist of food trucks features on that page. 

## Resources
Tutorial: https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs