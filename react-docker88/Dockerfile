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