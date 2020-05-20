const makeBlogPostsArray = require('./blogs/makeBlogPostsArray.js')
const getAllUrlsFromXml = require('./utils/getAllUrlsFromXml.js')
const chalk = require('chalk')
const rp = require('request-promise')
const cheerio = require('cheerio');
const path = require('path')
const theUrl = require('url')
const fs = require('fs')
const addCssLinks = require('./utils/addCssLinks.js')

const linkAdder=(url, dir, blog)=>{


   const {
    protocol,
    slashes,
    host,
    query,
    href,
    pathname
  } = theUrl.parse(url);

  const ifBlog = blog ? `/blog`:``

  const pathnameLength = pathname.length<2

const htmlPath = path.join(__dirname, `/files/${dir}/${ifBlog}${!pathnameLength ?  pathname : host}.html`)

rp({
uri: url
})
.then(html => {
  let linkTags
  if(pathname.lenght<14){
    linkTags = `<link rel="stylesheet" href="/css/creekmore.css"><link rel="stylesheet" href="/css/hunter-douglas.css">`
  } else {

    linkTags = `<link rel="stylesheet" href="../css/creekmore.css"><link rel="stylesheet" href="../css/hunter-douglas.css">`
  }



  const newHtml = addCssLinks(html, linkTags)
  //console.log(newHtml)
  //console.log(typeof html)
  //const $ = cheerio.load(html)
  //const addCSSLink = $('head').append('<link rel="stylesheet" href="/creekmore.css" >')
  // const addLinkAttr = addCSSLink.attr('href', '/css/creekmore.css').attr('rel', 'stylesheet')
  //should we insert the <link> tags here? yes i think so
  //console.log(addCSSLink)


  fs.writeFileSync(htmlPath, newHtml)
  //return html
})
.catch(e=>{

 console.log(chalk.bold.red(`There was a problem scraping ${chalk.underline(url)}. Thought you'd want to know. ${e}`))
})
}
// getAllUrls().then(result=>console.log(result))
//console.log(baseArray)
//Promise.all(baseArray).then(result=> console.log(result))
const radUrl = 'https://www.mrksquincy.com/'
const radLongUrl = 'https://www.mrksquincy.com/hunter-douglas/roman-shades'
const radDir = 'www.mrks'

linkAdder(radUrl, radDir)
linkAdder(radLongUrl, radDir)
