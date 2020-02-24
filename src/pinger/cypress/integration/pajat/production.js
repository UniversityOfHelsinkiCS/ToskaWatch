describe('Pajat', function () {
  it('Can get data for calendar', function () {
    cy.request('https://study.cs.helsinki.fi/pajat/api/calendar')
      .then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.length(2)
      })
  })
})