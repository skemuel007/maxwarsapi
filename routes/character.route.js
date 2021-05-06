const express = require('express');
const router = express.Router();
const characterController = require('../controllers/character.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     CharacterResponse:
 *       type: object
 *       properties:
 *         meta:
 *           type: object
 *           properties:
 *             numberOfCharacters:
 *               type: integer
 *               description: The number of characters
 *               example: 0
 *             totalHeightOfCharactersInCM:
 *               type: integer
 *               description: The total height of the characters
 *
 * /api/characters/?sort=name&gender=male&page=1:
 *   get:
 *     tags:
 *       - Characters
 *     summary: Retrieves data sorted by name or filtered by gender and searched by page
 *     description: Retrieves a sorted, filtered, searched by page data.
 *     parameters:
 *       - in: query
 *         name: sort
 *         required: true
 *         description: The type which the data will be sorted by.
 *         example: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: gender
 *         required: true
 *         description: The type which the data will be filtered by.
 *         example: male
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: The page where sorting and filtering will be done.
 *         example: 1
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sorted data
 */
router.get('/', async (req, res, next) => {
    let sortParameter = req.query.sort; // get sortParameter
    let gender = req.query.gender;
    const pageNumber = req.query.page;

    if ( gender === undefined) {
        return res.status(400).send({ err: 'gender query params is required'})
    }

    if ( sortParameter === undefined) {
        return res.status(400).send({ err: 'sort query params is required'})
    }

    try {
        // check if sort is by name
        if(sortParameter.toString().toLowerCase().trim() === 'name') {
            // sort data by name
            const sortedData = await characterController.sortDataByName(gender, pageNumber);
            return res.status(200).send({metadata: characterController.generateMetaData(sortedData), data: sortedData});

        } else if(sortParameter.toString().toLowerCase().trim() === 'height') {
            // if by height
            const sortedData = await characterController.sortDataByHeight(gender, pageNumber);
            // return response
            return res.status(200).send({metadata: characterController.generateMetaData(sortedData), data: sortedData});

        }

        return res.status(400).send({ err: 'gender query value must either be male or female or sort query value must either be height or name'})
    } catch(e) {
        // else data not found
        res.status(404).send({err: e});
    }
});

module.exports = router;
