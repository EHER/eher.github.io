#!/bin/bash

if [ $# -ne 1  ]; then
    echo "usage: $0 \"commit message\""
    exit 1;
fi

git checkout gh-pages

git add -A .
git commit -m "$1"
git push origin gh-pages

git checkout master
