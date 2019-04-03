# offtuc
## Project 66 - Proyecto Node, React, Flutter

### Es necesario instalar docker y npm con Node:
https://docs.docker.com/docker-for-mac/install/
https://www.npmjs.com/get-npm


## Instalación

Clonar repositorio en la carpeta deseada

````
git clone https://github.com/pabloocania/offtuc.git
````

### IMPORTANTE! Una vez clonado, crear en el directorio offtuc/fullstack/src/server un archivo .env con el sig contenido:
### El archivo .env contiene variables globales y sirven para la configuración del servidor
````
NAME=offtuc
PORT=8080
HOST=localhost
SECRETORKEY=offtuc
`````

### Correr container de mongodb en docker
docker run -d -p 27017:27017 --name mongo-offtuc mongo:3.4-jessie

### Luego:
```bash 
cd fullstack 

# Instalar dependencias
npm install

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


