
#!/bin/sh
echo "Installing Plugin"

rm -rf cronicle-plugin-snapav-wattbox

echo "Installing"

npm install cronicle-plugin-snapav-wattbox

echo "Moving"

mv ./node_modules/cronicle-plugin-snapav-wattbox ./cronicle-plugin-snapav-wattbox

rm -f install.sh