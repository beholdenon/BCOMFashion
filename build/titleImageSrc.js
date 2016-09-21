const _ = require('lodash');
/**
 * Get the HTML for the title image.
 * This is a helper for a handlebar template
 * @param nav: the menu data
 * @param pageId:
 */
function titleImage(pageTitle){

   pageTitle = pageTitle.replace(/\s/g, '%20');
   var options = {
      bgc: '255,255,255',
      fmt: 'png',
      textAttr: 144,
      layer: 'comp',
      extend: '0,-4,0,-13',
      textPs: '\\{{%5Cfonttbl{%5Cf0%20Champion%20Bantamweight%3B}}{%5Ccolortbl%20%3B%5Cred51%5Cgreen51%5Cblue51%3B}%5Cf0%5Cfs38%5Ccf1%5Cexpnd3%5Ccaps%20' + pageTitle + '}'
   };
   var url = 'http://images.bloomingdales.com/is/image/BLM?';
   var path = '';
   Object.keys(options).forEach(function(k){path = path + '&' + k + '=' + options[k]});
   return url + path.substring(1);

}
module.exports =  titleImage;