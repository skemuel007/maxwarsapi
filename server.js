// import packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
const fs = require('fs');
// const rfs = require('rotating-file-stream');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
