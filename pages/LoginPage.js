class LoginPage {
  constructor(page) { this.page = page; }

  async gotoLoginPage() {
    await this.page.click("a.nav-link[href='/login']");
  }

  async login(user) {
    await this.page.fill('//input[@type="email"]', user.email);
    await this.page.fill('//input[@type="password"]', user.password);
    await this.page.click('button[type="submit"]');
  }
}
module.exports = { LoginPage };
