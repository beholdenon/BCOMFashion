##Prerequisite Software Installations
--------------------------------------
1.  [Git Bash](https://git-scm.com/)

2.  [nodeJS 4.4.4](https://nodejs.org/en/download/)
    > during installation, opt for 'Add to PATH', which will expose nodeJS to globally  
    > on completion, open terminal to verify global installation by executing: ```node -v``` ; this should log nodeJS ver

3.  Update npm: in terminal run  ```npm update -g npm```

4.  **Grunt**: in terminal run ```npm install -g grunt-cli```

5.  **Ruby**
    >[WINDOWS] [Ruby Installer 1.9.3-p551](http://rubyinstaller.org/downloads/archives)
    >[macOS] ```brew install ruby``` (if need to install *Homebrew* follow guide here - http://brew.sh/)

6.  **Compass**: in terminal run ```gem update --system ; gem install compass```


##Project Setup
----------------
1. Clone *BCOMFashion* repo: ```git clone git@code.devops.fds.com:CAP/BCOMFashion.git```

2. In **.env** file, edit ```NODE_ENV=dev```

3. Install node dependencies for the project. In terminal, go to BCOMFashion directory and run ```npm install``` 

4. Start the application: in terminal run ```grunt``` and  it will open automatically the browser; otherwise, check terminal for server address (eg. [http://localhost:3000](http://localhost:3000)).


##Development Workflow
----------------------
Develop in a *FEATURE/B-xxxxx* branch. A code push to remote will trigger [Jenkins Review](http://web-ci.devops.fds.com/jenkins/view/BCOMFashion/view/test/job/BCOM_test_REVIEW/) job (incl. unit-tests and func-tests): 

*test* branch is the staging branch. Merge Request from the *FEATURE/B-xxxxx* to *test* will trigger a [Jenkins Deploy](http://web-ci.devops.fds.com/jenkins/view/BCOMFashion/view/test/job/BCOM_test_DEPLOY/) job. At the completion, server-side code will be deployed to Heroku and front-end code to NetStorage (location: http://netstorage.bloomingdales.com/netstorage/fashion/dev). Application can be accessed at http://fashion-test.bloomingdales.com/.   

*master* branch is used for UAT and also represents the release branch. Code will move here only after QA sign-off. Merge Request will trigger a [Jenkins Deploy](http://web-ci.devops.fds.com/jenkins/view/BCOMFashion/view/MASTER/job/BCOM_Master_DEPLOY/) job. At completion, server-side code will be deployed to Heroku and front-end code to NetStorage, in 2 buckets: http://netstorage.bloomingdales.com/netstorage/fashion/QA and http://netstorage.bloomingdales.com/netstorage/fashion/prod. Application can be accessed at http://fashion-preprod.bloomingdales.com/.
At UAT sign-off, an artifact version is provided to RE for production deployment. 


##CI-CD Workflow
-----------------
- Repo in [Gitlab](https://code.devops.fds.com/CAP/BCOMFashion).
- CI [Jenkins](http://web-ci.devops.fds.com/jenkins/view/BCOMFashion/)
- Artifact repo - [Artifactory](http://ci-artifacts.devops.fds.com/macys-release-local/com/macys/BCOMFashion/BCOMFashion/) 
- CD [udeploy](https://udeploy/)
- Platform provider is [Heroku](https://www.heroku.com/). Currently there are 3 environments:
    - Staging:  [fashion-test](https://dashboard.heroku.com/apps/fashion-test)
    - UAT:  [fashion-preprod](https://dashboard.heroku.com/apps/fashion-preprod)
    - Production: [fashion](https://dashboard.heroku.com/apps/fashion)


###Adding New Pages
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

In order to get the Grunt task to process your hbs file, also check to see
if the folder is listed in the 'string-replace:dist' task. If this folder
is not listed, the mobile page will not get 'mbl:' prepended to the 
coremetrics data element.

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

###Using The Bloomies LeftNav component

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

### Using ES6 on client files

In Webstorm, Files -> Settings -> Languages & Frameworks -> Javascript language version = ECMAScript 6

Create a source file named with a filename extension of ".es6". When you run grunt, this will automatically
be compiled via babel to an ES5 file with the same name + "-compiled.js". 

### Using Foundation Reveal

Reveal is Foundation's modal. See the file personal-shopper-complimentary-service as an example. 
Because the Foundation version used at Macy's doesn't get initialized, we need to pull in a 
separate version, see code in above page. Foundation.min.js contains the Reveal modal. 

In addition, the Foundation reveal css needs to be added to any page using the modal, see above
example.