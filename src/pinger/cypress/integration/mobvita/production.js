describe('Mobvita', function () {
  this.beforeEach(function () {
    cy.visit('https://revita.cs.helsinki.fi')
  })

  it('can log in and stories are fetched corretly', function () {
    cy.get('input:first').type('elbert.alyas@plutocow.com')
    cy.get('input:last').type('emacsemacs')
    cy.get('form').get('[data-cy=login]').click()
    cy.get('[data-cy=practice-now]').click()
    cy.get('[data-cy=start-random]').should('be.enabled')
  })
})
