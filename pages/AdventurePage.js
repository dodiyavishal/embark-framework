/*
class AdventurePage {
  constructor(page) { this.page = page; }

  async fillTourDetails(hostanadventure) {
  await this.page.click("//span[normalize-space()='Choose categories']");
  await this.page.click(`text=${hostanadventure.Category}`);

  await this.page.click("//span[normalize-space()='Choose difficulty']");
  await this.page.click(`text=${hostanadventure.Difficulty}`); 

  await this.page.fill("input[placeholder='Enter a location']", hostanadventure.Location);
  const dropdownOption = this.page.locator(`text=${hostanadventure.Location}`);
  await dropdownOption.waitFor({ state: 'visible', timeout: 5000 }); 
  await dropdownOption.click();

  await this.page.click("//button[normalize-space()='Next']");
}

  async enterGroupSize(min, max) {  
  await this.page.fill("input[placeholder='Min']", String(min));
  await this.page.fill("input[placeholder='Max']", String(max));
  await this.page.click("//button[normalize-space()='Next']");
}
  
  async getValidationMessage() {
    return await this.page.textContent("//span[normalize-space()='The group size max field is required.']");
  }


   async fillSections(tourData) {
  // --- Overview (default open) ---
  if (tourData.Overview && tourData.Overview[0]) {
    const overview = tourData.Overview[0];
    if (overview.Title) {
      await this.page.fill('input[placeholder="Enter the name of your tour"]', overview.Title);
    }
    if (overview.Summary) {
      await this.page.fill('//label[contains(text(),"Summary")]/following-sibling::div/textarea', overview.Summary);
    }
    if (overview.Included) {
      await this.page.fill('//label[contains(text(),"Included")]/following-sibling::div/textarea', overview.Included);
    }
    if (overview.NotIncluded) {
      await this.page.fill('//label[contains(text(),"Not included")]/following-sibling::div/textarea', overview.NotIncluded);
    }
    await this.page.click('//button[normalize-space()="Save"]');
    await this.page.waitForURL(/location/); // Wait until Location tab auto-opens
  }

  // --- Location (Details auto filled, so just clicked on "Save") ---
    await this.page.click('//button[normalize-space()="Save"]');
    await this.page.waitForURL(/photos/); // Wait until Photos tab auto-opens

  // --- Photos (Getting 500 error on upload, so just click on "Save") ---
    await this.page.click('//button[normalize-space()="Save"]');
    await this.page.waitForTimeout(3000); 
    await this.page.waitForURL(/details/); // Wait until Details tab auto-opens

  // --- Details ---
    if (tourData.Details && tourData.Details[0]) {
      const details = tourData.Details[0];
      if (details.Duration) {
        await this.page.fill('//input[@type="number"]', String(details.Duration));
        await this.page.locator('.multiselect__single').first().click();
        const dropdownOption = this.page.locator('text=Days');
        await dropdownOption.waitFor({ state: 'visible', timeout: 5000 });
        await dropdownOption.click();
      }
      if (details.Price) {
        await this.page.fill('.input-text.price_input', String(details.Price)); 
        await this.page.click("(//span[@class='multiselect__placeholder']");
        const currencyDropdownOption = this.page.locator('text=USD');
        await currencyDropdownOption.waitFor({ state: 'visible', timeout: 5000 });
        await currencyDropdownOption.click();

        await this.page.click("(//div[@class='multiselect select-embark inline-select'])");
        const perPersondropdownOption = this.page.locator('text=Per Person');
        await perPersondropdownOption.waitFor({ state: 'visible', timeout: 5000 });
        await perPersondropdownOption.click();
      }
      if (details.Availability) {
        await this.page.fill('//label[contains(text(),"Availability")]/following-sibling::div/textarea', details.Availability);
      }
      if (details.WhatQualifiesYouToGiveThisTour) {
        await this.page.fill('//label[contains(text(),"What qualifies you to give this tour?")]/following-sibling::div/textarea', details.WhatQualifiesYouToGiveThisTour);
      }
      if (details.AdditionalInfo) {
        await this.page.fill('//label[contains(text(),"Additional info")]/following-sibling::div/textarea', details.AdditionalInfo);
      }
      if (details.Cancellation) {
        await this.page.fill('//label[contains(text(),"Cancellation")]/following-sibling::div/textarea', details.Cancellation);
      }
      await this.page.locator('//button[normalize-space()="Save"]').click();
      await this.page.waitForTimeout(3000); 
      await this.page.waitForURL(/itinerary/); // Wait until Itinerary tab auto-opens
    }

  // --- Itinerary ---
  if (tourData.Itinerary && tourData.Itinerary[0]) {
    const itinerary = tourData.Itinerary[0];
    if (itinerary.MeetupLocation) {
      await this.page.fill('//input[@placeholder="Enter a location"]', itinerary.MeetupLocation);
      const dropdownOption = this.page.locator(`text=${itinerary["Meetup Location"]}`);
      await dropdownOption.waitFor({ state: 'visible', timeout: 5000 });
      await dropdownOption.click();
    }
    if (itinerary.Itinerary) {
      await this.page.fill('//div[@class="itinerary-day"]/textarea', itinerary.Itinerary);
    }

    await this.page.locator('//button[normalize-space()="Save"]').click();
    await this.page.waitForTimeout(3000); 
  }

  } // end fillSections


  async getSuccessMessage() {
    return await this.page.textContent("//div[@class='notification-title']"); 
  }
}
module.exports = { AdventurePage };

*/

// ------   New Code 



