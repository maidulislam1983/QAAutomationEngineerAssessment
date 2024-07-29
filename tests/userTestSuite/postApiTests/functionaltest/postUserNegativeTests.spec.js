import * as tokenData from "../../../../data/TokenData/tokendata.json"
import * as postUserData from "../../../../data/userData/api/functionaltestdata/negetivetestdata/postuserdata.json"

const { test, expect } = require('@playwright/test');

test.describe('Post Api User Negative Test Suites', () => {

    const _baseUrl = 'https://gorest.co.in/';
    let _bearer_token = '';
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    test.beforeAll("Get Api Token", async () => {
        //Arrange  //get token
        _bearer_token = tokenData.bearer_token;
    })

    test("Post Api User Negative Test Case @-Test", async ({ request }) => {

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
        expect(response.status()).toBe(postUserData.statuscode); //422

        console.log('Post Api Property Test Case Passed');
    })

})