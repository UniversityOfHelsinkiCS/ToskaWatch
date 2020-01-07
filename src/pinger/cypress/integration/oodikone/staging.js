describe('Oodikone', () => {
  it('shows welcome to oodikone', () => {
    cy.visit('https://oodikone-staging.cs.helsinki.fi/')
    cy.url().should('include', 'login-test.it.helsinki.fi')

    cy.get('#username').type(Cypress.env('username_test'))
    cy.get('#password').type(Cypress.env('password_test'))

    cy.contains('Login').click()
    cy.url().should('include', 'oodikone')

    cy.contains('oodikone')
  })
})