class AdventurePage {
  constructor(page) {
    this.page = page;
  }

  async fillTourDetails(hostanadventure) {
    await this.page.click("//span[normalize-space()='Choose categories']");
    await this.page.click(`text=${hostanadventure.Category}`);

    await this.page.click("//span[normalize-space()='Choose difficulty']");
    await this.page.click(`text=${hostanadventure.Difficulty}`);

    await this.page.fill("input[placeholder='Enter a location']", hostanadventure.Location);
    const dropdownOption = this.page.locator(`text=${hostanadventure.Location}`);
    await dropdownOption.waitFor({ state: 'visible', timeout: 5000 });
    await dropdownOption.click();

    await this.page.click("//button[normalize-space()='Next']");
  }

  async enterGroupSize(min, max) {
    await this.page.fill("input[placeholder='Min']", String(min));
    await this.page.fill("input[placeholder='Max']", String(max));
    await this.page.click("//button[normalize-space()='Next']");
  }

  async getValidationMessage() {
    return await this.page.textContent(
      "//span[normalize-space()='The group size max field is required.']"
    );
  }

  async fillSections(tourData) {
    // --- Overview (default open) ---
    if (tourData.Overview && tourData.Overview[0]) {
      const overview = tourData.Overview[0];
      if (overview.Title) {
        await this.page.fill('input[placeholder="Enter the name of your tour"]', overview.Title);
      }
      if (overview.Summary) {
        await this.page.fill(
          '//label[contains(text(),"Summary")]/following-sibling::div/textarea',
          overview.Summary
        );
      }
      if (overview.Included) {
        await this.page.fill(
          '//label[contains(text(),"Included")]/following-sibling::div/textarea',
          overview.Included
        );
      }
      if (overview.NotIncluded) {
        await this.page.fill(
          '//label[contains(text(),"Not included")]/following-sibling::div/textarea',
          overview.NotIncluded
        );
      }
      await this.page.click('//button[normalize-space()="Save"]');
      await this.page.waitForURL(/location/); // Wait until Location tab auto-opens
    }

    // --- Location (Details auto filled, so just clicked on "Save") ---
    await this.page.click('//button[normalize-space()="Save"]');
    await this.page.waitForURL(/photos/); // Wait until Photos tab auto-opens

    // --- Photos (Getting 500 error on upload, so just click on "Save") ---
    await this.page.click('//button[normalize-space()="Save"]');
    await this.page.waitForTimeout(3000);
    await this.page.waitForURL(/details/); // Wait until Details tab auto-opens

    // --- Details ---
    if (tourData.Details && tourData.Details[0]) {
      const details = tourData.Details[0];
      if (details.Duration) {
        await this.page.fill('//input[@type="number"]', String(details.Duration));
        await this.page.locator('.multiselect__single').first().click();
        const dropdownOption = this.page.locator('text=Days');
        await dropdownOption.waitFor({ state: 'visible', timeout: 5000 });
        await dropdownOption.click();
      }
      if (details.Price) {
        await this.page.fill('.input-text.price_input', String(details.Price));
        await this.page.click("(//span[@class='multiselect__placeholder'])");
        const currencyDropdownOption = this.page.locator('text=USD');
        await currencyDropdownOption.waitFor({ state: 'visible', timeout: 5000 });
        await currencyDropdownOption.click();

        await this.page.click("(//div[@class='multiselect select-embark inline-select'])");
        const perPersonDropdownOption = this.page.locator('text=Per Person');
        await perPersonDropdownOption.waitFor({ state: 'visible', timeout: 5000 });
        await perPersonDropdownOption.click();
      }
      if (details.Availability) {
        await this.page.fill(
          '//label[contains(text(),"Availability")]/following-sibling::div/textarea',
          details.Availability
        );
      }
      if (details.WhatQualifiesYouToGiveThisTour) {
        await this.page.fill(
          '//label[contains(text(),"What qualifies you to give this tour?")]/following-sibling::div/textarea',
          details.WhatQualifiesYouToGiveThisTour
        );
      }
      if (details.AdditionalInfo) {
        await this.page.fill(
          '//label[contains(text(),"Additional info")]/following-sibling::div/textarea',
          details.AdditionalInfo
        );
      }
      if (details.Cancellation) {
        await this.page.fill(
          '//label[contains(text(),"Cancellation")]/following-sibling::div/textarea',
          details.Cancellation
        );
      }
      await this.page.locator('//button[normalize-space()="Save"]').click();
      await this.page.waitForTimeout(3000);
      await this.page.waitForURL(/itinerary/); // Wait until Itinerary tab auto-opens
    }

    // --- Itinerary ---
    if (tourData.Itinerary && tourData.Itinerary[0]) {
      const itinerary = tourData.Itinerary[0];
      if (itinerary.MeetupLocation) {
        await this.page.fill('//input[@placeholder="Enter a location"]', itinerary.MeetupLocation);
        const dropdownOption = this.page.locator(`text=${itinerary["Meetup Location"]}`);
        await dropdownOption.waitFor({ state: 'visible', timeout: 5000 });
        await dropdownOption.click();
      }
      if (itinerary.Itinerary) {
        await this.page.fill('//div[@class="itinerary-day"]/textarea', itinerary.Itinerary);
      }

      await this.page.locator('//button[normalize-space()="Save"]').click();
      await this.page.waitForTimeout(3000);
    }
  }

  async getSuccessMessage() {
    return await this.page.textContent("//div[@class='notification-title']");
  }
}

module.exports = { AdventurePage };
