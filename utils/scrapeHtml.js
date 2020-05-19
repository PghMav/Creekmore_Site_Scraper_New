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

     //pathname filter here
     const urlFilter = [
       '/hunter-douglas-window-treatments/duette',
       '/hunter-douglas/sheers-shadings',
       '/hunter-douglas/roman-shades',
       '/hunter-douglas/roller-shades-solar-shades',
       '/hunter-douglas/woven-woods',
       '/hunter-douglas/shutters',
       '/hunter-douglas/vertical-blinds',
       '/hunter-douglas/wood-metal-blinds',
       '/hunter-douglas-window-treatments/design-studio-side-panels-drapery',
       '/hunter-douglas-powerview-motorization',
       '/new-hunter-douglas-window-treatments-and-options',
       '/hunter-douglas-videos',
       '/decorating-with-green-home-accents',
       '/decorating-with-bookshelves',
       'https://www.allaboutblindsetc.com/upgrade-your-home-office',
       '/fresh-design-ideas-for-your-home',
       '/window-treatments-for-bathrooms',
       '/window-treatments-for-bedrooms',
       '/window-treatments-for-home-offices',
       '/window-treatments-for-kitchens',
       '/window-treatments-for-living-rooms',
       '/window-treatments-for-media-rooms',
       '/window-treatments-for-nursery-and-childrens-rooms',
       '/window-treatments-for-angled-windows',
       '/window-treatments-for-arched-windows',
       '/window-treatments-for-bay-and-corner-windows',
       '/window-treatments-for-french-doors',
       '/sidelight-window-blinds-and-shades',
       '/window-treatments-for-skylights',
       '/window-treatments-for-patio-doors-and-sliding-glass-doors',
       '/motorized-blinds-shades-and-honeycombs',
       '/room-darkening-and-blackout-window-treatments',
       '/child-and-pet-safe-window-treatments',
       '/energy-efficient-window-coverings',
       '/light-filtering-window-treatments-and-uv-protection'

     ]

     const pathnameLength = pathname.length<2

     const ifBlog = blog ? `/blog`:``

     const htmlPath = path.join(__dirname, `../files/${dir}/${ifBlog}${!pathnameLength ?  pathname : host}.html`)


    rp({
    uri: url
    })
    .then(html => {

      fs.writeFileSync(htmlPath, html)
      return html
    })
    .then(html=>{

      //STAGE: CSS SCRAPE AND FILE
      //Scrape for the link tag using cheerio; save as variable
      // check this url to see if it is the home page via pathnameLength
      //IF YES: run the tag link through getCss(), then change the link
      //using changeCssPath()
      //IF NO: just change the css link using changeCssPath

      return html
       // getCss(html)
       // changeCSsPath()

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


const directory = 'www.mrksquincy.com'

basicUrls = [
  'https://www.mrksquincy.com',
  'https://www.mrksquincy.com/about',
  'https://www.mrksquincy.com/blog']
scrapeHtml(basicUrls, directory)

// module.exports = scrapeHtml
