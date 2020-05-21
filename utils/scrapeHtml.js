const cheerio = require('cheerio');
const chalk = require('chalk');
const rp = require('request-promise');
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const theUrl = require('url')
const addCssLinks = require('./addCssLinks.js')
const pathnameLong = require('./pathnameLong.js')
const filterUrls = require('./filterUrls.js')



const scrapeHtml =  (urlArray, dir, blog) =>{
    console.log(chalk.bgCyan.yellowBright(`SCRAPING: ${blog? "Blogs": "Pages"}`))
    const filterArray = filterUrls(urlArray)
    let resourceCount = 0

     filterArray.forEach( url=>{

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

     const htmlPath = path.join(__dirname, `../files/${dir}/${ifBlog}${!pathnameLength ?  pathname : host}.html`)


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
    })
    .catch(e=>{

     console.log(chalk.bold.red(`Problem ${chalk.underline(url)}.`, e))
   })

   resourceCount++

})



process.on('exit', ()=>{

  console.log(chalk.bold.cyan(
    `
    **************************
    Total: ${resourceCount} ${blog ? 'blogs':'pages'} processed
    **************************`))

  });
}


// const directory = 'www.mrksquincy.com'
//
// basicUrls = [
//   'https://www.mrksquincy.com',
//   'https://www.mrksquincy.com/about',
//   'https://www.mrksquincy.com/blog',
//   'https://www.mrksquincy.com/energy-efficient-window-coverings',
//   'https://www.mrksquincy.com/hunter-douglas/shutters']

module.exports = scrapeHtml
