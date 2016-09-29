/**
  Created by Joe Orr 08/16

  The leftNav config files are in the format expected by the PROD
  (backbone) component so that this site can maitain compatibility
  with that component. However this format is not suitable for use
  by handlebars templates. In order to build the menu via our
  current process we need this configuration info to be taken out
  and put into a simple json format.

  This script gets the data out of the navigation config files and put in
  a simple json file. In order to do this we need to mock the
  dependencies of the config file (that is, mock the LeftNav component).

 */
(function () {
    'use strict';

     console.log("PROCESSING NAV FILES.\nNODE VERSION = " + JSON.stringify(process.version), '==========================================');

     var requirejs = require('requirejs');
     var fs = require('fs');

     function setFlags(obj, key, value, flagName){
         var setFlag = function(o){
             if (Array.isArray(o)){
                 setFlags(o, key, value, flagName);
             }
             if (o[key] === value){
                 o[flagName] = true;
             }
         };
         obj.forEach(setFlag);
     }
     var paths = {
         'LeftNav' : 'LeftNav',
         'nav' : '../public/javascripts/bcomLeftNav/about/AboutLeftNav'
     };
     requirejs.config({
         paths: paths
     });
     requirejs(['Squire'], function(Squire){
         var injector = new Squire();
         function mockLeftNav (data) {
             this.data = data;
         }
         injector.mock('LeftNav', mockLeftNav
         ).require(['nav'], function(data) {
             // The nav dependency 'LeftNav' has been mocked to
             // use the constructor that we passed in.

             // set up extra properties for handlebars
             var nav = data.data.nav;
             setFlags(nav, 'type', 'header', 'header');

             nav = JSON.stringify(nav);
             nav = '{data:' + nav + '}';
             try {
                 fs.writeFileSync('./.tmp/navdata.js', nav);
                 process.exit(0);
             } catch (e){
                 console.log(e);
             }
         });

     });

}());