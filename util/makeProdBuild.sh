#!/usr/bin/env bash



### Bundle BackEnd ###

# Remove existing production folder
rm -rf ./build/

# Transpile .ts to .js
tsc --sourceMap false



### Bundle FrontEnd ###

# Create the directory for React
mkdir -p ./build/src/public/react/

# Navigate to the react directory
cd ./src/public/react/tweet-crunch

# Build React code
npm run build

# Rename the folder
mv build tweet-crunch

# Move the contains to the build/ dir
mv tweet-crunch ../../../../build/src/public/react/