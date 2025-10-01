class TourViewPage {
  constructor(page) { this.page = page; }
  async verifyTourDetails(tour) {
    await this.page.waitForSelector('#overview');
    
    const overview = await this.page.textContent('#overview');
    const city = await this.page.textContent('#city');
    
    return overview === tour.Overview && city === tour.City;
  }
  async saveToWishlist() {
    await this.page.click('text=Save to Wishlist');
  }
  async wishlistIsSaved() {
    return await this.page.textContent('.wishlist-success');
  }
}
module.exports = { TourViewPage };