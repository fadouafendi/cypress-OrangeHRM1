
describe ("Tester toutes les navigations des menus principales", () => {
it('Devrait tester la navigation complète', () => {
    cy.goToSite()
    cy.wait(5000)    
    cy.login()

    const menus = ['Admin', 'PIM', 'Leave', 'Time', 'My Info', 'Performance', 'Buzz']
        cy.wait(8000)    

    menus.forEach(menu => {
      cy.get('.oxd-sidepanel').within(() => {
        cy.contains('span', menu).click({ force: true })
      })
      cy.wait(8000)
      cy.log(`Navigation vers ${menu} réussie`)
    })

    cy.screenshot('complete-navigation')
  })

})