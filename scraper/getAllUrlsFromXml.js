const chalk = require('chalk')
const cheerio = require('cheerio')
const _ = require('lodash')
const rp = require('request-promise')

const getAllUrlsFromXml = async (sitemap, callback)=>{
  console.log(`xml fires...`)
  const urlList = []

  await rp(sitemap)
    .then( html=>{
  const $ = cheerio.load(html);
  const allLocs = $('loc')
  const locKeys = _.keys(allLocs)

  const metaData = []


  locKeys.forEach(key=>{

    const locNum = Number(key)
    const currentLoc = allLocs[locNum]


    if(currentLoc === undefined){
      return
      }
    const theURL = currentLoc.children[0].data

    urlList.push(theURL)
      })


})
    .catch(e=>{
      callback(undefined, `Couldn't get urls from XML sitemap: ${e}`)
    })
  //console.log(urlList)
   return callback(urlList, undefined)

}

// getAllUrlsFromXml(`https://www.allaboutblindsetc.com/sitemap.xml`)

module.exports = getAllUrlsFromXml
