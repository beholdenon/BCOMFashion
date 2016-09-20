###Pre-requisits 
----------------
1. Install **Git Bash** - https://git-scm.com/

2. Install **NodeJS** - https://nodejs.org/en/download/ 
> verify node installed correctly by running: ```node -v``` and it will log the version number)

3. Update npm: ```npm update -g npm```

4. Install **Grunt**: ```npm install -g grunt-cli```

5. Install **Ruby** via *Ruby Installer* - http://rubyinstaller.org/

6. Install **Compass**: ```gem install compass```


###Project Setup
----------------
1. Clone *BCOMFashion* app: ```git clone git@code.devops.fds.com:CAP/BCOMFashion.git```

2. Install node dependencies running ```npm install``` inside the BCOMFashion directory

3. To develop/test locally, inside the **.env** file edit **NODE_ENV=dev**
> Required: When pushing code to the repo, change back **NODE_ENV=production**

4. Start the application: ```grunt``` and access it in the browser ```http://localhost:3000```.
