##Pre-requisites
----------------
1. Install **Git Bash** - https://git-scm.com/

2. Install **Python 2.7.10** - https://www.python.org/downloads/release/python-2710/
> during installation opt for: CUSTOMIZE PYTHON -> ADD PYTHON.EXE TO PATH -> Will be installed on local hardrive

3. Install **NodeJS** - https://nodejs.org/en/download/ 
> verify node installed correctly by running: ```node -v``` and it will log the version number)

4. Update npm by running: ```npm update -g npm```

5. Install **Grunt** by running: ```npm install -g grunt-cli```

6. Install **Ruby** using the *Ruby Installer* - http://rubyinstaller.org/

6. Install **Compass** by running: ```gem install compass```


##Project Setup
----------------
1. Clone the *BCOMFashion* repo: git clone http://wdsgerrit:8080/p/BCOMFashion.git

2. Install node dependencies by running ```npm install``` in the BCOMFashion directory

3. To test/develop locally, edit **.env** file variables as follows:
	- ENV=dev
	- NODE_ENV=dev
> When pushing code to a remote branch make sure you change back these variables to **production**

4. Run the node server: ```grunt``` and it will open the app in your default browser.

##Adding New Pages
-------------------
The body of new pages will usually be created under
``` server/lib/view/name-of-page/index.hbs```

You can use the following handlebars partials:

* title
* leftnav
* breadcrumbs
* titleimage

In order for these to work correctly, you need to add a couple of
pieces of data to the page. Do this by adding a comment at the top, like this:

<!-- {pageTitle:"My Page", pageLabel:"This is a longer title."} -->

When grunt is run, html pages will be generated from the hbs files. 

##Adding New Mobile Pages with grunt createMobile

For all files with an .hbs extension, the grunt "createMobile" task checks to
see if there is a file with the same name + "-mobile". If there isn't,
it creates this file by copying the original file. It also adjust the coremetrics
tag in the mobile file. 

Example: 

original file: "foo.hbs"
new file: "foo-mobile.hbs"

In the above case, if foo-mobile already exists, grunt createMobile will do nothing. 
This is so that on a case by case basis you can have files for mobile that are either
just copies of the original or are hand customized. If you have changed
the original file and you want grunt to update the mobile file, delete it.
The grunt createMobile task will not touch the file if it already exists.

###Coremetrics

In order to add coremetrics data to a page, you need to add the following
handlebars partial to the .hbs file.

```
{{{coremetrics 'lp-xx-xx-xx.philanthropy' 'lp-xx-xx-xx'}}}
```

This will output a tag (after compilation) like the following, which will 
be used by coremetrics.js to initialize with the right data.

```
<div id="cmdata"  data-pageid="lp-xx-xx-xx.bcrf" data-categoryid="lp-xx-xx-xx"></div>
```

## Generating sprite files for projects

You can tell grunt to create a sprite file containing all of the images in a particular
folder. First, update the grunt 'sprite' task with the folder information. Then run

```
grunt projectSprites
```

This will generate the files 'project-sprites.png' and 'project-sprites.css'. See
the mobile-app project for an example.

## Checking links in files

The grunt task "checkPages" can be used to check that all links in a given
page or path are valid links. Add files or paths to the pageUrls array
in the checkPages task in gruntfile.js to let the task know which 
pages to check.

## Using ES6 in client files

In Webstorm, Files -> Settings -> Languages & Frameworks -> Javascript language version = ECMAScript 6

Create a source file named with a filename extension of ".es6". When you run grunt, this will automatically
be compiled via babel to an ES5 file with the same name + "-compiled.js". 

## Using Foundation Reveal

Reveal is Foundation's modal. See the file personal-shopper-complimentary-service as an example. 
Because the Foundation version used at Macy's doesn't get initialized, we need to pull in a 
separate version, see code in above page. Foundation.min.js contains the Reveal modal. 

In addition, the Foundation reveal css needs to be added to any page using the modal, see above
example.

##Using The Bloomies LeftNav component
-----------------------------

This project currently does NOT use the MacysUI LeftNav component. However,
it does use config files that are compatible with single level menus using
that component. If you are using a single level component, you can switch
to using the MacyUI component following the steps below.

In order to use the MacysUI LeftNav component, add the following to the 
paths object in main.js:
```
   'LeftNav' : '//www.bloomingdales.com/js/min/bcom/components/leftNav/LeftNav',
   'iShip' : '//assets.bloomingdales.com/js/min/common/components/iShip',
   'nav' : 'includes/nav-compiled'
```

The first is a pointer to the LeftNav component on PROD. The second is a dependency of 
that component. The third is a file that loads the LeftNav component on to a page 
at the appropriate place.

The third item ("nav") needs to be then be added to the define function in main.js, like this:

```
define([
    'backbone',
    'jquery',
    'underscore',
    'desktopHeader',
    'mobileHeader',
    'coremetrics',
    'nav'
], function(Backbone, $, _, DesktopHeader, MobileHeader, Coremetrics, nav) {

```

And, it also needs to run the drawMenus method on startup:

```
    $(document).ready(
        function(){
            nav.drawMenus();
            Coremetrics.initCoreMetrics();
        }
    );
```   