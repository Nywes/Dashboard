const frisby = require('frisby');
const Joi = require('joi');

const LoggedUser = require('../models/user-model');

const serverPort = process.env.DASHBOARD_SERVER_PORT;

// todo set port according to environment here

var testUserID = -1;

describe('Users', function () {
    beforeAll(async function () {

        // todo add a test user to the database
        const payload = { userName: "testUserName", displayName: "testDisplayName", password: "password" };

        var response = await frisby.post(`http://localhost:${serverPort}/api/user`, payload)
        .expect("status", 200)
        .then(function(res) {
            testUserID = res.json.id;

            expect(testUserID != -1).toBe(true);
        });

        //Add our custom expect handler
        frisby.addExpectHandler('isTestUser', async function (response) {

            // Run custom Jasmine matchers here
            expect(response.json.data.userName).toBe("testUserName");
            expect(response.json.data.displayName).toBe("testDisplayName");

            bcrypt.compare("password", response.json.data.password, function(err, isMatch) {
                if (err)
                    throw (err);
                expect(isMatch).toBe(true);
            });
        });
    });

    // Use our new custom expect handler
    it('Should get user', function () {
        return frisby.get(`http://localhost:${serverPort}/api/user/${testUserID}`)
        .expect('isTestUser');
    });

    afterAll(async function () {
        var response = await frisby.del(`http://localhost:${serverPort}/api/user/${testUserID}`).expect("status", 200);

        // Remove said custom handler (if needed)
        frisby.removeExpectHandler('isUser1');
    });
});