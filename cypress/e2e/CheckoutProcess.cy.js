/// <reference types="cypress" />
import { loginPage } from "../pages/loginPage";
import {homePage} from "../pages/homePage"
import { checkoutPage } from "../pages/checkoutPage";


const LoginPage = new loginPage
const HomePage = new homePage
const CheckoutPage = new checkoutPage


    describe('Checkout Successfully', () => {
        it('The order should be placed successfully', () => {
            
            cy.fixture('data.json'). then ((data) =>{ 
                console.log("=====>",data);
                //Login Page
                LoginPage.visit();

                LoginPage.login(data["login"]["name"], data["login"]["password"]);
                cy.wait(5000);

                //Product added to cart
                HomePage.add_to_cart();
                // fill the required info form
                CheckoutPage.fillInformation(data["checkout"]["fname"], data["checkout"]["lname"], data["checkout"]["zipcode"]);
            })
            
            cy.wait(5000);

           CheckoutPage.checkout_stepTwo();
    
        });
    })
   
  