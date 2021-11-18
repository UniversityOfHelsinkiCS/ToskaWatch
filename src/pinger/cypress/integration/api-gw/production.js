describe('Api gateway', () => {
  it('is alive', () => {
    cy.request({
      url: 'https://importer.cs.helsinki.fi/api/hello'
    }).then((response) => {
      expect(response.status).to.eq(200)

      expect(response.body).to.have.property('status')
      expect(response.body.status).to.eq('pass')
    })
  })
})
