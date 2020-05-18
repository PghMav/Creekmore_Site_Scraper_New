const makeBlogPostsArray = require('./blogs/makeBlogPostsArray.js')
const scrapeHtml = require('./utils/scrapeHtml.js')
const getAllUrlsFromXml = require('./utils/getAllUrlsFromXml.js')
const chalk = require('chalk')
const rp = require('request-promise')


const baseUrl = 'https://www.mrksquincy.com'
let baseArray = ['https://www.mrksquincy.com/wer', 'https://www.mrksquincy.com/xnkero', 'https://www.mrksquincy.com/pe93']
const archivePages = [
  '/blog',
  '/blog-2019',
  '/blog-2018',
  '/blog-2017',
  '/blog-2016',
  '/blog-2015'
]

const sitemap = baseUrl + '/sitemap.xml'

const scrapeSitemap = rp(sitemap)
.then(  html=>{

    return getAllUrlsFromXml(html)

  })
    .then( result=>{
      //console.log(result)
      return result
    })
.catch(e=> console.log(e))

const getAllUrls = async ()=>{
  const htmlUrls = await scrapeXML
  const blogsUrls = await makeBlogPostsArray(baseUrl)

  console.log(chalk.yellow(htmlUrls))
  console.log(chalk.bgGreen(blogsUrls))

  return {
    blogs:blogsUrls,
    site: htmlUrls
  }
  // const fullArray = htmlUrls.concat(blogsUrls)
  // console.log(chalk.magenta(fullArray))
}

getAllUrls().then(result=>console.log(result))
//console.log(baseArray)
//Promise.all(baseArray).then(result=> console.log(result))
