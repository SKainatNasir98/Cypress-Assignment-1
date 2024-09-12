
export class loginPage{

    loginPage_username_textbox = '#user-name'
    loginPage_password_textbox = 'input[name=password]'
    loginPage_loginBtn = '#login-button'
    
    
    visit() {
        //cy.visit('https://saucedemo.com');
       
        cy.visit(Cypress.env('baseUrl'));
    }

    login(username, password){

        cy.get(this.loginPage_username_textbox).type(username);
        cy.get(this.loginPage_password_textbox).type(password);
        cy.get(this.loginPage_loginBtn).click();

        const baseUrl = Cypress.env('baseUrl');  
        const homeUrl = Cypress.env('homeUrl');  // Fetch the homeUrl from environment variables
        
        const expectedUrl = `${baseUrl}/${homeUrl}`;
        cy.url().should('eq', expectedUrl);

    }
    

}