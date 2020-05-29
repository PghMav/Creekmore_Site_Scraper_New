const makeBlogPostsArray = require('./blogs/makeBlogPostsArray.js')
const getAllUrlsFromXml = require('./utils/getAllUrlsFromXml.js')
const chalk = require('chalk')
const rp = require('request-promise')
const cheerio = require('cheerio');
const path = require('path')
const theUrl = require('url')
const fs = require('fs')
const addCssLinks = require('./utils/addCssLinks.js')
const readline = require('readline')




//createInterface that asks if you want to override the current file
//if any is found.
// directoryMaker(host)
// scrapeHtml([baseUrl], host)
// getScreenshots([baseUrl], host)
// return
// }

const theFunction = () =>{
  const simpleInterface = readline.createInterface(process.stdin, process.stdout)
  const onUserAnswer = (answer) =>{
    simpleInterface.close()
    process.stdin.destroy()
    if (answer === 'N') {
       console.log(`You said no.`)
       
    } else {
      return console.log(`You said...something else.`)
       process.exit()

    }
  }
   simpleInterface.question('Do you want to override an existing file (if created with another scrape)? Y/N', onUserAnswer)

}

theFunction()
