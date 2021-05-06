const supertest = require('supertest');
const app = require('../../../server');

describe("Test fetch movies", () => {

    it("should return all movies", async done => {
        await supertest(app)
            .get("/api/movies")
            .expect(200)
            .then((response) => {
                expect(response.body.data.length).toBeGreaterThanOrEqual(1);
            });
        done();
    }, 5000);
});
