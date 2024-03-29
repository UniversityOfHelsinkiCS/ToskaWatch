describe('Oodikone', () => {
  it('shows front page of oodikone', () => {
    cy.visit('https://oodikone.helsinki.fi')
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.acceptShibboDisclosureIfShown()

    cy.url().should('include', 'oodikone')
    cy.contains('statistics')
  })
})
