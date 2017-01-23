#!/bin/bash

git submodule update --init

mkdir -p js
cp -f _libs/fontfaceobserver/fontfaceobserver.js js/.
cp -f _libs/twitterApi/js/twitterFetcher.js js/.

mkdir -p fonts
cp -f \
	_libs/fira/*/FiraSans-Light{,Italic}.* \
	_libs/fira/*/FiraSans-Medium{,Italic}.* \
	_libs/fira/*/FiraSans-Regular.* \
	_libs/fira/*/FiraSans-SemiBold{,Italic}.* \
	_libs/fira/*/FiraSans-Bold{,Italic}.* \
	_libs/fira/*/FiraSans-ExtraBold{,Italic}.* \
		fonts/.

