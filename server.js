'use strict';

// package imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
const fs = require('fs');
// const rfs = require('rotating-file-stream');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

// require routes
const characterRoutes = require('./routes/character.route');
const movieRoutes = require('./routes/movies.route');

// get path to logs directory where log files will be kept
const logDirectory = path.join(__dirname, 'logs')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Swagger for Starwars API',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It is tests star wars api.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Stanley-Kemuel Lloyd Salvation',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
        {
            url: "https://",
            description: 'Live server'
        }
    ],
};

// swagger options
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);
// call express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// setup the logger - morgan
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res) => {
    return res.status(200).json({
        status: true,
        message: 'Welcome to max.ng star wars api - May the force be with you.',
        data: null
    });
});

// user defined routes
app.use('/api/movies', movieRoutes);
app.use('/api/characters', characterRoutes);

// swagger api middleware
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // swagger routes

const server = http.createServer(app); //creating a server with express
const port = process.env.PORT || 3000; // setup port number

// start the server
server
    .listen(port,
        () => console.log(`Max.ng star wars server started at port ${port}`));

module.exports = app;

