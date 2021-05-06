# Specify the base image for node
FROM node:14
# Define working directory of docker, app will be placed in this folder
WORKDIR /app
# Copy our package.json file to our working directory
COPY /app/package.json .
# Install npm dependency
RUN npm install
# Copy project files into the working directory
COPY /app .
# Expose port to access via localhost
EXPOSE 3000
# Script to run after image is builded
CMD [ "npm", "start" ]
