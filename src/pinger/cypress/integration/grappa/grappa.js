describe('Grappa', () => {
  const test_tabs = (cy) => {
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))
    
    cy.contains('Login').click()
    cy.url().should('include', 'grappa')
    
    cy.contains('Jami')
  }

  it('tabs work in production', () => {
    cy.visit("https://grappa.cs.helsinki.fi")
    test_tabs(cy)
  })

  it('tabs work in staging', () => {
    cy.visit("https://grappa.cs.helsinki.fi/staging")
    test_tabs(cy)
  })
})