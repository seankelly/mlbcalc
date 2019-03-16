#!/bin/bash

set -eu
set -x

mkdir -p _deploy/site
cp index.html *.js _deploy/site
