# Welcome to Weather App

Weather App displays weather in users current location. Currently it has been deployed using AWS Cloudfront: https://dr6fak363sik7.cloudfront.net/

Weather App backend is deployed with AWS Lightsail: https://test-service-1.3eo5s7qoieics.eu-north-1.cs.amazonlightsail.com/api/weather

To run the entire project locally with docker compose, clone the repository, set backend environment variables in a .env file and run `docker compose up` in project root.

# Weather App Backend

In order to run Weather App backend locally, following environment variables have to be configured. You can create a .dotenv file in backend directory to set them.

**APPID** = <Get the value from [openweathermap](http://openweathermap.org/) >
**MAP_ENDPOINT** = "http://api.openweathermap.org/data/2.5"

## Weather App Backend Key Features

- Get current weather based on users latitude and longitude
- Get weather forecast for next 4 hours

## Local development
In the backend directory
- Install dependencies 
`npm install`
- Run tests
`npm run test`
 - Start app 
 `npm run dev`

## Possible errors

In case something goes wrong, please ensure your openweathermap **APPID** is correct. If request to backend doesn't contain location data, Helsinki is used as the default location for this service. 

# Weather App Frontend

## Weather App Frontend key features

- Fetch weather data Weather App backend API
- Display weather forecast

## Get started
In the frontend directory
- Install dependencies 
`npm install`
 - Start app 
 `NODE_ENV=dev npm start`
 - Lint
 `npm run lint`
 - Build app
 `npm run build`

## Possible errors

Make sure your browser has enabled location services and you have backend running.

# Robot tests

- **Python**- To run robot tests, you need to have python and pip installed. You also need Visual Studio robot framework extensions **Robocorp Code** & **Robot Framework Language Server** for robot framework testing in Visual Studio
