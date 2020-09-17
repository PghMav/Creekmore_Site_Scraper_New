const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const copyFile = require('fs-copy-file')




const directoryMaker = (directory)=>{

  const mainDirPath = path.join(__dirname, `../files/${directory}`)


  console.log(chalk.bgCyan.whiteBright(`NEW DIRECTORY CREATED:
${mainDirPath}
`))

  if(fs.existsSync(mainDirPath)){
    console.log(chalk.bgRed.white.bold(`Directory for ${mainDirPath} already exists; overwriting may occur.`))
    process.exit(0)
  }
  fs.mkdirSync(mainDirPath)

  // Directory paths for HTML
  const directoryHtml = path.join(mainDirPath, "/html"),
        directoryBlog = path.join(directoryHtml, "/blog"),
        directoryHDWT = path.join(directoryHtml,"/hunter-douglas-window-treatments"),
        directoryHD = path.join(directoryHtml, "/hunter-douglas"),
        directorySHEERS_SHADINGS = path.join(directoryHD, "/sheers-shadings"),
        directoryROMAN_SHADES = path.join(directoryHD, "/roman-shades"),
        directoryROLLERS_SOLAR = path.join(directoryHD,"/roller-shades-solar-shades"),
        directorySHUTTERS = path.join(directoryHD, "/shutters"),
        directoryVERTICAL_BLINDS = path.join(directoryHD, "/vertical-blinds"),
        directoryWOOD_METAL_BLINDS = path.join(directoryHD, "/wood-metal-blinds"),
        directorySIDE_PANELS = path.join(directoryHD, "/side-panels-drapery"),
        directoryCELLULAR_HONEYCOMB_SHADES = path.join(directoryHD, "/cellular-honeycomb-shades"),
        directoryFEATURED = path.join(directoryHD, "/featured"),
        directoryMP = path.join(directoryHtml, "/more-products-services"),
        directorySERVICES = path.join(directoryMP, "/services"),
        directoryPRODUCTS = path.join(directoryMP, "/products"),
        directoryABOUT = path.join(directoryHtml, "/about_us"),
        directoryINSPIRATION = path.join(directoryHtml, "/inspiration-solutions"),
        directoryFUNCTION = path.join(directoryINSPIRATION, "/function"),
        directoryDESIGN = path.join(directoryINSPIRATION, "/design"),
        directoryROOM = path.join(directoryINSPIRATION, "/room"),
        directorySHAPE = path.join(directoryINSPIRATION, "/shape"),
        directoryWOVENWOODS = path.join(directoryHD, "woven-woods"),
        directoryCSS = path.join(directoryHtml, "/css"),
        pathCSS = path.join(__dirname, `../css/new-css`),
        directoryLogs = path.join(mainDirPath, "/logs");
        
  //Directory paths for SCREENSHOTS
  const pathScreenShots = path.join(mainDirPath, "/screenshots"),
    pathScreenShotsHD = path.join(pathScreenShots, "/hunter-douglas"),
    pathScreenShotsSHEERS_SHADINGS = path.join(pathScreenShotsHD, "/sheers-shadings"),
    pathScreenShotsHDWT = path.join(pathScreenShots,"/hunter-douglas-window-treatments"),
    pathScreenShotsABOUT = path.join(pathScreenShots, "/about-us"),
    pathScreenShotBLOG = path.join(pathScreenShots, "/blog"),
    pathScreenShotsROMAN_SHADES = path.join(pathScreenShotsHD, "/roman-shades"),
    pathScreenShotsROLLERS_SOLAR = path.join(pathScreenShotsHD, "/roller-shades-solar-shades"),
    pathScreenShotsSHUTTERS = path.join(pathScreenShotsHD, "/shutters"),
    pathScreenShotsVERTICAL_BLINDS = path.join(pathScreenShotsHD, "/vertical-blinds"),
    pathScreenShotsWOOD_METAL_BLINDS = path.join(pathScreenShotsHD, "/wood-metal-blinds"),
    pathScreenShotsSIDE_PANELS = path.join(pathScreenShotsHD, "/side-panels-drapery"),
    pathScreenShotsCELLULAR_HONEYCOMB_SHADES = path.join(pathScreenShotsHD, "/cellular-honeycomb-shades"),
    pathScreenShotsWOVENWOODS = path.join(pathScreenShotsHD, "woven-woods"),
    pathScreenShotsFEATURED = path.join(pathScreenShotsHD, "/featured"),
    pathScreenShotsMP = path.join(pathScreenShots, "/more-products-services"),
    pathScreenShotsSERVICES = path.join(pathScreenShotsMP, "/services"),
    pathScreenShotsPRODUCTS = path.join(pathScreenShotsMP, "/products"),
    pathScreenShotsINSPIRATION = path.join(pathScreenShots, "/inspiration-solutions"),
    pathScreenShotsFUNCTION = path.join(pathScreenShotsINSPIRATION, "/function"),
    pathScreenShotsDESIGN = path.join(pathScreenShotsINSPIRATION, "/design"),
    pathScreenShotsROOM = path.join(pathScreenShotsINSPIRATION, "/room"),
    pathScreenShotsSHAPE = path.join(pathScreenShotsINSPIRATION, "/shape");

    // making directories for the HTML
  fs.mkdirSync(directoryHtml)
  fs.mkdirSync(directoryBlog)
  fs.mkdirSync(directoryHDWT)
  fs.mkdirSync(directoryHD)
  fs.mkdirSync(directoryCSS)
  fs.mkdirSync(directoryABOUT)
  fs.mkdirSync(directoryLogs)
  fs.mkdirSync(directoryINSPIRATION)
  fs.mkdirSync(directoryFUNCTION);
  fs.mkdirSync(directoryDESIGN);
  fs.mkdirSync(directoryWOVENWOODS);
  fs.mkdirSync(directorySHEERS_SHADINGS)
  fs.mkdirSync(directoryROMAN_SHADES)
  fs.mkdirSync(directoryROLLERS_SOLAR)
  fs.mkdirSync(directoryCELLULAR_HONEYCOMB_SHADES)
  fs.mkdirSync(directorySHUTTERS)
  fs.mkdirSync(directoryVERTICAL_BLINDS)
  fs.mkdirSync(directoryWOOD_METAL_BLINDS)
  fs.mkdirSync(directorySIDE_PANELS)
  fs.mkdirSync(directoryFEATURED)
  fs.mkdirSync(directoryMP)
  fs.mkdirSync(directorySERVICES)
  fs.mkdirSync(directoryPRODUCTS)
  fs.mkdirSync(directoryROOM)
  fs.mkdirSync(directorySHAPE)
  
  // making directories for the SCREENSHOTS
  fs.mkdirSync(pathScreenShots);
  fs.mkdirSync(pathScreenShotsHD)
  fs.mkdirSync(pathScreenShotsHDWT);
  fs.mkdirSync(pathScreenShotBLOG);
  fs.mkdirSync(pathScreenShotsSHEERS_SHADINGS)
  fs.mkdirSync(pathScreenShotsROMAN_SHADES)
  fs.mkdirSync(pathScreenShotsROLLERS_SOLAR)
  fs.mkdirSync(pathScreenShotsSHUTTERS)
  fs.mkdirSync(pathScreenShotsVERTICAL_BLINDS)
  fs.mkdirSync(pathScreenShotsWOOD_METAL_BLINDS)
  fs.mkdirSync(pathScreenShotsSIDE_PANELS)
  fs.mkdirSync(pathScreenShotsCELLULAR_HONEYCOMB_SHADES)
  fs.mkdirSync(pathScreenShotsWOVENWOODS)
  fs.mkdirSync(pathScreenShotsFEATURED)
  fs.mkdirSync(pathScreenShotsMP)
  fs.mkdirSync(pathScreenShotsSERVICES)
  fs.mkdirSync(pathScreenShotsPRODUCTS)
  fs.mkdirSync(pathScreenShotsABOUT)
  fs.mkdirSync(pathScreenShotsINSPIRATION)
  fs.mkdirSync(pathScreenShotsFUNCTION)
  fs.mkdirSync(pathScreenShotsDESIGN)
  fs.mkdirSync(pathScreenShotsROOM)
  fs.mkdirSync(pathScreenShotsSHAPE)

  copyFile(
    `${pathCSS}/hd-1-dependencies.min.css`,
    `${directoryCSS}/hd-1-dependencies.min`,
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  copyFile(`${pathCSS}/hd-2-site.min.css`, `${directoryCSS}/hd-2-site.min.css`, (err)=>{
    if(err){
      throw err
    }
    })

    copyFile(
      `${pathCSS}/hd-3-base.min.css`,
      `${directoryCSS}/hd-3-base.min.css`,
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

}


module.exports = directoryMaker
