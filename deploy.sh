#!/bin/bash

set -eu
set -x

# Stage needed bits in a deploy directory.
git config --global user.name "Deployment Bot (from GitHub Actions)"
git config --global user.email "deploy@mlbcalc.github.io"

revision=$(git rev-parse --short=12 HEAD)
remote_url=$(git config remote.origin.url)

git clone --quiet --branch gh-pages $remote_url _deploy/pages
cp _deploy/site/* _deploy/pages

cd _deploy/pages
git add .
changes=$(git diff --cached --shortstat 2>/dev/null | tail -n 1)
if [[ $changes != "" ]]; then
    if git commit --message "Deploy seankelly/mlbcalc@$revision" ; then
        git push --quiet
    else
        echo >&2 "Failed to commit changes."
        exit 1
    fi
else
    echo "No changes to commit."
fi
