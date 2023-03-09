# Mini-Blog

## Development Server

To run the project in the development mode you first need to install docker in your machine. Once you have docker installed you can run the following command.

```
docker-compose -f docker-compose.dev.yml up --build
```

This will run three container simultaneously. You need to run migration to make database work.

```
docker-compose exec app python manage.py migrate
```

To login into admin panel which will be running at localhost:8000, first create super user

```
docker-compose exec app python manage.py createsuperusers
```

If you made some changes in the db and want to create migration do following

```
docker-compose exec app python manage.py makemigrations
docker-compose exec app python manage.py migrate
```

## Producton Server

You can run production server with docker-compose.yml file with following command.

```
docker-compose up
```
