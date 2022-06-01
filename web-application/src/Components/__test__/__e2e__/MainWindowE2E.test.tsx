import puppeteer, { Page } from "puppeteer";

const URL = "http://localhost:3000/";

describe("main window validation", () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 700 });
  });

  test("default view", async () => {
    await page.goto(URL);

    await page.click("#username");
    await page.type("#username", "adam");

    const usernameType = await page.$eval("#username", (input: any) =>
      input.getAttribute("type")
    );
    const usernameValue = await page.$eval("#username", (input: any) =>
      input.getAttribute("value")
    );

    await page.click("#password");
    await page.type("#password", "piwo1");

    const passwordType = await page.$eval("#password", (input: any) =>
      input.getAttribute("type")
    );
    const passwordValue = await page.$eval("#password", (input: any) =>
      input.getAttribute("value")
    );

    await page.click("#login-button");

    expect(usernameType).toBe("text");
    expect(usernameValue).toBe("adam");

    expect(passwordType).toBe("password");
    expect(passwordValue).toBe("piwo1");

    //users button
    await page.waitForSelector("#users-button");
    const usersButtonType = await page.$eval("#users-button", (input: any) =>
      input.getAttribute("type")
    );
    const usersButtonTextContent = await page.$eval(
      "#users-button",
      (input: any) => input.textContent
    );

    expect(usersButtonType).toBeDefined();
    expect(usersButtonType).toBe("button");
    expect(usersButtonTextContent).toBe("USERS");

    //recipes button
    await page.waitForSelector("#recipes-button");
    const recipesButtonType = await page.$eval(
      "#recipes-button",
      (input: any) => input.getAttribute("type")
    );
    const recipesButtonTextContent = await page.$eval(
      "#recipes-button",
      (input: any) => input.textContent
    );

    expect(recipesButtonType).toBeDefined();
    expect(recipesButtonType).toBe("button");
    expect(recipesButtonTextContent).toBe("RECIPES");

    //ingredients button
    await page.waitForSelector("#ingredients-button");
    const ingredientsButtonType = await page.$eval(
      "#ingredients-button",
      (input: any) => input.getAttribute("type")
    );
    const ingredientsButtonTextContent = await page.$eval(
      "#ingredients-button",
      (input: any) => input.textContent
    );

    expect(ingredientsButtonType).toBeDefined();
    expect(ingredientsButtonType).toBe("button");
    expect(ingredientsButtonTextContent).toBe("INGREDIENTS");

    //logout button
    await page.waitForSelector("#logout-button");
    const logoutButtonType = await page.$eval("#logout-button", (input: any) =>
      input.getAttribute("type")
    );
    const logoutButtonTextContent = await page.$eval(
      "#logout-button",
      (input: any) => input.textContent
    );

    expect(logoutButtonType).toBeDefined();
    expect(logoutButtonType).toBe("button");
    expect(logoutButtonTextContent).toBe("LOG OUT");
  }, 20000);
  afterAll(() => browser.close());
});
