const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const theUrl = require('url')
const filterUrls = require('./filterUrls.js')


const getScreenshots = async (urlArray, dir, blog) => {
  let resourceCount = 0
  console.log(chalk.bgCyan.yellowBright(`SCREENSHOT: ${blog? "Blogs": "Pages"}`))
  const filterArray = filterUrls(urlArray)

  const browser = await puppeteer.launch()

  for(const url of filterArray){

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

    const writePath = path.join(__dirname, `../files/${dir}/screenshots/${ifBlog}${!pathnameLength ?  pathname : host}.png`)

    // const screenshotOptions = {
    //
    //   path: writePath,
    //   fullPage: true
    //   // clip: {
    //   //   x:0,
    //   //   y:0,
    //   //   height: 7000,
    //   //   width: 1024
    //   }


    const viewportOptions = {
      width: 1024,
      height: 768
    }

    try{

      const secretBrowser = await browser.createIncognitoBrowserContext()
      const page = await secretBrowser.newPage()
      await page.viewport({
        width: 1024,
        height: 768
      })
      await page.goto(url)
      await page.screenshot({
        path: writePath,
        fullPage: true
      })

      resourceCount++
      console.log(chalk.bgCyan.redBright(`Another screenshot! ${resourceCount} and counting!`))
      await page.close()

    } catch (e){

      console.log(chalk.cyan(e))

    }



  }


 await browser.close()
 process.on('exit', ()=>{

   console.log(chalk.bold.magenta(
     `
     **************************
     Total: ${resourceCount} ${blog ? 'blogs':'pages'} captured via screenshot
     **************************`))

   });

}


// basicUrls = [
//   'https://www.mrksquincy.com',
//   'https://www.mrksquincy.com/about',
//   'https://www.mrksquincy.com/blog'
// ]
// puppet(basicUrls)

module.exports = getScreenshots
