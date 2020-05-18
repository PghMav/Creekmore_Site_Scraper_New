const chalk = require('chalk')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const getCss = (someHtml)=>{

    const $ = cheerio.load(someHtml);
    const cssLink = $('link[rel="stylesheet"]')
    console.log(cssLink)
  }
