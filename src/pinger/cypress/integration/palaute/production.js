describe('Palaute', () => {
  // If test course is no longer visible, go check db and update dates
  it('shows page title and test course', () => {
    cy.visit('https://coursefeedback.helsinki.fi/courses')
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.acceptShibboDisclosureIfShown()

    cy.contains('Norppa')
    cy.contains('TEST-1 Test course')
  })
})
