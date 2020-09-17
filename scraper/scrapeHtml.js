const cheerio = require('cheerio');
const chalk = require('chalk');
const rp = require('request-promise');
const axios = require('axios').default
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const theUrl = require('url')
const addCssLinks = require('../utils/addCssLinks.js')
const findPathDepth = require('../utils/findPathDepth')
const pathnameLong = require('../utils/pathnameLong.js')
const filterUrls = require('../utils/filterUrls.js')
const ProgressBar = require('progress')


const scrapeHtml =  async (urlArray, dir, blog, overwrite, appProgressBar) =>{

    const errorLog = []
    const errorLogDir = path.join(__dirname, `../files/${dir}/logs/scrape_errors.txt`)
    // const filterArray = filterUrls(urlArray)
    let resourceCount = 0

    // var scrapeProgress = new ProgressBar(`Scraping ${blog? 'blogs': 'pages'} [:bar] :current/:total :percent :etas`, {
    //   total: urlArray.length,
    //   width: 20,
    //
    // });
    for(const url of urlArray){

      const {
       protocol,
       slashes,
       host,
       query,
       href,
       pathname
     } = theUrl.parse(url);
     
    //  console.log(
    //    chalk.cyan(`
    //    host: ${host},
    //    query: ${query},
    //    href: ${href},
    //    pathname: ${pathname}
    //  `)
    //  );
     console.log(chalk.blue(url))
  
     const pathnameLength = pathname.length<2
  
     const ifBlog = blog ? `/blog`:``
     const ifOverwrite = overwrite ? `-SINGLE`:``
  
     const htmlPath = path.join(__dirname, `../files/${dir}/html/${ifBlog}${!pathnameLength ?  pathname : host}${ifOverwrite}.html`)
     const altHtmlPath = path.join(__dirname, `../files/${dir}/${url}.html/`)
  
  
    await axios.get(url)
    .then(response => {
      const html = response.data
      // console.log(chalk.bgBlue.whiteBright(`response received for: ${url}`))
      
  
      // const testForString = pathnameLong(url)
      
      const insertDotSlash = findPathDepth(url)

      

      const linkTags = `<link rel="stylesheet" href="${insertDotSlash}css/hd-1-dependencies.min.css"/><link rel="stylesheet" href="${insertDotSlash}css/hd-2-site.min.css"/><link rel="stylesheet" href="${insertDotSlash}css/hd-3-base.min.css"/>`

      const newHtml = addCssLinks(html, linkTags)
      return newHtml
  
  
    })
    .then(html=>{
      //console.log(html)
      fs.writeFileSync(htmlPath, html)
  
      appProgressBar.tick()
      if (appProgressBar.complete) {
        console.log(chalk.bgGreen.whiteBright(`Site complete!`));
      }
    })
    .catch(e=>{
     appProgressBar.interrupt(`Issue SCRAPE ${url}: `)
     appProgressBar.tick()
      console.log(`REASON: ${e.reason}, FUNCTION: ${e.function}, CODE: ${e.code}`)
     const errorText = `
     LOG ERROR FOR: ${url}
     ERROR: ${e.name}
     MESSAGE: ${e.message}
  
  
     ***************************
  
  
     `
     fs.appendFileSync(errorLogDir, errorText, (err, file)=>{
       if (err) throw Error
       console.log(`Error logged.`)
     })
     
     // errorLog.push({
     //   URL: url,
     //   ERROR: e
     // })
  
  
  
     // console.log(chalk.bold.red(`Problem ${chalk.underline(url)}.`, e))
   })
    resourceCount++;
  }
     
      

  





// process.on('exit', ()=>{
//  console.log(errorLog)
//   fs.appendFileSync(errorLogDir, JSON.stringify(errorLog), (err, file)=>{
//     if (err) throw Error
//     console.log(`Error logged.`)
//   })
//
//   });
} //end



module.exports = scrapeHtml
