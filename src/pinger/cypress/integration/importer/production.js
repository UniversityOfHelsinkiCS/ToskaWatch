describe('Importer', () => {
  it('is alive', () => {
    cy.request({
      url: 'https://importer.cs.helsinki.fi/api/importer/ping',
      headers: {
        token: Cypress.env('IMPORTER_TOKEN')
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.contain('pong')
    })
  })
})
