describe('Oodikone', () => {
  const test_tabs = (cy) => {
    cy.url().should('include', 'login.helsinki.fi')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    cy.contains('Login').click()
    cy.url().should('include', 'oodikone')

    cy.contains('Student statistics').click()
    cy.get('input[type="text"]').type('123412341234')
    cy.contains('No search results')
    cy.wait(1000)
    cy.contains('No search results')
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