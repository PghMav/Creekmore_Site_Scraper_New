const fs = require('fs')
const chalk = require('chalk')
const cheerio = require('cheerio')

const addCssLinks = (theHtml, linkString) =>{
  const html = theHtml.toString()
  //console.log(chalk.cyan(html))
  const stringHead = '</head>'

  const findHeadEnd = html.lastIndexOf(stringHead)

  const frontHalf = html.slice(0, findHeadEnd)
  const backHalf = html.slice(findHeadEnd, html.length)

  return frontHalf + linkString + backHalf
  //  console.log(chalk.magenta(html.length))

}

module.exports = addCssLinks
