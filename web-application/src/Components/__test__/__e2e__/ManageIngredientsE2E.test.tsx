import puppeteer, { Page } from "puppeteer";

const URL = "http://localhost:3000/";

describe("ingredients validation", () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 700 });
  });

  test("ingredients default view", async () => {
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

    //going to the ingredients section
    await page.click("#ingredients-button");
    await page.screenshot({
      path: "./src/Components/__test__/__e2e__/img/successful_ingredients_view.png",
    });
  }, 20000);

  test("search functionality validation", async () => {
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

    //going to the ingredients section
    await page.click("#ingredients-button");

    await page.click("#search-textfield");
    await page.type("#search-textfield", "Shiitake");

    await page.screenshot({
      path: "./src/Components/__test__/__e2e__/img/ingredients_search.png",
    });

    const searchTextType = await page.$eval("#search-textfield", (input: any) =>
      input.getAttribute("type")
    );
    const searchTextValue = await page.$eval(
      "#search-textfield",
      (input: any) => input.getAttribute("value")
    );

    expect(searchTextType).toBe("text");
    expect(searchTextValue).toBe("Shiitake");
  }, 20000);

  test("add ingredients validation", async () => {
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

    //going to the ingredients section
    await page.click("#ingredients-button");

    await page.click("#search-textfield");
    await page.type("#search-textfield", "Shiitake");

    //check add button rendering
    await page.waitForSelector("#add-button");
    const addButtonType = await page.$eval("#add-button", (input: any) =>
      input.getAttribute("type")
    );
    const addButtonTextContent = await page.$eval(
      "#add-button",
      (input: any) => input.textContent
    );

    //add ingredient
    await page.click("#add-button");
    await page.waitFor(5000);
    await page.screenshot({
      path: "./src/Components/__test__/__e2e__/img/ingredients_add.png",
    });

    //write ingredient name
    await page.click("#name-textfield");
    await page.type("#name-textfield", "Eggs");

    const nameType = await page.$eval("#name-textfield", (input: any) =>
      input.getAttribute("type")
    );
    const nameValue = await page.$eval("#name-textfield", (input: any) =>
      input.getAttribute("value")
    );
    expect(nameType).toBe("text");
    expect(nameValue).toBe("Eggs");

    expect(addButtonType).toBeDefined();
    expect(addButtonType).toBe("button");
    expect(addButtonTextContent).toBe("Add Ingredient");

    //click submit
    await page.click("#submit-button");

    await page.screenshot({
      path: "./src/Components/__test__/__e2e__/img/ingredients_added.png",
    });

    //search the newly added ingredient
    await page.click("#search-textfield", { clickCount: 3 });
    await page.type("#search-textfield", "Eg");

    const searchTextValue = await page.$eval(
      "#search-textfield",
      (input: any) => input.getAttribute("value")
    );

    expect(searchTextValue).toBe("Eg");

    await page.screenshot({
      path: "./src/Components/__test__/__e2e__/img/ingredients_present.png",
    });
  }, 50000);
  afterAll(() => browser.close());
});
