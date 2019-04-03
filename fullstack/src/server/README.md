# node_microservice_boilerplate
Node microservice boilerplate that connects to Eureka Server and Spring Cloud Configuration server

## before installing:
1) create a .env file with at least these values:
NAME=node_microservice_boilerplate
PORT=3000
HOST=localhost

## to install run:
npm install

It needs an Eureka Server to connect to

## to check the status of the service, you can try with: 
http://localhost:3000/api/v1/ping

## Example endpoints:
http://localhost:3000/api/v1/singers/
