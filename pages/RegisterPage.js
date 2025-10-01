class RegisterPage {
  constructor(page) { this.page = page; }
  
  async gotoSignUp() {
    await this.page.click("a.nav-link[href='/register']");
  }

  async register(user) {
    await this.page.fill('//input[@placeholder="Full Name"]', user.fullName);
    await this.page.fill('//input[@placeholder="username09"]', user.username);
    await this.page.fill('//input[@type="email"]', user.email);
    await this.page.fill('(//input[@type="password"])[1]', user.password);
    await this.page.fill('(//input[@type="password"])[2]', user.password);

    await this.page.fill('//input[@placeholder="Enter a location"]', 'jaffna');
    const dropdownOption = this.page.locator('text=jaffna');
    await dropdownOption.waitFor({ state: 'visible', timeout: 5000 });
    await dropdownOption.click();
    await this.page.waitForTimeout(2000); 

    await this.page.evaluate(() => {
      document.querySelector('label[for="terms_and_conditions"] a').removeAttribute('href');
    });
    await this.page.click('label[for="terms_and_conditions"]');
    await this.page.click('button[type="submit"]');
  }
}
module.exports = { RegisterPage };
