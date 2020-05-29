const getAllBlogPostUrls = require('./getAllBlogPostUrls.js')
const chalk = require('chalk')

const makeBlogPostsArray = async (host)=>{

  console.log(`getting urls from blog archives ...`)

  const blogArchivePages = [
    `${host}/blog`,
    `${host}/blog-2019`,
    `${host}/blog-2018`,
    `${host}/blog-2017`,
    `${host}/blog-2016`,
    `${host}/blog-2015`,
    `${host}/blog-2014`,
    `${host}/blog-2013`
  ]
  let archiveArray = []

  for (const archivePage of blogArchivePages){

    console.log(chalk.yellow(`Checking ${archivePage} for posts ...`))
    const postUrls = await getAllBlogPostUrls(archivePage)

    if(postUrls !== undefined){

    const newArray = archiveArray.concat(postUrls)
    archiveArray = newArray

  }
  }
  console.log(chalk.bgCyan.whiteBright(`TOTAL BLOG POSTS ON SITE:
${archiveArray.length}`))
  return archiveArray

}



module.exports = makeBlogPostsArray
