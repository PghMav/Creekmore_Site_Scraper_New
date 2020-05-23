const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const theUrl = require('url')
const filterUrls = require('./filterUrls.js')
const ProgressBar = require('progress')


const getScreenshots = async (urlArray, dir, blog) => {
  let resourceCount = 0

  if(blog){
    var snapBlogProgress = new ProgressBar(chalk.bgCyan.whiteBright(`Screenshots ${blog? 'blogs':'pages'} [:bar] :current/:total :percent :etas`), {
      total: urlArray.length,
      width: 20,
      complete: blog? '#': '=',
      incomplete: '-'
    });
  } else {
    var snapPagesProgress = new ProgressBar(chalk.bgMagenta.whiteBright(`Screenshots ${blog? 'blogs':'pages'} [:bar] :current/:total :percent :etas`), {
      total: urlArray.length,
      width: 20,
      complete: blog? '#': '=',
      incomplete: '-'
    });
  }




  //console.log(chalk.bgCyan.yellowBright(`SCREENSHOT: ${blog? "Blogs": "Pages"}`))

  const browser = await puppeteer.launch( )

  for(const url of urlArray){

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



      await page.close()

      if (blog) {
      snapBlogProgress.tick();
      if(snapBlogProgress.complete){
        console.log(chalk.bgCyan.yellowBright(`Blogs screenshots complete!`));
      }

      } else {
      snapPagesProgress.tick()
      if (snapPagesProgress.complete) {
        console.log(chalk.bgCyan.yellowBright(`Pages screenshots complete!`));
      }
      }




      resourceCount++

    } catch (e){
      if(blog){
        snapBlogProgress.interrupt(`Issue SCREENSHOT ${url}: ${e}`)
      } else {
        snapPagesProgress.interrupt(`Issue SCREENSHOT ${url}: ${e}`)
      }
    //  console.log(chalk.cyan(e))

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
// getScreenshots(basicUrls, 'www.mrksquincy.com')

module.exports = getScreenshots
