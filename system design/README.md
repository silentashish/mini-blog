# System Design of Mini-BLOG

## Overall System Design

![system_design](./system-design.png)

### Database Container

Postgres sql is choosen for this solution as a relational database solution. We will have multiple table to store users, tweet, like, followers etc and using relational database will help us to get the desire form of data using joining approach with the help of primary and secondary key. All of data we are getting in this application will be the structured data.

### Server Container

Server is build with django and django-rest-api which are the framework of python for building web application and rest-api simultaneously. Django help us to build secure and scalable server providing in built security. Django rest framework provide quick way to build rest api from django. Currently file is stored inside the file location in django server. Django rest api will store and retrive images from the server.

### Frontend Container

Frontend is build with reactjs and server with nginx. Chakra ui is used as a styling library and react-query is used for the networking along with axios. React router dom is used for routing.

## Databse Design

![system_design](./database.png)

## API

API is documented using postman in json format [click here to see] (api.json)
