
#!/bin/sh
echo "Installing The Cable Matters HDMI Matrix Cronicle Plugin"

rm -rf cronicle-plugin-cablematters-hdmimatrix

echo "Downloading Plugin"

git clone https://github.com/JTF4/cronicle-plugin-cablematters-hdmimatrix

echo "Installing Dependancies"

cd ./cronicle-plugin-cablematters-hdmimatrix

npm install

rm ./install.sh

echo "Finished Installing"