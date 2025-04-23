# Docker && DockerHub



### Docker && DockerHub
```javascript
//------------------------------------

// VirtualMachinePlatform

// Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -like "VirtualMachinePlatform"}

// Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```

### Setup Docker in windows10
```javascript
//------------------------------------
// Download Docker Desktop:__
'https://www.docker.com/products/docker-desktop'

// WSL2 (Windows Subsystem for Linux) backend is recommended for the best experience:
// Open PowerShell as Administrator and run the following command to enable WSL and Virtual Machine Platform.
'-> wsl --install'

// * Open Docker Desktop → Settings → General * Check ✅ "Use the WSL 2 based engine"

// cmd install:__
'-> dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart'

'-> dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart'

// Docker Hub:__
// sign in to docker hub.
'https://hub.docker.com/'

// Verify Installation:
'-> docker --version'

```

### Understanding Basic Docker Concepts
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

### Docker Commands Pull Docker Image
```javascript
//------------------------------------

//Pull an Image:
//To download an image from Docker Hub, use the docker pull command.
'-> docker pull <docker_img_name>'
'-> docker pull ubuntu'
'-> docker run -it ubuntu' // [ ls -> cd <folder-name> -> touch fileName.txt ]

'-> docker pull nginx'
'-> docker run -d -p 80:80 nginx'

```

## Project_ONE: [ hello-docker ]

### make a folder name hello-docker:
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
'-> docker rmi <image_id>' // remove an image

'-> docker run <imageName>' // docker run hello-docker
'-> docker run -it <imageName>' // docker run -it hello-docker

// in shell live running:
'-> docker run -it <imageName> sh' // docker run -it hello-docker sh // [ -> 'node hello.js' ]

```

## Project_TWO: [ React-basic ]

### install vite react first

```javascript
'-> npm create vite@latest --template react' // vite react project react-basic
'-> npm create vite@latest react-docker88'
'-> yarn create vite'

// make a folder name react-docker:
'-> cd react-docker88' // cd to the project folder
'-> npm create vite@latest .' //. dot = vite create from this folder

```

### folder structure:

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

### Docker Build
```javascript

'-> docker build -t react-docker88 .' //t stands for tag name // . dot means current directory

```

### Run Container
```javascript

// To create and start a container from an image, use the docker run command.
'-> docker run -p 5173:5173 react-docker88' //run any node app

// live update with watching mode:[-v stands for volume]
'-> docker run -p 5173:5173 -v "$(pwd):/app" react-docker88' //run image with live update
'-> docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules react-docker88' //run image with live update with new volume

```

### Publish Docker Image
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

### show/remove Docker Images
```javascript

'-> docker images'
'-> docker rmi <image_id>'
'-> docker rmi hg57654'

```

### show/ stop/ remove Containers
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

### Docker Volume
```javascript

'-> docker volume create <volume_name>' // create a volume
'-> docker run -v <volume_name>:/app <image_name>' // run a container with a volume

'-> docker volume ls' // list all volumes
'-> docker volume inspect <volume_name>' // inspect a volume

'-> docker volume rm <volume_name>' // remove a volume
'-> docker volume prune' // remove all unused volumes

```

### Docker Network
```javascript

'-> docker network create mynetwork' // create a custom network
'-> docker run -d --network=mynetwork --name app myapp'
'-> docker run -d --network=mynetwork --name db mongo' // Run Containers on the Same Network

```

## Docker Compose System[many containers run into single command]
### Project_THREE:[ mern-stack ] (with Docker compose)

### folder structure:
```javascript

mern-stack/
├── frontend/
      ├── Dockerfile
      ├── package.json
      ├── vite.config.js
      ├── ... ... other files
├── backend/
      ├── Dockerfile
      ├── ... ... other files
├── compose.yaml

```

### Docker compose commands(optional or important)
```javascript

'-> docker init' // create a docker compose file in the current directory
'-> docker init <project_name>' // create a docker compose file in the current directory with project name
'-> docker init MERN_STACK' // create a docker compose file in the current directory with project name
'-> docker init MERN_STACK --compose' // create a docker compose file in the current directory with project name and compose file

```

### Dockerfile && compose.yaml
```javascript
// frontend/package.json:
"scripts": {
	"dev": "vite --host",
	"build": "vite build",
	"lint": "eslint .",
	"preview": "vite preview"
},

