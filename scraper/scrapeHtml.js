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
     // console.log(chalk.bold.red(`Problem ${chalk.underline(url)}.`, e))
   })

   resourceCount++

})


}
// process.on('exit', ()=>{
//
//   console.log(chalk.bold.cyan(
//     `
//     **************************
//     Total: ${resourceCount} scraped
//     **************************`))
//
//   });
// }


// const directory = 'www.mrksquincy.com'
//
// basicUrls = [
//   'https://www.mrksquincy.com',
//   'https://www.mrksquincy.com/about',
//   'https://www.mrksquincy.com/blog',
//   'https://www.mrksquincy.com/energy-efficient-window-coverings',
//   'https://www.mrksquincy.com/hunter-douglas/shutters']
//
//   singleUrl = [
//     'https://www.mrksquincy.com/about'
//    ]
//
// scrapeHtml(singleUrl, directory, false, false)

module.exports = scrapeHtml
