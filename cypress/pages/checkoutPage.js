
export class checkoutPage{
    checkoutPage_firstName = '[data-test="firstName"]'
    checkoutPage_lastName = '[data-test="lastName"]'
    checkoutPage_postalCode = '[data-test="postalCode"]'
    checkoutPage_continueBtn = '[data-test="continue"]'
    checkoutPage_finishBtn = '[data-test="finish"]'
    orderplacedPage_back_to_homePageBtn = '[data-test="back-to-products"]'

    fillInformation(firstName, lastName, postalCode) {
        cy.get(this.checkoutPage_firstName).type(firstName);
        cy.get(this.checkoutPage_lastName).type(lastName);
        cy.get(this.checkoutPage_postalCode).type(postalCode);
        cy.get(this.checkoutPage_continueBtn).click();
    }

    checkout_stepTwo(){
        const baseUrl = Cypress.env('baseUrl');
        const checkoutSecondStep = Cypress.env('checkoutSecondtStep');
        const expectedUrl3 = `${baseUrl}/${checkoutSecondStep}`;
        cy.url().should('include', expectedUrl3);  

        cy.wait(3000);

        cy.get(this.checkoutPage_finishBtn).click(); 

        // Verified the Check-out completed screen
        const checkoutCompleted = Cypress.env('checkoutCompleted');
        const expectedUrl4 = `${baseUrl}/${checkoutCompleted}`; 
        cy.url().should('include', expectedUrl4); 

        cy.wait(5000);
        // Move back to Home screen
        cy.get(this.orderplacedPage_back_to_homePageBtn).click();
        
        const homeUrl = Cypress.env('homeUrl');  // Fetch the homeUrl from environment variables
        const expectedUrl5 = `${baseUrl}/${homeUrl}`;
        cy.url().should('eq', expectedUrl5);
    }
}

