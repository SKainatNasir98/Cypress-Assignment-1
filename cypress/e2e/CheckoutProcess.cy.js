/// <reference types="cypress" />
import { loginPage } from "../pages/loginPage";
import { homePage } from "../pages/homePage";
import { checkoutPage } from "../pages/checkoutPage";

const LoginPage = new loginPage();
const HomePage = new homePage();
const CheckoutPage = new checkoutPage();

describe('Checkout Successfully', () => {
    it('The order should be placed successfully', () => {
        cy.fixture('data.json').then((data) => {
            console.log("=====>", data);
            
            // Login Page
            LoginPage.visit();
            LoginPage.login(data["login"]["name"], data["login"]["password"]);
            cy.wait(5000);

            // Extract price from Home page
            HomePage.getItem1PriceOnHomePage().invoke('text').then((priceText1) => {    
                const item1PriceOnHomePage = parseFloat(priceText1.replace('$', '').trim());

                HomePage.getItem2PriceOnHomePage().invoke('text').then((priceText2) => {
                    const item2PriceOnHomePage = parseFloat(priceText2.replace('$', '').trim());

                    // Product added to cart
                    HomePage.add_to_cart();

                    // Extract price from cart page
                    HomePage.getItem1PriceOnCartPage().invoke('text').then((cartPriceText1) => {                
                        const item1PriceOnCartPage = parseFloat(cartPriceText1.replace('$', '').trim());

                        HomePage.getItem2PriceOnCartPage().invoke('text').then((cartPriceText2) => {
                            const item2PriceOnCartPage = parseFloat(cartPriceText2.replace('$', '').trim());

                            // Extract price from checkout 2nd page
                            CheckoutPage.getitem1OnCheckoutSecondPage().invoke('text').then((SecondPagePriceText1) => {
                                const item1PriceOnSecondPage = parseFloat(SecondPagePriceText1.replace('$', '').trim());

                                CheckoutPage.getitem2OnCheckoutSecondPage().invoke('text').then((SecondPagePriceText2) => {
                                    const item2PriceOnSecondPage = parseFloat(SecondPagePriceText2.replace('$', '').trim());

                                    // Assert that all the prices match
                                    expect(item1PriceOnCartPage).to.be.closeTo(item1PriceOnHomePage, 0.01);
                                    expect(item2PriceOnCartPage).to.be.closeTo(item2PriceOnHomePage, 0.01);
                                    expect(item1PriceOnSecondPage).to.be.closeTo(item1PriceOnCartPage, 0.01);
                                    expect(item2PriceOnSecondPage).to.be.closeTo(item2PriceOnCartPage, 0.01);

                                    HomePage.myCart();

                                    // Fill the required info form
                                    CheckoutPage.fillInformation(data["checkout"]["fname"], data["checkout"]["lname"], data["checkout"]["zipcode"]);

                                    cy.wait(5000);
                                    
                                    CheckoutPage.checkout_stepTwo();
                                    // Add verification of sum of total items on the checkout last page
                                   // Extract total items price from checkout page
                                    CheckoutPage.getTotalPriceOnCheckoutPage().invoke('text').then((totalText) => {
                                        const totalItemsPrice = parseFloat(totalText.match(/Item total: \$(\d+\.\d+)/)[1]);
                                        cy.log(`Calculated actual Total: $${totalItemsPrice}`);
                                        cy.log(`Calculated item1PriceOnSecondPage: $${item1PriceOnSecondPage}`);
                                        cy.log(`Calculated item2PriceOnSecondPage: $${item2PriceOnSecondPage}`);
                                        
                                        // Calculate and verify the expected total from item1 and item2 prices
                                        const expectedTotal = item1PriceOnSecondPage + item2PriceOnSecondPage;
                                        cy.log(`Calculated expectedTotal: $${expectedTotal}`);
                                        expect(totalItemsPrice).to.be.closeTo(expectedTotal, 0.01);

                                        // Extract tax amount
                                        CheckoutPage.getTaxAmountOnCheckoutPage().invoke('text').then((taxText) => {
                                            const taxAmount = parseFloat(taxText.match(/Tax: \$(\d+\.\d+)/)[1]);
                                            cy.log(`Calculated Total Tax: $${taxAmount}`);
                                            
                                        // Extract grand total
                                        CheckoutPage.getGrandTotalOnCheckoutPage().invoke('text').then((grandTotalText) => {
                                            const grandTotal = parseFloat(grandTotalText.match(/Total: \$(\d+\.\d+)/)[1]);
                                            cy.log(`Calculated Grand Total: $${grandTotal}`);

                                            // Calculate and verify the expected grand total
                                            const expectedGrandTotal = totalItemsPrice + taxAmount;
                                            cy.log(`Calculated Expected Grand Total: $${expectedGrandTotal}`);
                                            expect(grandTotal).to.be.closeTo(expectedGrandTotal, 0.01);
                                            });
                                        });
                                    });

                                
                                    CheckoutPage.checkoutCompleted();
                                    CheckoutPage.back_to_HomePage();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
