const express = require('express');
const router = express.Router();
const axios = require('axios');
const lodash = require('lodash');
const config = require('config');

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The movie title.
 *           example: Coming to America
 *         episode_id:
 *           type: integer
 *           description: The episode number
 *           example: 2
 *         opening_crawl:
 *           type: string
 *           description: The opening message.
 *           example: It is a period of civil war.
 *         director:
 *           type: string
 *           description: The director of the movie.
 *           example: George Lucas
 *         producer:
 *           type: string
 *           description: The director of the movie.
 *           example: Gary Kurtz, Rick McCallum
 *         release_date:
 *           type: date
 *           description: The date the movie was released.
 *           example: 1977-05-25
 *         characters:
 *           type: array
 *           items:
 *             type: string
 *             description: The characters url
 *             example: http://swapi.dev/api/people/1/
 *         planets:
 *           type: array
 *           items:
 *             type: string
 *             description: The planets url
 *             example: http://swapi.dev/api/planets/1/
 *         starship:
 *           type: array
 *           items:
 *             type: string
 *             description: The starships url
 *             example: http://swapi.dev/api/starships/1/
 *         vehicles:
 *           type: array
 *           items:
 *             type: string
 *             description: The vehicles url
 *             example: http://swapi.dev/api/vehicles/1/
 *         species:
 *           type: array
 *           items:
 *             type: string
 *             description: The species url
 *             example: http://swapi.dev/api/species/1/
 *         created:
 *           type: date
 *           description: The director of the movie.
 *           example: 2014-12-10T14:23:31.880000Z
 *         edited:
 *           type: date
 *           description: The last date the movie was edited.
 *           example: 2014-12-20T19:49:45.256000Z
 *         url:
 *           type: string
 *           description: The url of the movie.
 *           example: http://swapi.dev/api/films/1/
 * /api/movies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Fetches movies from swapi
 *     description: Returns all movies
 *     responses:
 *       200:
 *         description: An array of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/', (req, res, next) => {
    // set base url constant
    const baseUrl = config.get('baseUrl');

    axios.get(`${baseUrl}/films/`)
        .then(function (response) {
            //res.status(200).send({'data': response.data});
            // sort result set by release date
            const result = lodash.sortBy(response.data.results, (obj) => {
                return obj.release_date
            });
            //console.log(result); // return result
            return res.status(200).send({'data': result});
        })
        .catch(function (err) {
            return res.send({error: err});
        })
});


module.exports = router;
