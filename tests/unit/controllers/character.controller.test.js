const Character = require('../../../controllers/character.controller');

describe('sort data ', () => {
    it('should return a list of persons that is sorted by name alphabetically', async () => {
        const result = await Character.sortDataByName('male');
        expect(result.some(person => person.name === 'Biggs Darklighter')).toBeTruthy();
    });

    it('should return a list of persons that is sorted by height', async () => {
        const result = await Character.sortDataByHeight('male');
        expect(result.some(person => person.height === '172')).toBeTruthy();
    })
});

describe('metadata', () => {
    it('should generate metadata of the data', () => {
        const data = [
            {
                "name": "Luke Skywalker",
                "height": "172",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
            },
            {
                "name": "Skywalker",
                "height": "182",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
            },
            {
                "name": "Luke ",
                "height": "187",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
            },
            {
                "name": "Lu walker",
                "height": "192",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
            }
        ]
        const result  = Character.generateMetaData(data);
        expect(result).toMatchObject({
                numberOfCharacters: '4',
                totalHeightOfCharactersInCM: '733.00 cm',
                totalHeightOfCharactersInFeet: '24.05 ft'
            }
        );
    });
})
