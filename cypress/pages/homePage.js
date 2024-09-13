
export class homePage{
    add_to_cart_btn1 = '#add-to-cart-sauce-labs-backpack'
    add_to_cart_btn2 = '#add-to-cart-sauce-labs-bike-light'
    my_cart_icon = '[data-test="shopping-cart-link"]'
    my_cart_checkoutBtn = '[data-test="checkout"]'
    itemPriceOnCartPage = '[data-test="inventory-item-price"]'
    itemPriceOnHomePage = '[data-test="inventory-item-price"]'
    
    add_to_cart(){
        cy.get(this.add_to_cart_btn1).click();
        cy.get(this.add_to_cart_btn2).click();
        
        cy.get(this.my_cart_icon).click();
        const baseUrl = Cypress.env('baseUrl'); 
        const myCartUrl = Cypress.env('myCartUrl');  
        const expectedUrl1 = `${baseUrl}/${myCartUrl}`;
        cy.url().should('eq', expectedUrl1); 
        
        cy.wait(5000);
    }
    getItem1PriceOnHomePage() {
        return cy.get(this.itemPriceOnHomePage).eq(0); 
    }

    getItem2PriceOnHomePage() {
        return cy.get(this.itemPriceOnHomePage).eq(1); 
    }
    
    getItem1PriceOnCartPage() {
        return cy.get(this.itemPriceOnCartPage).eq(0); 
    }

    getItem2PriceOnCartPage() {
        return cy.get(this.itemPriceOnCartPage).eq(1); 
    }
    myCart(){
        cy.get(this.my_cart_checkoutBtn).click();

        const baseUrl = Cypress.env('baseUrl'); 
        const checkoutFirstStep = Cypress.env('checkoutFirstStep');
        const expectedUrl2 = `${baseUrl}/${checkoutFirstStep}`;
        cy.url().should('include', expectedUrl2); 
    }
    

   
}

