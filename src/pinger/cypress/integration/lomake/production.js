describe('Lomake', () => {
  it('frontpage loads', () => {
    cy.visit('https://opetushallinto.cs.helsinki.fi/tilannekuva/')
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.acceptShibboDisclosureIfShown()

    cy.url().should('include', 'tilannekuva')
  })
})
