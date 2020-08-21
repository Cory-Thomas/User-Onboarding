

describe('Site Test', function() {
    it('visit site', function() {
        cy.visit('http://localhost:3000/');
    })
})

describe('Form Input Tests', function(){
    it('types name and checks/compares', function() {
        cy.get('input[name="name"]')
        .type('Cory')
        .should('have.value','Cory')
    })
    it('type an email and checks/compares', function(){
        cy.get('input[name="email"]')
        .type('cory@gmail.com')
        .should('have.value','cory@gmail.com')
    })
    it('types a password and checks/compares', function(){
        cy.get('input[name="password"]')
        .type('1234')
        .should('have.value','1234')
    })
    it('check checkbox and if it can be checked', function(){
        cy.get('[type="checkbox"]').check()
    })
    it('check if submit button can submit form, and also refreshes previous data', function(){
        cy.get('form').submit().reload()
    })
})

describe('Form Error Tests', function() {
     it('enter invalid password', function(){
        cy.get('input[name="password"]')
        .type('ab')
    })
    it('check if error shows up for invalid password', function(){
        cy.contains('* Password must be at least 3 characters')
    })
})
