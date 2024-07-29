import * as tokenData from "../../../../data/TokenData/tokendata.json"
import * as postUserData from "../../../../data/userData/api/functionaltestdata/positivetestdata/postuserdata.json"

const { test, expect } = require('@playwright/test');

test.describe('Post Api User Positive Test Suites', () => {

    const _baseUrl = 'https://gorest.co.in/';
    let _bearer_token = '';
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    test.beforeAll("Get Api Token", async () => {

        //Arrange
        //get token
        _bearer_token = tokenData.bearer_token;

        //make dynamicGuid
        let createGuid = (((1 + Math.random()) * 0x10000) | 0).toString(16);

        //make dynamic user email id
        postUserData.postusrrequest.email = createGuid + "tenali.ramakrishna@15ce.com";
    })

    test("Post Api User Positive Test Case @+Test", async ({ request }) => {

        console.log('Post Api User Test Case Started');

        //Act -create User
        let response = await request.post(`${_baseUrl}public/v2/users`,
            {
                data: postUserData.postusrrequest,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + _bearer_token
                }
            });

        let responseData = await response.json();

        //Assertion -status code        
        expect(response.status()).toBe(postUserData.statuscode); //201

        //Assertion -status body
        expect(responseData.id, "Id is null").not.toBeNull();
        expect(responseData.name, "Name not match").toBe(postUserData.postuserresponse.name);
        expect(responseData.email, "Email not match").toBe(postUserData.postusrrequest.email);
        expect(responseData.gender, "Gender not match").toBe(postUserData.postuserresponse.gender);
        expect(responseData.status, "Status not match").toBe(postUserData.postuserresponse.status);


        await delay(3000); // <-- here we wait 3s

        const userId = responseData.id;

        console.log('Get Api User Started');

        //Act -get User
        response = await request.get(`${_baseUrl}/public/v2/users/${responseData.id}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + _bearer_token
                }
            });

        expect(response.status()).toBe(200);

        //Assertion -status code        
        responseData = await response.json();

        //Assertion -status body
        expect(responseData.id, "Id is match").toBe(userId);
        expect(responseData.name, "Name not match").toBe(postUserData.postuserresponse.name);
        expect(responseData.email, "Email not match").toBe(postUserData.postusrrequest.email);
        expect(responseData.gender, "Gender not match").toBe(postUserData.postuserresponse.gender);
        expect(responseData.status, "Status not match").toBe(postUserData.postuserresponse.status);

        console.log('Get Api User Ended');

        console.log('Post Api Property Test Case Passed');
    })

})
