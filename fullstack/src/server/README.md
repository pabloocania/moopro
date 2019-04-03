# server

correr container mongodb docker
```bash
docker run -d -p 27017:27017 --name mongo-offtuc mongo:3.4-jessie
```
con el comando 
```
nodemon --inspect index.js 
```
la REST API se mostrará disponible después de conectarse con la base de datos Mongo 

para comprobar que este funcionando:

```
http://localhost:8080/api/endpoints
````


