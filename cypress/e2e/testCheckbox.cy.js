/// <reference types="cypress" />

describe('Button Click Test', () => {
    it('Clicks and checks a checkbox', () => {
      cy.visit('https://ultimateqa.com/simple-html-elements-for-automation/');
      cy.get('input[type="checkbox"][value="Bike"]').click();
      cy.wait(5000);
      cy.get('input[type="checkbox"][value="Bike"]').should('be.checked');
    });
  });
  