const chalk = require('chalk')
const cheerio = require('cheerio')
const _ = require('lodash')

const getAllUrlsFromXml = (html)=>{

  const $ = cheerio.load(html);
  const allLocs = $('loc')
  const locKeys = _.keys(allLocs)

  const metaData = []
  const urlList = []

  locKeys.forEach(key=>{

    const locNum = Number(key)
    const currentLoc = allLocs[locNum]


    if(currentLoc === undefined){
      return
      }
    const theURL = currentLoc.children[0].data

    urlList.push(theURL)
      })

  return urlList
}

module.exports = getAllUrlsFromXml
