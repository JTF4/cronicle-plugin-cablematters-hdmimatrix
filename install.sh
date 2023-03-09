#!/bin/sh
echo "Installing Plugin"

npm install cronicle-plugin-cablematters-hdmimatrix

mv ./node_modules/cronicle-plugin-cablematters-hdmimatrix ./cronicle-plugin-cablematters-hdmimatrix

rm -f install.sh