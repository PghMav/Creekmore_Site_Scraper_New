const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const copyFile = require('fs-copy-file')




const directoryMaker = (directory)=>{
  const mainDirPath = path.join(__dirname, `../files/${directory}`)

  console.log(chalk.bgCyan.yellowBright(`Directory Maker: ${mainDirPath}`))

  if(fs.existsSync(mainDirPath)){
    console.log(`Directory for ${mainDirPath} already exists`)
    process.exit(0)
  }
  fs.mkdirSync(mainDirPath)

  const directoryHtml = path.join(mainDirPath, '/html'),
        directoryBlog = path.join(directoryHtml, '/blog'),
        directoryHDWT = path.join(directoryHtml, '/hunter-douglas-window-treatments'),
        directoryHD = path.join(directoryHtml, '/hunter-douglas'),
        directoryABOUT = path.join(directoryHtml, '/about_us'),
        directoryCSS = path.join(directoryHtml, '/css'),
        pathCSS = path.join(__dirname, `../css`),
        pathScreenShots = path.join(mainDirPath, '/screenshots'),
        pathScreenShotsHDWT = path.join(pathScreenShots, '/hunter-douglas-window-treatments'),
        pathScreenShotsHD = path.join(pathScreenShots, '/hunter-douglas'),
        pathScreenShotABOUT = path.join(pathScreenShots, '/about-us'),
        pathScreenShotBLOG = path.join(pathScreenShots, '/blog')

  fs.mkdirSync(directoryHtml)
  fs.mkdirSync(directoryBlog)
  fs.mkdirSync(directoryHDWT)
  fs.mkdirSync(directoryHD)
  fs.mkdirSync(directoryCSS)
  fs.mkdirSync(directoryABOUT)
  fs.mkdirSync(pathScreenShots)
  fs.mkdirSync(pathScreenShotsHDWT)
  fs.mkdirSync(pathScreenShotsHD)
  fs.mkdirSync(pathScreenShotABOUT)
  fs.mkdirSync(pathScreenShotBLOG)

  copyFile(`${pathCSS}/creekmore.css`, `${directoryCSS}/creekmore.css`, (err)=>{
    if(err){
      throw err
    }
  })
  copyFile(`${pathCSS}/hunter-douglas.css`, `${directoryCSS}/hunter-douglas.css`, (err)=>{
    if(err){
      throw err
    }
    })

}

// directoryMaker('www.mrksquincy.com')

module.exports = directoryMaker
