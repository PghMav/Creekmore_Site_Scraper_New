const cheerio = require('cheerio');
const chalk = require('chalk');
const rp = require('request-promise');
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const theUrl = require('url')



const scrapeHtml =  (urlArray, dir, blog) =>{


    let resourceCount = 0

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

     const htmlPath = path.join(__dirname, `../files/${dir}/${ifBlog}${!pathnameLength ?  pathname : host}.html`)


    rp({
    uri: url
    })
    .then(html => {

      fs.writeFileSync(htmlPath, html)

    })
    .catch(e=>{

     console.log(chalk.bold.red(`There was a problem scraping ${chalk.underline(url)}. Thought you'd want to know.`))
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



// basicUrls = [
//   'https://www.mrksquincy.com',
//   'https://www.mrksquincy.com/about',
//   'https://www.mrksquincy.com/blog']
// scrapeHtml(basicUrls, directory)

module.exports = scrapeHtml
