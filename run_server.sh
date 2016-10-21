#!/bin/bash

start cmd /c"bundler exec jekyll server --watch"

# wait for server to start
while ! curl http://localhost:4000/ &>/dev/null; do sleep 1; done

# open the homepage
explorer http://localhost:4000/
