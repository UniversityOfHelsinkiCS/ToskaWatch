describe('Fuksilaiterekisteri', () => {
  it('shows page title', () => {
    cy.visit('https://study.cs.helsinki.fi/fuksilaite')
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.acceptShibboDisclosureIfShown()

    cy.url().should('include', 'fuksilaite')
    cy.contains('FUKSILAITTEET')
  })
})
