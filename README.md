###Pre-requisits 
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


###Project Setup
----------------
1. Clone the *BCOMFashion* repo: git clone http://wdsgerrict:8080/p/BCOMFashion.git

2. Install node dependencies by running ```npm install``` in the BCOMFashion directory

3. To test/develop locally, edit **.env** file variables as follows:
	- ENV=dev
	- NODE_ENV=dev
> When pushing code to a remote branch make sure you change back these variables to **production**

4. Run the node server: ```grunt``` and it will open the app in your default browser.