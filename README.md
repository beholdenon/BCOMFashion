#Software Installation

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


#Project Setup

1. Clone *BCOMFashion* repo: ```git clone git@code.devops.fds.com:CAP/BCOMFashion.git```

2. In **.env** file, edit ```NODE_ENV=dev```

3. Install node dependencies for the project. In terminal, go to BCOMFashion directory and run ```npm install``` 

4. Start the application: in terminal run ```grunt``` and  it will open automatically the browser; otherwise, check terminal for server address (eg. [http://localhost:3000](http://localhost:3000)).


#Development Workflow

1. DEVELOPER picks up a story, moves story card to In Dev, branch out a unique feature branch from test. Proper nomenclature: FEATURE/{V1 story #} (eg. FEATURE/B-12345).

2. On code complete, DEV pushes the local branch to remote. 
This op triggers [Jenkins Review](http://web-ci.devops.fds.com/jenkins/view/BCOMFashion/view/test/job/BCOM_test_REVIEW/) job (which performs unit-tests and func-tests). 
DEV moves the story card to Ready for Test

3. QA picks up the story and moves it's card to In Test. They checkout the feature branch and run the project locally. 
In case of defects, they open a defect card for DEV to fix.
After a successful validation, QA moves story to Ready for Showcase.

4. DEV prepares the Merge Request for his feature branch into test. *test* branch is used for staging.
This op triggers a [Jenkins Deploy](http://web-ci.devops.fds.com/jenkins/view/BCOMFashion/view/test/job/BCOM_test_DEPLOY/) job. 
In case of a red build, DEV investigates Jenkins logs to determine root cause.
On a successful log, server-side code will be deployed to Heroku and front-end code to NetStorage (location: http://netstorage.bloomingdales.com/netstorage/fashion/dev). 

5. QA and business performs UAT validation at this step. The app can be accessed at http://fashion-test.bloomingdales.com/.
In case of more fixes needed, QA opens defects cards, DEV delivers fixes repeating step #4.
At the conclusion of UAT sign-off, the PM on the story moves the card to Ready for Release

6. DEV cherry-picks his code via Gitlab interface into master. *master* represents the release branch and code moved here is production-ready. 
[Jenkins triggers a Deploy](http://web-ci.devops.fds.com/jenkins/view/BCOMFashion/view/MASTER/job/BCOM_Master_DEPLOY/) job. At completion, server-side code will be deployed to Heroku and front-end code to NetStorage (location: http://netstorage.bloomingdales.com/netstorage/fashion/prod). 
Application can be accessed at http://fashion-preprod.bloomingdales.com/.

*Note: 
For a PROD hotfix, which may be executed directly from the master branch, it is required to move the code (via Gitlab cherry-pick) into the test branch.

![Development Workflow](./tools/workflow.jpg)

#CI-CD Workflow

- Repo in [Gitlab](https://code.devops.fds.com/CAP/BCOMFashion).
- CI [Jenkins](http://web-ci.devops.fds.com/jenkins/view/BCOMFashion/)
- Artifact repo - [Artifactory](http://ci-artifacts.devops.fds.com/macys-release-local/com/macys/BCOMFashion/BCOMFashion/) 
- CD [udeploy](https://udeploy/)
- Platform provider is [Heroku](https://www.heroku.com/). Currently there are 3 environments:
    - Staging:  [fashion-test](https://dashboard.heroku.com/apps/fashion-test)
    - UAT:  [fashion-preprod](https://dashboard.heroku.com/apps/fashion-preprod)
    - Production: [fashion](https://dashboard.heroku.com/apps/fashion)


#Adding New Pages

The body of new pages will usually be created under
``` 
server/lib/views/project-name/name-of-page/index.hbs
```

It is necessary to use the '.hbs' extension in order for
grunt-compile-handlebars to process the page. 

You can use the following handlebars partials:

* title
* leftnav
* breadcrumbs
* titleimage

In order for these to work correctly, you need to add a couple of
pieces of data to the page. Do this by adding a comment at the top, like this:

<!-- {pageTitle:"My Page", pageLabel:"This is a longer title."} -->

When grunt is run, html pages will be generated from the hbs files. 

#Adding New Mobile Pages with grunt createMobile

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
the original file and you want grunt to update the mobile file, delete the mobile file.
The grunt createMobile task will not touch the file if it already exists.

The mobile file will simply be a copy of the regular html file, EXCEPT all
the coremetrics partial (if it exists) will get changed so that the categoryid
and pageid get prepended with 'mbl:'. So, no additional work is necessary
for getting coremetrics mobile to work.

#Coremetrics

In order to add coremetrics data to a page, you need to add the following
handlebars partial to the .hbs file.

```
{{{coremetrics 'lp-xx-xx-xx.philanthropy' 'lp-xx-xx-xx'}}}
```

This will output a tag (after compilation) like the following, which will 
be used by coremetrics.js to initialize a PageView coremetric tag with the right data.

```
<div id="cmdata"  data-pageid="lp-xx-xx-xx.bcrf" data-categoryid="lp-xx-xx-xx"></div>
```

Coremetrics.js also will create an element tag for any element which has a data-cm attribute.

Example of an html element with a data-cm attribute that coremetrics will create an coremetric
element tag for (from store-events-ways-to-shop.index.hbs):

```
<a href="http://www1.bloomingdales.com/media/about/mobile.jsp?cm_sp=ways_to_shop-_-n-_-APP_Learn_More"
   data-cm="ways_to_shop-_-n-_-APP_Learn_More">
```



# Routing

### Deep Links

The page currently at /landing-page/hawaii-ala-moana has deep links implemented via 
Backbone on the client side. For example
```
/landing-page/hawaii-ala-moana/jp
```

displays the page with Japanese text. In order to set up the server so that Backbone
handles the "jp" param, you need to tell the server to ignore this param like so (in index.js):
```
 { 
   method: 'GET',  
   path: '/landing-page/hawaii-ala-moana/{deeplinks?}',          
   config: require('./lib/handlers/views').fallback },
 }
```

The 'fallback' handler will strip out the {deeplinks?} piece and then proceed as usual. 

# Grunt

## Build

Normally you'll run grunt with no task specified. The default grunt tasks does a complete build.

If you haven't changed any scss files, and you don't want to run jshint on every change, you can run

```
grunt qbuild
```

This will skip the compass task (generates css from scss), babel, and jshint. Before committing
though you should definitely run a regular full build with jshint etc.

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

## htmlSnapshot

This task is currently not being used but could be used in a future project. It uses
a headless browser to download a copy of the html of a page to a specified folder.

# Using ES6 in client files

In Webstorm, Files -> Settings -> Languages & Frameworks -> Javascript language version = ECMAScript 6

Create a source file named with a filename extension of ".es6". When you run grunt, this will automatically
be compiled via babel to an ES5 file with the same name + "-compiled.js". 

# Using Foundation Reveal

Reveal is Foundation's modal. See the file personal-shopper-complimentary-service as an example. 
Because the Foundation version used at Macy's doesn't get initialized, we need to pull in a 
separate version, see code in above page. Foundation.min.js contains the Reveal modal. 

In addition, the Foundation reveal css needs to be added to any page using the modal, see above
example.

# Using The Bloomies LeftNav component

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

# Using The Head Helpers
Handlebar helpers have been written in order to insert HTML meta tags such as `<meta>`, `<title>`, and `<canonical>` into the `<head>` section of the page. Without these helpers, these meta tags are inserted within the `<body>` tag, which is not ideal. These helpers are invoked by using HTML comment syntax from within the view you are working on. The 3 helpers are `headMeta`, `headTitle`, and `headCanonical`. They are invoked as follows:

```
<!--headMeta={"name":"description", "content":"There's always a Big Brown Bag within reach! Stop in. Log on. Tap away."}-->
<!--headTitle={"title":"The Makeup Date: Fall 2016 Makeup Tutorials"}-->
<!--headCanonical={"href":"/about-us/new-store-openings/"}-->
```
Will insert the following tags in the `<head>`
```
<meta content="There's always a Big Brown Bag within reach! Stop in. Log on. Tap away." name="description">
<title>The Makeup Date: Fall 2016 Makeup Tutorials</title>
<link rel="canonical" href="http://www.fashion.bloomingdales.com/about-us/new-store-openings/">
```
Note the key-value pairs passed in as arguments to the helper. These are used in the headTags partial.

**NOTE** for headCanonical, you only need to pass the relative URL as an argument (prepended with a forward slash). The helper will prepend the production host name, which is set in PROD_HOST property of the .env file.

**NOTE** the handler will only check the first 20 lines of the file and use a RegEx to see if it contains any of the `<!--head*= -->` helpers.

