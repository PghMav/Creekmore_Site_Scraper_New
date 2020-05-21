const chalk = require('chalk')
const theUrl = require('url')

const filterUrls = (urlArray)=>{

  let filteredArray = []

  const urlFilter = [
    '/hunter-douglas-window-treatments/duette',
    '/hunter-douglas/sheers-shadings',
    '/hunter-douglas/roman-shades',
    '/hunter-douglas/roller-shades-solar-shades',
    '/hunter-douglas/woven-woods',
    '/hunter-douglas/shutters',
    '/hunter-douglas/vertical-blinds',
    '/hunter-douglas/wood-metal-blinds',
    '/hunter-douglas-window-treatments/design-studio-side-panels-drapery',
    '/hunter-douglas-powerview-motorization',
    '/new-hunter-douglas-window-treatments-and-options',
    '/hunter-douglas-videos',
    '/decorating-with-green-home-accents',
    '/decorating-with-bookshelves',
    '/upgrade-your-home-office',
    '/fresh-design-ideas-for-your-home',
    '/window-treatments-for-bathrooms',
    '/window-treatments-for-bedrooms',
    '/window-treatments-for-home-offices',
    '/window-treatments-for-kitchens',
    '/window-treatments-for-living-rooms',
    '/window-treatments-for-media-rooms',
    '/window-treatments-for-nursery-and-childrens-rooms',
    '/window-treatments-for-angled-windows',
    '/window-treatments-for-arched-windows',
    '/window-treatments-for-bay-and-corner-windows',
    '/window-treatments-for-french-doors',
    '/sidelight-window-blinds-and-shades',
    '/window-treatments-for-skylights',
    '/window-treatments-for-patio-doors-and-sliding-glass-doors',
    '/motorized-blinds-shades-and-honeycombs',
    '/room-darkening-and-blackout-window-treatments',
    '/child-and-pet-safe-window-treatments',
    '/energy-efficient-window-coverings',
    '/light-filtering-window-treatments-and-uv-protection'
  ]

  for(const url of urlArray){

    const {
     protocol,
     slashes,
     host,
     query,
     href,
     pathname
   } = theUrl.parse(url);

    if(!urlFilter.includes(pathname)){
      filteredArray.push(url)
    }
  }



  return filteredArray
}

// basicUrls = [
//   'https://www.mrksquincy.com',
//   'https://www.mrksquincy.com/about',
//   'https://www.mrksquincy.com/blog',
//   'https://www.mrksquincy.com/window-treatments-for-angled-windows',
//   'https://www.mrksquincy.com/sidelight-window-blinds-and-shades',
//   'https://www.mrksquincy.com/room-darkening-and-blackout-window-treatments',
//
// ]
//
// filterUrls(basicUrls)

module.exports = filterUrls
