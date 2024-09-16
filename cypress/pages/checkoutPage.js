
export class checkoutPage{
    checkoutPage_firstName = '[data-test="firstName"]'
    checkoutPage_lastName = '[data-test="lastName"]'
    checkoutPage_postalCode = '[data-test="postalCode"]'
    checkoutPage_continueBtn = '[data-test="continue"]'
    checkoutPage_finishBtn = '[data-test="finish"]'
    orderplacedPage_back_to_homePageBtn = '[data-test="back-to-products"]'
    itemPriceOnSecondPage = '.item_pricebar [data-test="inventory-item-price"]'
    totalPrice = '.summary_subtotal_label'
    TaxAmountOnCheckoutPage = ".summary_tax_label"
    GrandTotalAmountOnCheckoutPage = ".summary_total_label"

   
    //itemsPriceOnSecondPage = ".summary_subtotal_label"
    getitem1OnCheckoutSecondPage() {
        return cy.get(this.itemPriceOnSecondPage).eq(0); 
    }
    getitem2OnCheckoutSecondPage() {
        return cy.get(this.itemPriceOnSecondPage).eq(1); 
    }
   

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
    }
    
    getTotalPriceOnCheckoutPage(){
        return cy.get(this.totalPrice);
    }
    getTaxAmountOnCheckoutPage(){
        return cy.get(this.TaxAmountOnCheckoutPage);
    }
    getGrandTotalOnCheckoutPage(){
        return cy.get(this.GrandTotalAmountOnCheckoutPage);
    }

    checkoutCompleted(){
        //assertion based on button
        cy.get('[data-test="finish"]').should('have.text', 'Finish');
        cy.get(this.checkoutPage_finishBtn).click();
        // Verified the Check-out completed screen
        const baseUrl = Cypress.env('baseUrl');
        const checkoutCompleted = Cypress.env('checkoutCompleted');
        const expectedUrl4 = `${baseUrl}/${checkoutCompleted}`; 
        cy.url().should('include', expectedUrl4); 

        cy.wait(5000);
    }
    back_to_HomePage(){
        // Move back to Home screen  
        cy.get(this.orderplacedPage_back_to_homePageBtn).click();
        const baseUrl = Cypress.env('baseUrl');
        const homeUrl = Cypress.env('homeUrl');  // Fetch the homeUrl from environment variables
        const expectedUrl5 = `${baseUrl}/${homeUrl}`;
        cy.url().should('eq', expectedUrl5);
        cy.wait(3000);
        //assertion based on images 
        cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').should('exist');
    }
}
