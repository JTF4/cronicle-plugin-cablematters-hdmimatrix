
#!/bin/sh
echo "Installing Plugin"

npm install cronicle-plugin-snapav-wattbox

mv ./node_modules/cronicle-plugin-snapav-wattbox ./cronicle-plugin-snapav-wattbox

rm -f install.sh