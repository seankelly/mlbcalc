#!/bin/bash

GITHUB_TOKEN=$1

set -eu

remote_url="https://seankelly:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
git clone --quiet --branch gh-pages "$remote_url" _deploy/pages

set -x

# Stage needed bits in a deploy directory.
git config --global user.name "Deployment Bot (from GitHub Actions)"
git config --global user.email "seankelly@users.noreply.github.com"

revision=$(git rev-parse --short=12 HEAD)

cp _deploy/site/* _deploy/pages

cd _deploy/pages
git add .
changes=$(git diff --cached --shortstat 2>/dev/null | tail -n 1)
if [[ -n $changes ]]; then
    if git commit --message "Deploy seankelly/mlbcalc@$revision" ; then
        git push --quiet
    else
        echo >&2 "Failed to commit changes."
        exit 1
    fi
else
    echo "No changes to commit."
fi
