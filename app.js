const chalk = require('chalk');
const rp = require('request-promise');
const fs = require('fs')
const _ = require('lodash')
const theUrl = require('url')
const yargs = require('yargs')
const getAllUrlsFromXml = require('./utils/getAllUrlsFromXml.js')
const directoryMaker = require('./utils/directoryMaker.js')
const makeBlogPostsArray = require('./blogs/makeBlogPostsArray.js')
const scrapeHtml = require('./utils/scrapeHtml.js')
const screenShotter = require('./utils/screenshotter.js')
const Stopwatch = require('statman-stopwatch');

const stopwatch = new Stopwatch();
stopwatch.start()

// parse arguements
const theArgs = yargs.parse()
const baseUrl = theArgs.url
const theType = theArgs.type

const {host} = theUrl.parse(baseUrl)
console.log(chalk.cyanBright.bgYellow(host))

if(!baseUrl || !theType){
  console.log(chalk.bgGreen(`Please supply a valid homepage for the first argument, and a valid scrape type.`))
  process.exit(0)
}

// crawl sitemap
const sitemap = baseUrl + '/sitemap.xml'

const scrapeSitemap = rp(sitemap)
    .then(  html=>{

    return getAllUrlsFromXml(html)

  })
    .then( result=>{
      //console.log(result)
      return result
    })
    .catch(e=> console.log(`couldn't get urls from scrapeSitemap`))

//assemble arrays of page urls and blog urls
const getAllUrls = async ()=>{
    const htmlUrls = await scrapeSitemap
    const blogsUrls = await makeBlogPostsArray(baseUrl)

    return {
      blogs:blogsUrls,
      pages: htmlUrls
    }
}

//run app
getAllUrls()
    .then(result=>{

      directoryMaker(host)

      switch(theArgs.type){
        case 'HTML':
        scrapeHtml(result.pages, host)
        return
        case 'BLOG':
        scrapeHtml(result.blogs, host, true)
        return
        case 'SCREENSHOT':
        screenShotter(result.pages)
        screenShotter(result.blogs)
        return
        case 'BOTH':
        scrapeHtml(result.pages, host)
        scrapeHtml(result.blogs, host, true)
        return
        case 'ALL':
        scrapeHtml(result.pages, host)
        scrapeHtml(result.blogs, host, true)
        screenShotter(result.blogs)
        screenShotter(result.pages)
        return
        default:
        throw new Error(`Enter valid type`)
      }
    })
    .catch(e=>{

        console.log(chalk.bold.yellow.bgRed(`BORKEN BIG TIME:`), e)

          })

process.on('exit', ()=>{

  const stopIt = stopwatch.stop()/1000
  console.log(chalk.bgYellow(
    `
    *****************************************************************
    Total Time for ${host}: ${stopIt} seconds
    *****************************************************************`))

  });
