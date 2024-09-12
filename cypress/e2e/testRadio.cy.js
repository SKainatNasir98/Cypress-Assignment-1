/// <reference types="cypress" />

describe('Button Click Test', () => {
    it('Clicks a radio button', () => {
      cy.visit('https://ultimateqa.com/simple-html-elements-for-automation/');
      cy.get('input[type="radio"][value="male"]').check();
      cy.wait(5000);
      cy.get('input[type="radio"][value="male"]').should('be.checked');
    });
  });
  