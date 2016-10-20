#!/bin/bash

start cmd /c"bundler exec jekyll server --watch"

sleep 1

explorer http://localhost:4000/
