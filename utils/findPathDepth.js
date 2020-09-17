const theUrl = require('url')



const findPathDepth = (url) => {
    const {
    //    protocol,
    //    slashes,
    //    host,
    //    query,
    //    href,
     pathname
    } = theUrl.parse(url);
    console.log(pathname)

    const dotSlash = "../";
    const pathDepth = pathname.split("/").length - 2
    console.log(pathDepth)

    switch (pathDepth) {
      case 1:
        console.log(`switch 1`)
        return `${dotSlash}`;
      case 2:
        return`${dotSlash}${dotSlash}`;
      case 3:
        return`${dotSlash}${dotSlash}${dotSlash}`;
      case 4:
        return `${dotSlash}${dotSlash}${dotSlash}`;
      default:
        return "";
        
    }

    //must return slotdash

    
}

module.exports = findPathDepth;