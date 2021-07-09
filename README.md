# Fire Watch Frontend

## About Fire Watch

Fire Watch is an open source product to help prevent forest fires in different climatic zones.
Our sensor stations will track the environmental conditions in your forest to give you all the information you need to prevent a fire.

## Installation

### 1) customize Dockerfile
```
LABEL traefik.http.routers.<PROJECT_NAME>.rule="Host(`<PROJECT_NAME>.<YOUR_SERVER_ADRESS>`)"
```
### 2) create Docker Container
1. create Docker image
2. create Container out of the image
     
### 3) define environmental variables
BACKEND_SERVER_ADDRESS: <YOUR_BACKEND_SERVER_IP>


## Usage
* Dashboard Screen (1600px x 1024px)
* TestCodes:
```
testCode1
```
```
testCode2
```


## Communication Technologie
### HTTP
* axios (https://www.npmjs.com/package/axios)


## Software Architecture


### Frontend Application
https://github.com/MalteOp/fire_watch_frontend

### Backend Application
https://github.com/tobiasraab/FireWatch_ApplicationBackend

### MongoDB Database
https://www.mongodb.com/
#### Collection forests:<br>
* 0.2kB per forest
#### Collection sensorDatas:<br>
* 0.45kB per Sensor
#### Collection userData:<br>
* 0.5kB per user
#### Collection weather:<br>
* 0.8kB per forest

### Sensor Backend
https://github.com/tobiasraab/FireWatch_SensorBackend
