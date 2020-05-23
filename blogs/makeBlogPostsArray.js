const getAllBlogPostUrls = require('./getAllBlogPostUrls.js')
const chalk = require('chalk')

const makeBlogPostsArray = async (host)=>{

  const blogArchivePages = [
    `${host}/blog`,
    `${host}/blog-2019`,
    `${host}/blog-2018`,
    `${host}/blog-2017`,
    `${host}/blog-2016`,
    `${host}/blog-2015`
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

  return archiveArray

}



module.exports = makeBlogPostsArray
