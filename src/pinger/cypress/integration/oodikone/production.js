describe('Oodikone', () => {
  it('shows welcome to oodikone', () => {
    cy.visit("https://oodikone.cs.helsinki.fi")
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.url().should('include', 'oodikone')

    cy.contains('Welcome to Oodikone!')
  })
})