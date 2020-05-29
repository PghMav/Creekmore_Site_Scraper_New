const chalk = require('chalk');
const fs = require('fs')
const readline = require('readline')
const {stdin, stdout} = require('process')
const _ = require('lodash')
const theUrl = require('url')
const yargs = require('yargs')
const scrapeHtml = require('./scraper/scrapeHtml.js')
const getScreenshots = require('./utils/getScreenshots.js')
const fullSiteUtility = require('./fullSiteUtility')


const theArgs = yargs.parse()
const baseUrl = theArgs.url
const theType = theArgs.type


const {host} = theUrl.parse(baseUrl)
console.log(chalk.yellow(`Getting started with:`))
console.log(chalk.bgYellow.whiteBright.bold(host))


if(theType === 'SINGLE'){

  const {host} = theUrl.parse(baseUrl)
  const simpleInterface = readline.createInterface(process.stdin, process.stdout)

  const onUserAnswer = (answer) =>{
    simpleInterface.close()
    process.stdin.destroy()
    if (answer === 'Y') {
       console.log(`Okay, we'll just overwrite the file.`)
       //directoryMaker(host)
       scrapeHtml([baseUrl], host, false, false)
       getScreenshots([baseUrl], host, false, false)

    } else {
      return console.log(`Okay, we'll save to a new file name ending in -single`)
    //  directoryMaker(host)
      scrapeHtml([baseUrl], host, false, true)
      getScreenshots([baseUrl], host, false, true)

    }
  }
   simpleInterface.question('Do you want to overwrite an existing file (if created with another scrape)? Y/N', onUserAnswer)

} else {

  fullSiteUtility(baseUrl, theType, host)

}




// process.on('exit', ()=>{
//
//   // const stopIt = stopwatch.stop()/1000
//   console.log(chalk.yellow(`Finished with:`))
//   console.log(chalk.bgYellow.cyan(host))
//
//   });
