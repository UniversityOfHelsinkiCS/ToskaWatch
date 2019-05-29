describe('Oodikone', () => {
  const test_tabs = (cy) => {
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.url().should('include', 'oodikone')

    cy.contains('Welcome to Oodikone!')
  }

  it('tabs work in production', () => {
    cy.visit("https://oodikone.cs.helsinki.fi")
    test_tabs(cy)
  })

  it('tabs work in staging', () => {
    cy.visit("https://oodikone.cs.helsinki.fi/staging")
    test_tabs(cy)
  })
})