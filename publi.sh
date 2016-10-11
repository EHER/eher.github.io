#!/bin/bash

if [ $# -ne 1  ]; then
    echo "usage: $0 \"commit message\""
    exit 1;
fi

git stash
mv *.html generated
mv *.css generated
mv *.rss generated
git checkout gh-pages

mv generated/* .
rm -rf generated
git add -A .
git commit -m "$1"
git push origin gh-pages

git checkout master
git stash pop
