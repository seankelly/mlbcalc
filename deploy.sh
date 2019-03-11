#!/bin/bash

set -eu

# Stage needed bits in a deploy directory.
git config user.name "Deployment Bot (from CircleCI)"
git config user.email "deploy@circleci.com"

revision=$(git rev-parse --short=12 HEAD)
remote_url=$(git config remote.origin.url)

git clone --quiet --branch gh-pages $remote_url _deploy/pages
cp _deploy/site/* _deploy/pages

cd _deploy/pages
git add .
if git commit --message "Deploy seankelly/mlbcalc@$revision" ; then
    git push --quiet
fi