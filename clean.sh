#!/bin/sh

( [ ! $1 ] || [ ! -f $1 ] ) && exit 1

SWAPDIR=$HOME/temp/swp
mkdir -p $SWAPDIR
FILE=`basename $1`
cp $1 $SWAPDIR/$FILE
cat $SWAPDIR/$FILE | tr -d "\t" | grep -v "^\ *$"