// frontend/vite.config.js:
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

// frontend/Dockerfile:
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

// backend/Dockerfile:
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]

// mern-stack/compose.yaml:
version: '3.8'

services:

  web:
    depends_on:
      - api
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    environment:
      - BACKEND_URL=http://localhost:8000/
    
    develop:
      watch:
        - path: ./frontend/package.json
          action: rebuild
        - path: ./frontend/package-lock.json
          action: rebuild
        - path: ./frontend
          target: /app
          action: sync

  api:
    depends_on:
      - db
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - MONGO_URI=mongodb://db:27017/
    
    develop:
      watch:
        - path: ./backend/package.json
          action: rebuild
        - path: ./backend/package-lock.json
          action: rebuild
        - path: ./backend
          target: /app
          action: sync

  db:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - anime:/data/app

volumes:
  anime:

```

### Docker compose commands
```javascript

// both are together for building, running, and live time update:
'-> docker compose up' // upload this service
'-> docker compose' // run the service
'-> docker compose watch' // watch every change and update the instance
//-----------------------------------------------------------------

// check the version
'-> docker compose --version'

// To build and run all services, navigate to the directory containing the docker-compose.yml file and run:
'-> docker-compose up --build'

// To run the services in detached mode:
'-> docker-compose up -d'

// To stop containers without removing them:
'-> docker-compose stop'

// To remove containers after stopping:
'-> docker-compose down'

// To view logs from all services:
'-> docker-compose logs -f'

// To view logs of a specific service (e.g., app):
'-> docker-compose logs -f app'

'-> docker compose ps' // list all containers

```

## Pull Docker Image And Modification Locally
```javascript

// pull the image from docker hub
'-> docker pull dulon88/react-docker88'

// Create a container from the image
'-> docker run -dit --name <new container name> <image-name>' 
// Create a container from the image
'-> docker run -dit --name dulon88/react-docker88 <dulon88/react-docker88>' // if you need go to "-> cd dulon88/react-docker88" folder and modifying files and re-build image at same position and push into github for latest version.

// Copy files from the container to your local machine
'-> docker cp dulon88/react-docker88:/app ./new-one' // copy the files from the container to the host machine
'-> code ./new-one' // goto new-one folder
'-> docker build -t new-one .' // re-build or build new image
// if folder name matched Docker pulled image name its re-builded

```
# -----------------------------------------------------------
## New Born 😂
### .dockerignore
```javascript

//* .dockerignore:
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
.env

```

### Dockerfile For Mode [Build Stage || Production Stage]
```javascript

// # Build Stage
// Uses Node.js 18 for building the app
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

// Builds the optimized production files
RUN npm run build 
 
// # Production Stage
// Uses Nginx to serve static files.
FROM nginx:stable-alpine AS production

// Copies the build output from the previous stage.
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

// Runs Nginx in the foreground.
CMD ["nginx", "-g", "daemon off;"]


```

### Backend Dockerfile
```javascript

//* Backend Dockerfile:
// Step 1: Use the official Node.js image
FROM node:20-alpine

// Step 2: Set working directory inside the container
WORKDIR /app

// Step 3: Copy package.json and package-lock.json
COPY package*.json ./

// Step 4: Install dependencies
RUN npm install

// Step 5: Copy the rest of the app's source code
COPY . .

// Step 6: Expose the port the app runs on
EXPOSE 8000

// Step 7: Command to run the app
CMD ["npm", "start"]

```

### Frontend Dockerfile
```javascript

//* Frontend Dockerfile:
// # Use official Node.js image:_
// Step 1: Use the official Node.js image
FROM node:20-alpine

// # Set the working directory
// Step 2: Set working directory inside the container
// WORKDIR /usr/src/app
WORKDIR /app

// # Copy files:_
// Step 3: Copy package.json and package-lock.json
COPY package*.json ./

// Step 4: Install dependencies
RUN npm install

// Step 5: Copy the rest of the app's source code
COPY . .

// # Expose port:_
// Step 6: Build the React app for production
EXPOSE 5173

// # Start the app:_
// Step 9: Command to serve the app
CMD ["npm", "run", "dev"]

```

### compose.yaml
```javascript

