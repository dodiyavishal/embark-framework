class DashboardPage {
  constructor(page) { this.page = page; }
  async clickHostAdventure() {
    await this.page.click('text=Host an Adventure');
  }
}
module.exports = { DashboardPage };