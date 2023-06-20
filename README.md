# WeatherApp

WeatherApp is a simple application that displays current weather and forecast for the upcoming hours for a chosen location. The application consists of a backend (built with Node.js) and a frontend (using React.js).

![image](https://github.com/roberts911/Weatherapp/assets/85109223/3929aaca-659d-4a96-bb07-b80d8bb5c6fe)


![image](https://github.com/roberts911/Weatherapp/assets/85109223/1facf9e6-d062-49c7-919e-f5e42b70987e)




## Achievements

Below is a list of tasks that have been accomplished as part of this project:

1. Connection with OpenWeatherMap API: The application utilizes OpenWeatherMap API to fetch weather data.

2. Creation of Dockerfile: Dockerfiles have been created for both frontend and backend, which allows easy deployment and isolation of the project on any environment with Docker installed.

3. Creation of docker-compose.yml: This file connects the frontend and backend into one set of containers, making it easy to run the entire application.

4. Node.js and React.js Development: Added functionality for displaying weather forecast a few hours ahead. The application now also utilizes browser location for generating the forecast.

5. Testing: Added automated tests using Mocha for various functionalities of the application.

6. Cloud Deployment: The application has been deployed on Azure App Service.

## Running the application

### Docker
1. Clone the repository and navigate to the project directory.
2. Build the Docker images using.
```
docker-compose build
```
3. Run the application using.
```
docker-compose up
```
4. In your web browser, navigate to.
```
localhost:8000
```

### Cloud Azure
To run the application in Azure, navigate to https://weatherapprobertsiurek.azurewebsites.net and grant access to your location.

## Future Improvements
Below is a list of features and improvements that can be added in the future:

1. Testing Enhancements: We could add more tests to ensure all features are working correctly.
2. Deployment Automation: Using tools such as Ansible or Terraform, we could automate the deployment process of the application, both locally and in the cloud.

I'm glad to have worked on this project and I am open to any feedback and suggestions.

## Author
Robert Siurek

Please contact me using email: robertspabianice23@gmail.com



