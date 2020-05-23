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
const getScreenshots = require('./utils/getScreenshots.js')
const filterUrls = require('./utils/filterUrls.js')
//const screenShotter = require('./utils/screenshotter.js')
// const Stopwatch = require('statman-stopwatch');

const ProgressBar = require('progress')

// const stopwatch = new Stopwatch();
// stopwatch.start()

// parse arguements
const theArgs = yargs.parse()
const baseUrl = theArgs.url
const theType = theArgs.type
// const argsHtml = theArgs.html
// const argsSS = theArgs.screenshot
//
// const ifHtml = (argsHtml === "true"? true : false)
// const ifScreenshot = (argsSS === "true"? true : false)
//
// console.log(`html: ${ifHtml}`)
// console.log(`screenshot ${ifScreenshot}`)

const {host} = theUrl.parse(baseUrl)
console.log(chalk.yellow(`Getting started with:`))
console.log(chalk.bgYellow.cyan(host))

if(!baseUrl || !theType){
  console.log(chalk.bgGreen(`Please supply a valid homepage for the first argument, and a valid scrape type.`))
  process.exit(0)
}


if(theArgs.type === 'SINGLE'){
  const {host} = theUrl.parse(baseUrl)
  directoryMaker(host)
  scrapeHtml([baseUrl], host)
  getScreenshots([baseUrl], host)
  return
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
directoryMaker(host)


//run app
getAllUrls()
    .then(result=>{
      //filter here
      const filteredArray = filterUrls(result.pages)
      return {
        pages: filteredArray,
        blogs: result.blogs
      }
    })
    // .then(result=>{
    //
    //   //scrape HTML here
    //   if(ifHtml){
    //   for(const array in result){
    //      scrapeHtml(result[array])
    //     return result
    //   }} else {
    //     return result
    //   }
    //
    //
    //
    // })
    // .then(result=>{
    //
    //   //get screenshots here
    //   if(ifScreenshot){
    //   for(const array in result){
    //      getScreenshots(result[array])
    //     return result
    //   }
    // }else{
    //   return result
    // }
    //
    // })
    .then(result=>{

      const appProgress = new ProgressBar(chalk.bgGreen.red(`scraping [:bar] :current/:total :percent`), {
        total: result.blogs.length + result.pages.length,
        width: 20
      })

      switch(theArgs.type){
        case 'PAGES':
        scrapeHtml(result.pages, host, false, appProgress)
        scrapeHtml(result.blogs, host, true, appProgress)
        return
        case 'BLOG':
        scrapeHtml(result.blogs, host, true)
        getScreenshots(result.blogs, host, true)
        return
        case 'SCREENSHOT':
        getScreenshots(result.pages, host)
        getScreenshots(result.blogs, host, true)
        return
        case 'PAGES-BLOGS':
        getScreenshots(result.pages, host)
        getScreenshots(result.blogs, host, true)

        return
        case 'ALL':
        scrapeHtml(result.pages, host)
        scrapeHtml(result.blogs, host, true)
        getScreenshots(result.pages, host)
        getScreenshots(result.blogs, host, true)
        return
        default:
        throw new Error(`Enter valid type`)
      }
    })
    .catch(e=>{

        console.log(chalk.bold.yellow.bgRed(`BORKEN BIG TIME:`), e)

          })

process.on('exit', ()=>{

  // const stopIt = stopwatch.stop()/1000
  console.log(chalk.bgYellow(
    `
    *****************************************************************()
    Total Time for ${host}:  seconds
    *****************************************************************`))

  });
