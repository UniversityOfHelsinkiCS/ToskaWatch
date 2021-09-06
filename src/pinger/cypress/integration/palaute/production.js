describe('Palaute', () => {
  it('shows page title', () => {
    cy.visit('https://coursefeedback.helsinki.fi')
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.acceptShibboDisclosureIfShown()

    cy.contains('Norppa')
  })
})
