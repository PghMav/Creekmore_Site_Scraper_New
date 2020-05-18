const fs = require('fs')
const path = require('path')
const chalk = require('chalk')



const directoryMaker = (directory)=>{
  const mainDirPath = path.join(__dirname, `../files/${directory}`)
  console.log(chalk.bgCyan.yellowBright(`Main directory: ${mainDirPath}`))
  if(fs.existsSync(mainDirPath)){
    console.log(`Directory for ${mainDirPath} already exists`)
    process.exit(0)
  }
  fs.mkdirSync(mainDirPath)
  const directoryBlog = path.join(mainDirPath, '/blog'),
        directoryHDWT = path.join(mainDirPath, '/hunter-douglas-window-treatments'),
        directoryHD = path.join(mainDirPath, '/hunter-douglas'),
        directoryABOUT = path.join(mainDirPath, '/about_us'),
        directoryCSS = path.join(mainDirPath, '/css')

  fs.mkdirSync(directoryBlog)
  fs.mkdirSync(directoryHDWT)
  fs.mkdirSync(directoryHD)
  fs.mkdirSync(directoryCSS)
  fs.mkdirSync(directoryABOUT)
}


module.exports = directoryMaker
