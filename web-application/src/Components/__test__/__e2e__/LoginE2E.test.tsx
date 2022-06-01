import puppeteer from "puppeteer";

const URL = "http://localhost:3000/";

describe("login process validation", () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("username validation", async () => {
    await page.goto(URL);

    await page.click("#username");
    await page.type("#username", "admin");

    const usernameType = await page.$eval("#username", (input: any) =>
      input.getAttribute("type")
    );
    const usernameValue = await page.$eval("#username", (input: any) =>
      input.getAttribute("value")
    );
    expect(usernameType).toBe("text");
    expect(usernameValue).toBe("admin");
  });

  it("password validation", async () => {
    await page.goto(URL);

    await page.click("#password");
    await page.type("#password", "admin");

    const passwordType = await page.$eval("#password", (input: any) =>
      input.getAttribute("type")
    );
    const passwordValue = await page.$eval("#password", (input: any) =>
      input.getAttribute("value")
    );
    expect(passwordType).toBe("password");
    expect(passwordValue).toBe("admin");
  });

  it("whole process", async () => {
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
  });

  it("shows the next window", async () => {
    await page.waitForSelector("#users-button");

    const login = await page.$eval("#users-button", (input: any) => input);

    expect(login).toBeDefined();
  });

  afterAll(() => browser.close());
});
