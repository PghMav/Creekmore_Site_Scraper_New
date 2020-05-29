const getAllUrlsFromXml = require('./getAllUrlsFromXml')
const getAllUrlsFromHtml = require('./getAllUrlsFromHtml')


const scrapeSitemap = async (baseUrl, type) => {

  const sitemapXML = baseUrl + '/sitemap.xml'
  const sitemapHTML = baseUrl + '/sitemap'


      switch(type){
        case 'XML':
        console.log(`getting urls from xml sitemap ...`)
        return await getAllUrlsFromXml(sitemapXML,
        (data,err)=>{
          if(data){
            //console.log(`heres some xml sample data: ${data[3]}`)
            return data
          }else{
            return err
          }
        })
        case 'HTML':
        console.log(`getting urls from html sitemap ...`)
        return  getAllUrlsFromHtml(baseUrl, sitemapHTML, (data,err)=>{
          if(data){
            //console.log(`heres some html sample data: ${data[3]}`)
            return data
          } else {
            return err
          }
        })
        //console.log(getEm)
        return getEm
        default:
        return (console.log(`Enter valid type into scrapeSitemap.js`))
      }



}

module.exports = scrapeSitemap

//
// const baseMap = `https://www.allaboutblindsetc.com/sitemap.xml`
// scrapeSitemap(baseMap, 'XML')
//
// const baseMap2 = `https://www.allaboutblindsetc.com/sitemap`
// scrapeSitemap(baseMap2, 'HTML')
