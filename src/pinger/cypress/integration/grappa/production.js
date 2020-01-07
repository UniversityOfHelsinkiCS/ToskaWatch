describe('Grappa', () => {
  it('shows user name', () => {
    cy.visit('https://grappa.cs.helsinki.fi')
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.acceptShibboDisclosureIfShown()

    cy.url().should('include', 'grappa')
    cy.contains('Jami')
  })
})
