const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const copyFile = require('fs-copy-file')



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
        directoryCSS = path.join(mainDirPath, '/css'),
        pathCSS = path.join(__dirname, `../css`),
        pathScreenShots = path.join(mainDirPath, '/screenshots'),
        pathScreenShotsHDWT = path.join(pathScreenShots, '/hunter-douglas-window-treatments'),
        pathScreenShotsHD = path.join(pathScreenShots, '/hunter-douglas'),
        pathScreenShotABOUT = path.join(pathScreenShots, '/about-us'),
        pathScreenShotBLOG = path.join(pathScreenShots, '/blog')

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

// directoryMaker('test')

module.exports = directoryMaker
