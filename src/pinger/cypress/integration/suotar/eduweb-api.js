describe('Eduweb-api', () => {
  it('is alive and giving data in correct form', () => {
    cy.request({
      url: Cypress.env('EDUWEB_API_URL'),
      headers: {
        Authorized: Cypress.env('EDUWEB_API_TOKEN')
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length.gt(0)

      const instance = response.body[0]
      expect(instance).to.have.property('oodi_id')
    })
  })
})
