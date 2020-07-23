describe('Mobvita', function () {
  this.beforeEach(function () {
    cy.visit('https://revita.cs.helsinki.fi')
  })

  it('can log in and stories are fetched corretly', function () {
    cy.get('input:first').type(Cypress.env('mobvita_email'))
    cy.get('input:last').type(Cypress.env('mobvita_password'))
    cy.get('form').get('[data-cy=login]').click()
    cy.get('[data-cy=practice-now]').click()
    cy.get('[data-cy=start-random]').should('be.enabled')
  })
})
