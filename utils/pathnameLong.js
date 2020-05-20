const chalk = require('chalk')

const pathnameLong = (pathname) => {

  const hdString1 = '/hunter-douglas/'
  const hdString2 = '/hunter-douglas-window-treatments/'


    const test1 = pathname.indexOf(hdString1)
    const test2 = pathname.indexOf(hdString2)

    if(test1 === -1 && test2 === -1){
    // if the url fails both, it means the strings are NOT there.
      return false

    } else {
      console.log(chalk.green(true))
      return true
    }


}


module.exports = pathnameLong
