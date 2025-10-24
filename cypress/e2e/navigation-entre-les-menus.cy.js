
describe ("Tester toutes les navigations des menus principales", () => {
it('Devrait tester la navigation complète', () => {
    cy.goToSite()
    cy.login()

    const menus = ['Admin', 'PIM', 'Leave', 'Time', 'My Info', 'Performance', 'Buzz']

    menus.forEach(menu => {
      cy.get('.oxd-sidepanel').within(() => {
        cy.contains('span', menu).click({ force: true })
      })
      cy.log(`Navigation vers ${menu} réussie`)
    })
  })

})