
#!/bin/sh
echo "Installing Plugin"

rm -rf cronicle-plugin-snapav-wattbox

echo "Installing"

git clone https://github.com/JTF4/cronicle-plugin-snapav-wattbox

echo "Moving"

cd ./cronicle-plugin-snapav-wattbox

yarn install

rm ./install.sh

echo "Finished"