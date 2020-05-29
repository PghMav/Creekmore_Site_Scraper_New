
const chalk = require('chalk')

const path = require('path')
const theUrl = require('url')
const fs = require('fs')

const readline = require('readline')




//createInterface that asks if you want to override the current file
//if any is found.
// directoryMaker(host)
// scrapeHtml([baseUrl], host)
// getScreenshots([baseUrl], host)
// return
// }

const theFunction = (array) =>{


  for(const url of array){
    const {
     protocol,
     slashes,
     host,
     query,
     href,
     pathname
   } = theUrl.parse(url);

   const hdRegEx = /\/hunter-douglas-window-treatments\//
   const hdRegEx2 = /\/hunter-douglas\//

   const test1 = hdRegEx.test(pathname)
   const test2 = hdRegEx2.test(pathname)

    if(test1 || test2 ){
      console.log(chalk.red(`Failed test: ${url}`))
    } else {
      console.log(chalk.bgGreen(`Passed test: ${url}`))
    }
  }
}

const testArray = [
  'https://www.hdalliance.com',
  'https://www.hdalliance.com/hunter-douglas-window-treatments/cadence',
  'https://www.hdalliance.com/hunter-douglas-window-treatments/everwood',
  'https://www.hdalliance.com/hunter-douglas/side-panels-drapery',
  'https://www.hdalliance.com/blog',
  'https://www.hdalliance.com/about'
]

theFunction(testArray)
