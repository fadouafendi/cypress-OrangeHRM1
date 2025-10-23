describe('Tests du Dashboard et Navigation', () => {
  beforeEach(() => {
    cy.goToSite()
    cy.login()
  })

  it('Devrait afficher le dashboard avec tous les widgets', () => {
    // Vérifier les éléments du dashboard
    cy.get('.oxd-grid-3 .oxd-grid-item').should('have.length.gt', 0)
    
    // Vérifier les widgets principaux
    cy.contains('Time at Work').should('be.visible')
    cy.contains('My Actions').should('be.visible')
    cy.contains('Quick Launch').should('be.visible')
    cy.contains('Buzz Latest Posts').should('be.visible')
    
    //cy.screenshot('dashboard-loaded')
  })

  it('Devrait naviguer vers la page des employés', () => {
    cy.navigateTo('PIM')

    cy.verifyPageHeader('PIM')
    cy.get('.oxd-topbar-body-nav-tab').should('contain', 'Configuration')
    cy.get('.orangehrm-paper-container').should('be.visible')
    })

  it('Devrait naviguer vers le recrutement', () => {
    cy.navigateTo('Recruitment')
    
    cy.verifyPageHeader('Recruitment')
    cy.get('.oxd-topbar-body-nav-tab').should('contain', 'Candidates')
    cy.get('.oxd-table-filter').should('be.visible')
    
  })

  it.skip('Devrait se déconnecter', () => {
    cy.get('.oxd-userdropdown-tab').click()
    cy.contains('Logout').click()
    cy.wait(2000)
    // Vérifier la déconnexion
    cy.url().should('include', '/auth/login')
    cy.get('.orangehrm-login-branding').should('be.visible')
    
  })
})