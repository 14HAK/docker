# Docker && DockerHub

## Docker && DockerHub
```javascript
//------------------------------------

// VirtualMachinePlatform

// Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -like "VirtualMachinePlatform"}

// Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```

## Setup Docker in windows10
```javascript
//------------------------------------

//WSL2 (Windows Subsystem for Linux) backend is recommended for the best experience:
//Open PowerShell as Administrator and run the following command to enable WSL and Virtual Machine Platform.
'-> wsl --install'

'-> dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart'

'-> dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart'

//Docker Hub:
//sign in to docker hub.
'https://hub.docker.com/'

//Download Docker Desktop:
//During installation, make sure to select the option to use WSL 2 as the backend.
'https://www.docker.com/products/docker-desktop/'

//Verify Installation:
'-> docker --version'
```

## Understanding Basic Docker Concepts
```javascript
//------------------------------------

// Containers:
// Containers are isolated environments in which applications run. They are portable and ensure that apps work the same everywhere.

// Images:
// Images are blueprints for containers. They contain everything the app needs (code, dependencies, etc.)

// Docker Hub:
// Docker Hub is a public registry where you can find pre-built images

// Dockerfile:
// A Dockerfile contains a set of instructions for creating an image
```

## Docker Commands Pull Docker Image
```javascript
//------------------------------------

//Pull an Image:
//To download an image from Docker Hub, use the docker pull command.
'-> docker pull <docker_img_name>'
'-> docker pull ubuntu'
'-> docker run -it ubuntu' // [ ls -> cd <folder-name> -> touch fileName.txt ]
```

# Project_ONE: [ hello-docker ]

## make a folder name hello-docker:
```javascript
//------------------------------------

hello-docker/
├── Dockerfile
├── hello.js

// Dockerfile:
FROM node:20-alpine
WORKDIR src/app
COPY . .
CMD ["node", "hello.js"] // CMD node hello.js

//commands:
'-> cd hello-docker'

'-> docker build -t <imageName> .' // Build the Docker Image: //t stands for tag name
'-> docker build -t hello-docker .' // . dot means current directory

'-> docker images' // see docker all images

'-> docker run <imageName>' // docker run hello-docker
'-> docker run -it <imageName>' // docker run -it hello-docker

// in shell live running:
'-> docker run -it <imageName> sh' // docker run -it hello-docker sh // [ -> 'node hello.js' ]

```

# Project_TWO: [ React-basic ]

## install vite react first

```javascript
'-> npm create vite@latest --template react' // vite react project react-basic
'-> npm create vite@latest react-docker88'
'-> yarn create vite'

// make a folder name react-docker:
'-> cd react-docker88' // cd to the project folder
'-> npm create vite@latest .' //. dot = vite create from this folder

```

## folder structure:

```javascript
react-docker88/
├── Dockerfile
├── .dockerignore
├── package.json
├── yarn.lock
├── vite.config.js
├── ... ... others vite files

// Dockerfile:
FROM node:18-alpine3.17
# FROM node:18.16.0-alpine3.18

RUN addgroup -S app && adduser -S app -G app
# Create a non-root user and switch to it

USER root

RUN mkdir -p /app && chown -R app:app /app

WORKDIR /app
# Set the working directory to /app

COPY package.json yarn.lock ./
# Copy package.json and package-lock.json to the working directory

USER app
# Switch to the non-root user

RUN yarn install --legacy-peer-deps
# Install dependencies

USER root
# Switch back to root user to copy the rest of the files

RUN chown -R app:app /app
# Copy the rest of the application files to the working directory

COPY . .
# Copy the rest of the application files to the working directory

EXPOSE 5173
# Expose the port that the application will run on 

CMD ["yarn", "run", "dev"]
# Start the application

// .dockerignore:
node_modules/

// package.json:
"scripts": {
  "dev": "vite --host" //docker live update host connect network to localhost
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}

// vite.config.js:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
    },
    host: true, // Allow access from outside the container
    strictPort: true,
    port: 5173, // Ensure the port matches the one exposed in Docker
  },
});

```

## Docker Build
```javascript

'-> docker build -t react-docker88 .' //t stands for tag name // . dot means current directory

```

## Run Container
```javascript

// To create and start a container from an image, use the docker run command.
'-> docker run -p 5173:5173 react-docker88' //run any node app

// live update with watching mode:[-v stands for volume]
'-> docker run -p 5173:5173 -v "$(pwd):/app" react-docker88' //run image with live update
'-> docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules react-docker88' //run image with live update with new volume

```

## Publish Docker Image
```javascript

// login, publish images, push images.
'-> docker login' // login to docker hub
'-> docker login <user_name>' // login to docker hub with user name
'-> docker login dulon88'

'-> docker tag <image_name> <user_Name>|<image_name>' // tag the image with user name
'-> docker tag react-docker88 dulon88/react-docker88' // tag the image with user name
'-> docker tag react-docker88 dulon88/react-docker88:latest' // tag the image with user name and latest version

'-> docker push <user_Name>|<image_name>' // push the image to docker hub
'-> docker push dulon88/react-docker88' // push the image to docker hub

```

## show/remove Docker Images
```javascript

'-> docker images'
'-> docker rmi <image_id>'
'-> docker rmi hg57654'

```

## show/ stop/ remove Containers
```javascript

// show Containers:
'-> docker ps' //List Running Containers:
'-> docker ps a' //To list all running containers, use.

// Stop Containers:
'-> docker stop <container_id>'
'-> docker stop c3d'

//Remove Container:
'-> docker rm <container_id>'
'-> docker rm c3d --force'
'-> docker container prune --force' // remove/clear all containers

```

## Docker Volume
```javascript

'-> docker volume create <volume_name>' // create a volume
'-> docker run -v <volume_name>:/app <image_name>' // run a container with a volume

'-> docker volume ls' // list all volumes
'-> docker volume inspect <volume_name>' // inspect a volume

'-> docker volume rm <volume_name>' // remove a volume
'-> docker volume prune' // remove all unused volumes

```

# demo main titles
## demo titles
```javascript

point 1
point 2

```

