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
      const allATags = $('div.button-container > a[class="cta button small"]')
      //const allATags = $('a.cta')

      const tagKeys = Object.keys(allATags)

      for(const key of tagKeys){
      if(+key){

        const thePath = allATags[key].attribs.href


        if(!newUrls.includes(`${protocol}//${host}${thePath}`)){
            newUrls.push(`${protocol}//${host}${thePath}`)
        }

      }


          }


    })
    .catch(e=>{
      if(e.statusCode === 404){
        console.log(`No posts found on ${archivePage}`)
      }


    })
 return newUrls
}


module.exports = getAllBlogPostUrls
