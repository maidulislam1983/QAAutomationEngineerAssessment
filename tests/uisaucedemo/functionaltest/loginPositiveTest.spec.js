const { test } = require('@playwright/test');
const { chromium } = require('playwright');

test.describe("SauceDemo ui test suite", async () => {

    test('SauceDemo in Positive Test Case', async () => {

        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        //navigate url 
        await page.goto("https://www.saucedemo.com");

        //login 
        await page.locator('//input[@id="user-name"]').fill("standard_user");

        await page.locator('//input[@id="password"]').fill("secret_sauce");

        await page.locator('//input[@id="login-button"]').click();

        //Products
        await page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]').click();

        await page.locator('//button[@name="add-to-cart-sauce-labs-bike-light"]').click();

        await page.locator('//button[@name="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        await page.locator('//button[@name="add-to-cart-sauce-labs-fleece-jacket"]').click();

        await page.locator('//span[@class="shopping_cart_badge"]').click();

        //cart page

        await page.locator('//button[@id="checkout"]').click();

        // information page

        await page.locator('//input[@id="first-name"]').fill("diana");

        await page.locator('//input[@id="last-name"]').fill("cindy");

        await page.locator('//input[@id="postal-code"]').fill("48092");

        await page.locator('//input[@id="continue"]').click();

        // log out
        await page.locator('//button[text()="Open Menu"]').click();

        await page.locator('//a[@id="logout_sidebar_link"]').click();

        await page.waitForTimeout(3000);

        await browser.close();

    })

})