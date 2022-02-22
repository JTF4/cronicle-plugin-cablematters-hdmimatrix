
#!/bin/sh
echo "Installing The WattBox Cronicle Plugin"

rm -rf cronicle-plugin-snapav-wattbox

echo "Downloading Plugin"

git clone https://github.com/JTF4/cronicle-plugin-snapav-wattbox

echo "Installing Dependancies"

cd ./cronicle-plugin-snapav-wattbox

npm install

rm ./install.sh

echo "Finished Installing"