#! /bin/sh
HOST=`uname`
INSTALL="npm install"

if [ "${NPM_REGISTRY}" != "" ]; then
    INSTALL="$INSTALL --registry=${NPM_REGISTRY}"
fi

if [ "${NPM_CACHE}" != "" ]; then
    INSTALL="$INSTALL --cache=${NPM_CACHE}/.npm"
fi

$INSTALL