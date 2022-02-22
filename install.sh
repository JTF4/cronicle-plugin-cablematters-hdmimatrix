
#!/bin/sh
echo "Installing The WattBox Cronicle Plugin"

echo "Downloading Plugin"

git clone https://github.com/JTF4/cronicle-plugin-snapav-wattbox

echo "Installing Dependancies"

cd ./cronicle-plugin-snapav-wattbox

yarn install

rm ./install.sh

echo "Finished Installing"