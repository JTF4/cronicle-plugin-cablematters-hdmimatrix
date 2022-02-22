
#!/bin/sh
echo "Installing Plugin"

npm install cronicle-plugin-snapav-wattbox

cp ./node_modules/cronicle-plugin-snapav-wattbox ./cronicle-plugin-snapav-wattbox

rm -rf ./node_modules/cronicle-plugin-snapav-wattbox

rm install.sh