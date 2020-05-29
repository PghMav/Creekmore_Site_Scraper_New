const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const theUrl = require('url')
const filterUrls = require('./filterUrls.js')
const ProgressBar = require('progress')


const getScreenshots = async (urlArray, dir, blog, overwrite, appProgressBar) => {
  const errorLog = []
  const errorLogDir = path.join(__dirname, '../files/dir/logs/screenshot_errors.txt')


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
    const ifOverwrite = overwrite ? `-SINGLE`:``

    const writePath = path.join(__dirname, `../files/${dir}/screenshots/${ifBlog}${!pathnameLength ?  pathname : host}${ifOverwrite}.png`)


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


      appProgressBar.tick()
      if (appProgressBar.complete) {
        console.log(chalk.bgGreen.whiteBright(`Site complete!`));
      }





      resourceCount++

    } catch (e){

        appProgressBar.interrupt(`Issue SCREENSHOT ${url}`)
        appProgressBar.tick()

        errorLog.push({
          URL: url,
          ERROR: e
        })
    }



  }


 await browser.close()
 process.on('exit', ()=>{
   fs.appendFileSync(errorLogDir, errorLog, (err, file)=>{
     if (err) throw Error
     console.log(`Error logged.`)
   })
   });

}



module.exports = getScreenshots
