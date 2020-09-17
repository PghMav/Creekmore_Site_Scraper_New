const chalk = require('chalk')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const _ = require('lodash')

const getAllUrlsFromHtml = async (baseUrl, sitemap,  callback)=>{

  // const allHrefs = $('div.row.html-site-map.ng-scope > ul > a:nth-last-child()')
  // const locKeys = _.keys(allHrefs)
 const urlList = []



  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.setDefaultTimeout(60000)
  await page.goto(sitemap)
  await page.waitForSelector('a[href="/hunter-douglas/roller-shades-solar-shades/designer-roller"]')

  await page.content()
      .then(html =>{

    const $ = cheerio.load(html)
    const theDiv = $(`li > a`)


    return theDiv
    }).then(res=>{

      const theKeys = _.keys(res)

      for(const key of theKeys){

        let instance = res[key]


        if(instance.name === 'a'){
          const regex = /tel:/


          const theHref = instance.attribs.href
          const ifTel = regex.test(theHref)

          if(theHref !== undefined && theHref !== '#' && !ifTel){
              urlList.push(baseUrl + theHref)
          }

        }

      }

  })
      .catch(e=>{
        return callback(undefined, `Error in getting HTML list: ${e}`)
      })


   await browser.close()

  //console.log(urlList)
   return callback(urlList, undefined)

}

// getAllUrlsFromHtml(`https://www.allaboutblindsetc.com/sitemap`)

module.exports = getAllUrlsFromHtml
