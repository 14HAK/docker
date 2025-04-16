# Docker && DockerHub

```javascript
//------------------------------------
//* Docker && DockerHub:::

// VirtualMachinePlatform

// Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -like "VirtualMachinePlatform"}

// Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```

```javascript
//------------------------------------
//* set up Docker in windows10::

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

```javascript
//------------------------------------
//* Understanding Basic Docker Concepts::

// Containers:
// Containers are isolated environments in which applications run. They are portable and ensure that apps work the same everywhere.

// Images:
// Images are blueprints for containers. They contain everything the app needs (code, dependencies, etc.)

// Docker Hub:
// Docker Hub is a public registry where you can find pre-built images

// Dockerfile:
// A Dockerfile contains a set of instructions for creating an image
```

```javascript
//------------------------------------
//* Docker Commands Pull Docker Image::

//Pull an Image:
//To download an image from Docker Hub, use the docker pull command.
'-> docker pull <docker_img_name>'
'-> docker pull ubuntu'
'-> docker run -it ubuntu' // [ ls -> cd <folder-name> -> touch fileName.txt ]
```

```javascript
//------------------------------------
//* Project_ONE: [hello-docker]:
// make a folder name hello-docker:
// hello-docker/
// ├── Dockerfile
// ├── hello.js

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
