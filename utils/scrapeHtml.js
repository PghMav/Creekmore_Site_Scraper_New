const cheerio = require('cheerio');
const chalk = require('chalk');
const rp = require('request-promise');
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const theUrl = require('url')
const addCssLinks = require('./addCssLinks.js')
const pathnameLong = require('./pathnameLong.js')



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
       '/upgrade-your-home-office',
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

     if(urlFilter.includes(pathname)){
       return
     }

     const pathnameLength = pathname.length<2

     const ifBlog = blog ? `/blog`:``

     const htmlPath = path.join(__dirname, `../files/${dir}/${ifBlog}${!pathnameLength ?  pathname : host}.html`)


    rp({
    uri: url
    })
    .then(html => {

      let linkTags

      const testForString = pathnameLong(url)
      console.log(chalk.bgRed.cyanBright(url))
      console.log(chalk.bgRed.cyanBright(testForString))
      if( testForString || blog){
        linkTags = `<link rel="stylesheet" href="..css/creekmore.css"/><link rel="stylesheet" href="../css/hunter-douglas.css"/>`

      } else {

        linkTags = `<link rel="stylesheet" href="css/creekmore.css"/><link rel="stylesheet" href="css/hunter-douglas.css"/>`
      }

      const newHtml = addCssLinks(html, linkTags)
      return newHtml


    })
    .then(html=>{
      fs.writeFileSync(htmlPath, html)
    })
    .catch(e=>{

     console.log(chalk.bold.red(`Problem ${chalk.underline(url)}.`, e))
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


// const directory = 'www.mrksquincy.com'
//
// basicUrls = [
//   'https://www.mrksquincy.com',
//   'https://www.mrksquincy.com/about',
//   'https://www.mrksquincy.com/blog',
//   'https://www.mrksquincy.com/energy-efficient-window-coverings',
//   'https://www.mrksquincy.com/hunter-douglas/shutters']

module.exports = scrapeHtml
