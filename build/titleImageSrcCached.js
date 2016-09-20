const download = require('download-file')
const _ = require('lodash');
/**
 * Get the image file and create the html for the title image.
 * This is a helper for a handlebar template
 * @param nav: the menu data
 * @param pageId:
 */
function titleImageSrcCached(pageTitle){

   var filename = _.kebabCase(pageTitle) + '.png';
   pageTitle = pageTitle.replace(/\s/g, '%20');

   var options = {
      bgc: '255,255,255',
      fmt: 'png',
      textAttr: 144,
      layer: 'comp',
      extend: '0,-4,0,-13',
      textPs: '{{%5Cfonttbl{%5Cf0%20Champion%20Bantamweight%3B}}{%5Ccolortbl%20%3B%5Cred51%5Cgreen51%5Cblue51%3B}%5Cf0%5Cfs38%5Ccf1%5Cexpnd3%5Ccaps%20' + pageTitle + '}'
   };

   var url = 'http://images.bloomingdales.com/is/image/BLM?';
   var path = '';
   Object.keys(options).forEach(function (k) {
      path = path + '&' + k + '=' + options[k]
   });

   url = url + path.substring(1).replace(/\//g, '');
   var options = {
      directory: "public/images/titles/",
      filename: filename
   };

   download(url, options, function (err) {
      if (err) {
         console.log("Can't download: ", err, foo);
         //  throw err;
      }
   });

   return "/fashion/images/titles/" + filename;

}
module.exports =  titleImageSrcCached;