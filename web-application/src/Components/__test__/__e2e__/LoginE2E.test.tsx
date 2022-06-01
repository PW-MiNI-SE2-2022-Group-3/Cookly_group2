import puppeteer, { Page } from "puppeteer";

const URL = "http://localhost:3000/";

describe("login process validation", () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 700 });
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

  it("successful login process", async () => {
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
    await page.screenshot({
      path: "./src/Components/__test__/__e2e__/successful_login.png",
    });

    expect(usernameType).toBe("text");
    expect(usernameValue).toBe("adam");

    expect(passwordType).toBe("password");
    expect(passwordValue).toBe("piwo1");
  });

  test("unsuccessful login process", async () => {
    await page.goto(URL);

    await page.click("#username");
    await page.type("#username", "addamm");

    const usernameType = await page.$eval("#username", (input: any) =>
      input.getAttribute("type")
    );
    const usernameValue = await page.$eval("#username", (input: any) =>
      input.getAttribute("value")
    );

    await page.click("#password");
    await page.type("#password", "wrongPassword!2@");

    const passwordType = await page.$eval("#password", (input: any) =>
      input.getAttribute("type")
    );
    const passwordValue = await page.$eval("#password", (input: any) =>
      input.getAttribute("value")
    );

    await page.click("#login-button");
    await handleAlert(page);
    await page.screenshot({
      path: "./src/Components/__test__/__e2e__/unsuccessful_login.png",
    });

    expect(usernameType).toBe("text");
    expect(usernameValue).toBe("addamm");

    expect(passwordType).toBe("password");
    expect(passwordValue).toBe("wrongPassword!2@");
  }, 10000);

  afterAll(() => browser.close());
});

//handle alerts
async function handleAlert(page: Page): Promise<void> {
  let dialogType: any;
  let dialogMessage: any;

  const element = await page.$("#alert");
  element?.click();

  page.on("dialog", async (dialog) => {
    dialogType = dialog.type();
    dialogMessage = dialog.message();
    await dialog.accept();
  });
}
