const chalk = require('chalk');
const rp = require('request-promise');
const getAllUrlsFromXml = require('./scraper/getAllUrlsFromXml.js')
const directoryMaker = require('./utils/directoryMaker.js')
const makeBlogPostsArray = require('./blogs/makeBlogPostsArray.js')
const scrapeHtml = require('./scraper/scrapeHtml.js')
const getScreenshots = require('./utils/getScreenshots.js')
const filterUrls = require('./utils/filterUrls.js')
const scrapeSitemap = require('./scraper/scrapeSitemap.js')
const combineUrlArrays = ('./utils/combineUrlArrays.js')
const ProgressBar = require('progress')

const fullSiteUtility =  (baseUrl, theType, host) =>{

  if(!baseUrl || !theType){
    console.log(chalk.bgGreen(`Please supply a valid homepage for the first argument, and a valid scrape type.`))
    process.exit(0)
  }



  //  const htmlScrape = scrapeSitemap(sitemapHTML, 'HTML')

//assemble arrays of page urls and blog urls
//using getAllUrls

    const getAllUrls = async (sitemap1, sitemap2)=>{

        return{
          sitemap_xml: await scrapeSitemap(baseUrl, 'XML'),
          sitemap_html: await scrapeSitemap(baseUrl, 'HTML'),
          blogs: await makeBlogPostsArray(baseUrl)

        }

        }

      //  const htmlUrls = await htmlScrape

        //concatenate xmlUrls and htmlUrls
      //  const finalUrlList = await combineUrlArrays(xmlUrls, htmlUrls)


        // const blogsUrls = await makeBlogPostsArray(baseUrl)
        //
        // return {
        //   blogs:blogsUrls,
        //   pages: xmlUrls
        // }

   directoryMaker(host)

    getAllUrls()
        .then(({sitemap_xml, sitemap_html, blogs})=>{
          //compare arrays and make a master array

          const additionalUrls = []

          for(const url of sitemap_html){
            const foundIt = sitemap_xml.includes(url)
            if(foundIt === false){
              console.log(`Adding this url: ${url}`)
              additionalUrls.push(url)
            }
          }
          // console.log(`full list: ${fullUrlList}`)
          return {
            pages: sitemap_xml.concat(additionalUrls),
            blogs
          }
        })
        .then(({pages, blogs})=>{
          //filter here
          const filteredArray = filterUrls(pages)

          return {
            pages: filteredArray,
            blogs
          }

        })
        .then(result=>{
          const pagesTotal = result.blogs.length + result.pages.length
          console.log(chalk.bgYellow.whiteBright(`Total Pages: ${result.pages.length}, Total Blogs:${result.blogs.length}`))

          //appProgressBar counts total pages twice if scraping and screencapturing; this way
          //the progress bar is showing the true total

          const appProgress = new ProgressBar(chalk.bgYellow.whiteBright(`Working [:bar] :current/:total :percent`), {
            total: (result.blogs.length + result.pages.length)*(theType === 'HTML-SCREENSHOTS'? 2 : 1),
            width: 20
          })

          switch(theType){

            case 'SCREENSHOTS':
            getScreenshots(result.pages, host, false, false, appProgress)
            getScreenshots(result.blogs, host, true, false, appProgress)
            return
            case 'HTML':
            scrapeHtml(result.pages, host, false, false, appProgress)
            scrapeHtml(result.blogs, host, true, false, appProgress)
            return
            case 'HTML-SCREENSHOTS':
            scrapeHtml(result.pages, host, false, false, appProgress)
            scrapeHtml(result.blogs, host, true, false, appProgress)
            getScreenshots(result.pages, host, false, false, appProgress)
            getScreenshots(result.blogs, host, true,false, appProgress)
            return
            default:
            throw new Error(`Enter valid type`)
          }
        })
        .catch(e=>{

            console.log(chalk.bold.yellow.bgRed(`BORKEN BIG TIME:`), e)

              })


}

const baseUrl = `https://www.allaboutblindsetc.com`
const baseType = 'HTML'
const baseHost = 'www.allaboutblindsetc.com'

fullSiteUtility(baseUrl, baseType, baseHost)
module.exports = fullSiteUtility
