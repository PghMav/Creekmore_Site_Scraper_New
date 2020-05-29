const cheerio = require('cheerio');
const chalk = require('chalk');
const rp = require('request-promise');
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const theUrl = require('url')
const addCssLinks = require('../utils/addCssLinks.js')
const pathnameLong = require('../utils/pathnameLong.js')
const filterUrls = require('../utils/filterUrls.js')
const ProgressBar = require('progress')


const scrapeHtml =  (urlArray, dir, blog, overwrite, appProgressBar) =>{

    const errorLog = []
    const errorLogDir = path.join(__dirname, `../files/${dir}/logs/scrape_errors.json`)
    // const filterArray = filterUrls(urlArray)
    let resourceCount = 0

    // var scrapeProgress = new ProgressBar(`Scraping ${blog? 'blogs': 'pages'} [:bar] :current/:total :percent :etas`, {
    //   total: urlArray.length,
    //   width: 20,
    //
    // });

     urlArray.forEach( url=>{

      const {
       protocol,
       slashes,
       host,
       query,
       href,
       pathname
     } = theUrl.parse(url);



     const pathnameLength = pathname.length<2

     const ifBlog = blog ? `/blog`:``
     const ifOverwrite = overwrite ? `-SINGLE`:``

     const htmlPath = path.join(__dirname, `../files/${dir}/html/${ifBlog}${!pathnameLength ?  pathname : host}${ifOverwrite}.html`)


    rp({
    uri: url
    })
    .then(html => {

      let linkTags

      const testForString = pathnameLong(url)

      if( testForString || blog){
        linkTags = `<link rel="stylesheet" href="..css/creekmore.css"/><link rel="stylesheet" href="../css/hunter-douglas.css"/>`

      } else {

        linkTags = `<link rel="stylesheet" href="css/creekmore.css"/><link rel="stylesheet" href="css/hunter-douglas.css"/>`
      }

      const newHtml = addCssLinks(html, linkTags)
      return newHtml


    })
    .then(html=>{
      fs.writeFileSync(htmlPath, html)

      appProgressBar.tick()
      if (appProgressBar.complete) {
        console.log(chalk.bgGreen.whiteBright(`Site complete!`));
      }
    })
    .catch(e=>{
     appProgressBar.interrupt(`Issue SCRAPE ${url}: `)
     appProgressBar.tick()
     errorLog.push({
       URL: url,
       ERROR: e
     })



     // console.log(chalk.bold.red(`Problem ${chalk.underline(url)}.`, e))
   })

   resourceCount++

})



process.on('exit', ()=>{
//  console.log(errorLog)
  fs.appendFileSync(errorLogDir, JSON.stringify(errorLog), (err, file)=>{
    if (err) throw Error
    console.log(`Error logged.`)
  })

  });
}



module.exports = scrapeHtml