//* compose.yaml:
version: '3.8'
services:

  // # Frontend service  
  web:
    depends_on:
      - api
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    environment:
      - BACKEND_URL=http://localhost:8000/

    develop:
      watch:
        - path: ./frontend/package.json
          action: rebuild
        - path: ./frontend/package-lock.json
          action: rebuild
        - path: ./frontend
          target: /app
          action: sync

  // # Backend service
  api:
    depends_on:
      - db
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - MONGO_URI=mongodb://db:27017/
    
    develop:
      watch:
        - path: ./backend/package.json
          action: rebuild
        - path: ./backend/package-lock.json
          action: rebuild
        - path: ./backend
          target: /app
          action: sync

  // # MongoDB service
  db:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - anime:/data/app

volumes:
  anime:

//---------------------------------others ways
// volume:_
// This setup allows your local changes to be mirrored inside the container.
volumes:
  - .:/app
  - ./node_modules:/app/node_modules

// others:_
// 'stdin_open' and 'tty' Keep the container running and interactive.
stdin_open: true
tty: true

// environment:_
// variable passing to the container.
env_file:
  - .env

// permission errors:_
// Adjust file permissions or specify a user in the 'Dockerfile' using the 'USER' directive.
// # Add before CMD
USER node
CMD ["npm", "run", "dev"]

// Use updated caching options in volume mounts:__
volumes:
  - type: bind
    source: ./app
    target: /app
    consistency: cached

// Reducing image size:__
// Use smaller base images: Alpine-based images are significantly smaller. Clean up after installing dependencies:

// Each command in your Dockerfile creates a new layer. Combine commands where appropriate to reduce the number of layers.
RUN npm install && npm cache clean --force

// Docker for development with live-reloading:__
RUN npm install --only=dev
CMD ["npm", "run", "dev"]


'-> docker build -t docker-app-dev .'
'-> docker run -p 3000:3000 -v $(pwd)/src:/app/src docker-app-dev'

// When using direct mongoDB atlas:__
environment:
  - MONGO_URI='<mongoDB_Atlas:mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority>'

// Won networks:__
// frontend + backend Dockerfile:
networks:
  - app-network

// compose.yml:
networks:
  app-network:
    driver: bridge

// # Copy backend source code:__
COPY backend/src ./src
COPY backend/.env ./ 

// for postGresql:__
// frontend/backend Dockerfile:

networks:
  - app-network

environment:
  - PG_URI='<postgres://postgres:password@postgres:5432/mern_ts_db>'

depends_on:
  - postgres

// compose.yaml:
postgres:
  image: postgres:13
  container_name: postgres
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: password
    POSTGRES_DB: mern_ts_db
  ports:
    - "5432:5432"
  networks:
    - app-network

```

### some Commands
```javascript

// If you have multiple stages in your Dockerfile and need to target a specific build stage (such as the build stage), you can use the '--target' option.
//  Building with '--target build' creates a larger image because it includes the build tools and dependencies needed to compile your React app:__
'-> docker build -t myapp .'
'-> docker build -t my-react-app-dev --target build .'

// Ensure you’re running the container interactively(continuous running):__
'-> docker run -d -p 3000:3000 myapp'
'-> docker run -it -p 5173:5173 my-react-app'

'-> docker scan myapp' // Scan the image for vulnerabilities.

// Performance problems on macOS and Windows:__
// File-sharing mechanisms between the host system and Docker containers introduce significant overhead on macOS and Windows, especially when working with large repositories or projects containing many files. Traditional methods like osxfs and gRPC FUSE often struggle to scale efficiently in these environments.

// Optimized for large projects: Handles monorepos or repositories with thousands of files efficiently.

// Performance improvement: Resolves bottlenecks seen with older file-sharing mechanisms.

// Real-time synchronization: Automatically syncs filesystem changes between the host and container in near real-time.

// Reduced file ownership conflicts: Minimizes issues with file permissions between host and container.

// .syncignore:
node_modules
.git/
*.log


// Docker Init [node]:__
? What application platform does your project use? Node
? What version of Node do you want to use? 18
? Which package manager do you want to use? yarn
? Do you want to run "yarn run build" before starting your server? Yes
? What directory is your build output to? (comma-separate if multiple) output
? What command do you want to use to start the app? node index.js
? What port does your server listen on? 8000

```

### demo titles
```javascript

point 1
point 2

```

