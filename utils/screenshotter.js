const Nightmare = require('nightmare')
const vo = require('vo');
const URL = require('url')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')


const screenShotter = (urlArray, host, blog) => {

    let resourceCount = 0;
    console.log(`screen shotter is working...`);

    const writeFile = (path, data, opts = 'utf8') =>
    new Promise((resolve, reject) => {
        fs.writeFile(path, data, opts, (err) => {
            if (err) reject(err);
            else resolve();
        })
    });

    function run(url) {
        return new Promise((resolveURL, rejectURL) => {
            const {
                protocol,
                slashes,
                host,
                query,
                href,
                pathname
            } = URL.parse(url);

            //const urlPosition = urlArray.indexOf(url);
            const pathnameLength = pathname.length < 2;

            const ifBlog = blog ? `/blog`:``

            const imageBox = path.join(__dirname, `../files/${host}/${ifBlog}${!pathnameLength ?  pathname : host}.png`);

            //console.log(imageBox);
            console.log(`Processing ${url}`);

            var nightmare = new Nightmare({
                show: false,
                width: 1024,
                height: 768,
                enableLargerThanScreen: true
            });

            nightmare.goto(url)
                .wait('body')
                .evaluate(() => {
                    var body = document.querySelector('body');
                    return {
                        height: body.scrollHeight,
                        width:body.scrollWidth
                    }
                })
                .then(dimensions => {
                    nightmare.viewport(dimensions.width, dimensions.height)
                  })
                        .screenshot()
                        .then( buffer => {
                            writeFile(imageBox, buffer).finally(data => {
                                //console.log(chalk.bgCyan.red(`New .png file saved!`));
                                //console.log(chalk.bgCyan.red(`Did that thing`))

                                resourceCount++;
                                nightmare.end().then(() => {
                                    resolveURL(chalk.bold.magenta(imageBox));
                                });
                            });
                        })
                        .catch( e => {
                            rejectURL(chalk.underline.red(`Something smells borken: ${e}`));
                        });
                });



        });


    let promiseArray = [];
    urlArray.forEach( url =>
    //BEGIN ADD URL FILTER
    // const urlFilter = [
    //   '/hunter-douglas-window-treatments/duette',
    //   '/hunter-douglas/sheers-shadings',
    //   '/hunter-douglas/roman-shades',
    //   '/hunter-douglas/roller-shades-solar-shades',
    //   '/hunter-douglas/woven-woods',
    //   '/hunter-douglas/shutters',
    //   '/hunter-douglas/vertical-blinds',
    //   '/hunter-douglas/wood-metal-blinds',
    //   '/hunter-douglas-window-treatments/design-studio-side-panels-drapery',
    //   '/hunter-douglas-powerview-motorization',
    //   '/new-hunter-douglas-window-treatments-and-options',
    //   '/hunter-douglas-videos',
    //   '/decorating-with-green-home-accents',
    //   '/decorating-with-bookshelves',
    //   '/upgrade-your-home-office',
    //   '/fresh-design-ideas-for-your-home',
    //   '/window-treatments-for-bathrooms',
    //   '/window-treatments-for-bedrooms',
    //   '/window-treatments-for-home-offices',
    //   '/window-treatments-for-kitchens',
    //   '/window-treatments-for-living-rooms',
    //   '/window-treatments-for-media-rooms',
    //   '/window-treatments-for-nursery-and-childrens-rooms',
    //   '/window-treatments-for-angled-windows',
    //   '/window-treatments-for-arched-windows',
    //   '/window-treatments-for-bay-and-corner-windows',
    //   '/window-treatments-for-french-doors',
    //   '/sidelight-window-blinds-and-shades',
    //   '/window-treatments-for-skylights',
    //   '/window-treatments-for-patio-doors-and-sliding-glass-doors',
    //   '/motorized-blinds-shades-and-honeycombs',
    //   '/room-darkening-and-blackout-window-treatments',
    //   '/child-and-pet-safe-window-treatments',
    //   '/energy-efficient-window-coverings',
    //   '/light-filtering-window-treatments-and-uv-protection'
    // ]
    //
    // if(urlFilter.includes(pathname)){
    //   return
    // }
    //END URL FILTER




   promiseArray.push(run(url)) );
    Promise.all(promiseArray).then(values => {
        values.forEach( msg => console.log(msg) );
    });



    process.on('exit', () => {


        console.log(chalk.bold.yellow(
            `
          **************************


          Total: ${resourceCount} pages in ${stopIt} seconds


          **************************`));
    });

}

basicUrls = [
  'https://www.mrksquincy.com',
  'https://www.mrksquincy.com/about',
  'https://www.mrksquincy.com/blog']
screenShotter(basicUrls)

// module.exports = screenShotter
