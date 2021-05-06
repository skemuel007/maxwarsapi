// package and module imports
const lodash = require('lodash');
const axios = require('axios');
const config = require('config');

/**
 * Async function to get all characters from swapi
 * @returns {Promise<AxiosResponse<any>>}
 */
async function getCharacters(pageNumber) {
    const baseUrl = config.get('baseUrl'); // get the baseurl swapi from config
    if (pageNumber === undefined)
        return await axios.get(`${baseUrl}/people/`);

    return await axios.get(`${baseUrl}/people/?page=${pageNumber}`);

}

/**
 * Async function to sort characters by name
 * @param filter
 * @returns {Promise<string[]>}
 */
async function sortDataByName(filter, pageNumber) {
    // fetch the characters from swapi
    const character = await getCharacters(pageNumber);
    // sort result using lodash and return sorted name
    const data =  lodash.sortBy(character.data.results, (obj) => {
        return obj.name
    });

    // filter data by gender
    return filterDataByGender(filter, data);
}

/**
 * Sort data by height
 * @param filter
 * @returns {Promise<string[]>}
 */
async function sortDataByHeight(filter, pageNumber) {

    // fetch data from swapi
    const character = await getCharacters(pageNumber);
    // sort the result by characters height
    const sortedData =  lodash.sortBy(character.data.results, (obj) => {
        return obj.height
    });

    // return sorted data, filter by gender
    return filterDataByGender(filter, sortedData);
}

/**
 * Function to filter by gender
 * @param filter
 * @param data
 * @returns {string[]}
 */
function filterDataByGender(filter, data) {
    return lodash.filter(data, (obj) => {
        return obj.gender === filter;
    });
}

/**
 * function to generate meta data from sorted data
 * @param sortedData
 * @returns {{totalHeightOfCharactersInCM: string, numberOfCharacters: string, totalHeightOfCharactersInFeet: string}}
 */
function generateMetaData(sortedData) {
    let sum = 0;
    sortedData.forEach((n) => {
        sum += parseInt(n.height);
    })

    return  {
        numberOfCharacters: sortedData.length.toString() ,
        totalHeightOfCharactersInCM: sum.toString() + ".00 cm",
        totalHeightOfCharactersInFeet: centimeterToFeet(sum)
    }
}

/**
 * function to convert centimeter to feet
 * @param height
 * @returns {string}
 */
function centimeterToFeet(height) {
    return (height/30.48).toFixed(2) + " ft";
}

// export functions
module.exports = {
    sortDataByName,
    sortDataByHeight,
    generateMetaData
};
