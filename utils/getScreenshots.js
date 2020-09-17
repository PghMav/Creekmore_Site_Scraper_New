const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const theUrl = require('url')
const filterUrls = require('./filterUrls.js')
const ProgressBar = require('progress')


const getScreenshots = async (urlArray, dir, blog, overwrite, appProgressBar) => {
  //const errorLog = []
  const errorLogDir = path.join(__dirname, `../files/${dir}/logs/screenshot_errors.txt`)


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


  const browser = await puppeteer.launch({headless: false})

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

    const hdRegEx = /\/hunter-douglas-window-treatments\//
    const hdRegEx2 = /\/hunter-douglas\//

    const test1 = hdRegEx.test(pathname)
    const test2 = hdRegEx2.test(pathname)

    const writePath = path.join(__dirname, `../files/${dir}/screenshots/${ifBlog}${!pathnameLength ?  pathname : host}${ifOverwrite}.png`)




    try{

      const secretBrowser = await browser.createIncognitoBrowserContext()
      const page = await secretBrowser.newPage()
      await page.viewport({
        width: 1024,
        height: 768
            })
      await page.goto(url)
      
      await page.waitForSelector(
        "#cmp-modal-wrapper > div > div.cmp-modal__close > img"
      );

      await page.click("#cmp-modal-wrapper > div > div.cmp-modal__close > img");
      // if(test1 || test2){
      //   await page.waitForSelector(`#pageMain_ContentSection_Section_20 > div.product-details-container.overview.ng-scope > div > div > div > div`)
      // }
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

        const errorText = `
        LOG ERROR FOR: ${url}
        ERROR: ${e.name}
        MESSAGE: ${e.message}


        ***************************


        `
        fs.appendFileSync(errorLogDir, errorText, (err, file)=>{
          if (err) throw Error
          console.log(`Error logged.`)
        })
    }



  }


 await browser.close()
 // process.on('exit', ()=>{
 //   fs.appendFileSync(errorLogDir, errorLog, (err, file)=>{
 //     if (err) throw Error
 //     console.log(`Error logged.`)
 //   })
 //   });

}



module.exports = getScreenshots
