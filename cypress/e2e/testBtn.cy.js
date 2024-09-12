/// <reference types="cypress" />

describe('Button Click Test', () => {
  it('Clicks the simple button', () => {
    cy.visit('https://ultimateqa.com/simple-html-elements-for-automation/');
    cy.get('#idExample').click();
    cy.wait(5000); 
    cy.url().should('include', 'https://ultimateqa.com/button-success');
  });
});
