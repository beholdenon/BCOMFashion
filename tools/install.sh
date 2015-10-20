#! /bin/sh
HOST=`uname`
NOW=`date`
if [ "$HOST" = "Linux" ] ; then
   mkdir node_modules
   cp -r tools/modules/* node_modules/
   npm install --registry=${NPM_REGISTRY}
else
   npm install
fi
echo $NOW
date