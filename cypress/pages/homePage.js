
export class homePage{
    add_to_cart_btn = '#add-to-cart-sauce-labs-backpack'
    my_cart_icon = '[data-test="shopping-cart-link"]'
    my_cart_checkoutBtn = '[data-test="checkout"]'
    add_to_cart(){
        cy.get(this.add_to_cart_btn).click();
        cy.get(this.my_cart_icon).click();
        const baseUrl = Cypress.env('baseUrl'); 
        const myCartUrl = Cypress.env('myCartUrl');  
       
        const expectedUrl1 = `${baseUrl}/${myCartUrl}`;
        cy.url().should('eq', expectedUrl1); 

        cy.get(this.my_cart_checkoutBtn).click();
        cy.wait(5000);

        const checkoutFirstStep = Cypress.env('checkoutFirstStep');
        const expectedUrl2 = `${baseUrl}/${checkoutFirstStep}`;
        cy.url().should('include', expectedUrl2); 
    }
}
