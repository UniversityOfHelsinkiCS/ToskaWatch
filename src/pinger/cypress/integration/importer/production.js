describe('Importer', () => {
  it('is alive', () => {
    cy.visit('https://importer.cs.helsinki.fi/ping')
    cy.contains('pong')
  })
})
