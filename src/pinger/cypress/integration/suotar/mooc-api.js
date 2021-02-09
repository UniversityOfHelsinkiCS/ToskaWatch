describe('Mooc-api', () => {
  it('is alive', () => {
    cy.request({
      url: Cypress.env('MOOC_API_URL'),
      headers: {
        Authorization: Cypress.env('MOOC_API_TOKEN')
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
