describe('Workflows Complets OrangeHRM', () => {
  it('Workflow complet: Recrutement → Employé → Gestion', () => {
    // Étape 1: Connexion
    cy.goToSite()
    cy.wait(5000)
    cy.login()
    //cy.screenshot('workflow-1-login')

    // Étape 2: Ajouter un candidat
    cy.navigateTo('Recruitment')
    cy.contains('button', 'Add').click()
    
    cy.get('input[name="firstName"]').type('Sophie')
    cy.get('input[name="lastName"]').type('Bernard')
    cy.get('.oxd-select-text-input').eq(0).click()
    cy.contains('div', 'Software Engineer').click()
    cy.get('input[placeholder="Type here"]').eq(0).type('sophie.bernard@example.com')
    cy.contains('button', 'Save').click()
    
    //cy.screenshot('workflow-2-candidate-added')

    // Étape 3: Rechercher le candidat
    cy.navigateTo('Recruitment')
    cy.get('input[placeholder="Type for hints..."]').type('Sophie')
    cy.contains('button', 'Search').click()
    cy.get('.oxd-table-cell').contains('Sophie').should('be.visible')
    
    //cy.screenshot('workflow-3-candidate-found')

    // Étape 4: Aller à la gestion des employés
    cy.navigateTo('PIM')
    cy.verifyPageHeader('PIM')
    
    //cy.screenshot('workflow-4-pim-page')

    // Étape 5: Déconnexion
    cy.get('.oxd-userdropdown-tab').click()
    cy.contains('Logout').click()
    
    //cy.screenshot('workflow-5-logout')
    
    cy.log('✅ Workflow complet exécuté avec succès!')
  })

  it('Devrait tester la navigation complète', () => {
    cy.visit('/')
    cy.login()

    // Tester toutes les navigations principales
    const menus = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Buzz']
    
    menus.forEach(menu => {
      cy.get('.oxd-sidepanel').within(() => {
        cy.contains('span', menu).click({ force: true })
      })
      cy.wait(1000)
      cy.log(`Navigation vers ${menu} réussie`)
    })

    cy.screenshot('complete-navigation')
  })
})