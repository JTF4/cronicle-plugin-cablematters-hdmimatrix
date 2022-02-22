
#!/bin/sh
echo "Installing Plugin"

cd ..

rm -rf cronicle-plugin-snapav-wattbox

npm install cronicle-plugin-snapav-wattbox

mv ./node_modules/cronicle-plugin-snapav-wattbox ./cronicle-plugin-snapav-wattbox

rm -f install.sh