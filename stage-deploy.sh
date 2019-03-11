#!/bin/bash

set -eu

mkdir -p _deploy/site
cp index.html *.js _deploy/site
