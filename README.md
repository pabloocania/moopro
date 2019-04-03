# offtuc
offtuc - Project 66 - Proyecto Node, React, Flutter

## Es necesario instalar docker y npm 

Navegar a /fullstack para ver detalles de la aplicación

Clonar repositorio e instalar paquetes
````
git clone https://github.com/pabloocania/offtuc.git

cd fullstack

# Instalar dependencias
npm install

# correr container de mongodb en docker
docker run -d -p 27017:27017 --name mongo-offtuc mongo:3.4-jessie

# [Opcional] - Start development server
npm run dev

# [Opcional] - Build for production
npm run build

# [Opcional] - API up - development
cd fullstack/src/server
nodemon --inspect index.js

# [Opcional] - Start production server
npm start
````


