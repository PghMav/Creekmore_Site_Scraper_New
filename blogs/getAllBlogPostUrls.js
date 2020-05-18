const cheerio = require('cheerio')
const rp = require('request-promise');
const chalk = require('chalk')
const theUrl = require('url')


const getAllBlogPostUrls =async archivePage=>{

  const {
   protocol,
   slashes,
   host,
   query,
   href,
   pathname
 } = theUrl.parse(archivePage)


  const newUrls = []

  await  rp({
    uri: archivePage
  })
    .then(html =>{

      const $ = cheerio.load(html)
      const allATags = $('div.button-container > a.cta')

      const tagKeys = Object.keys(allATags)

      tagKeys.forEach(key=>{


        if(+key){
        const thePath = allATags[key].attribs.href
        newUrls.push(`${protocol}//${host}${thePath}`)
        }

        })//end forEach



    })
    .catch(e=>{
      console.log(chalk.bgBlue(newUrls))

    })
 return newUrls
}


module.exports = getAllBlogPostUrls
