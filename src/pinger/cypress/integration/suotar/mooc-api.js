describe('Mooc-api', () => {
  it('is alive and giving data in correct form', () => {
    cy.request({
      url: Cypress.env('MOOC_API_URL'),
      headers: {
        Authorization: Cypress.env('MOOC_API_TOKEN')
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length.gt(0)

      const instance = response.body[0]
      expect(instance).to.have.property('student_number')
      expect(instance).to.have.property('id')
    })
  })
})
