describe('Workflows Complets OrangeHRM', () => {
  it('Workflow complet: Recrutement → Employé → Gestion', () => {
    // Étape 1: Connexion
    cy.goToSite()
    cy.login()

    // Étape 2: Ajouter un candidat
    cy.navigateTo('Recruitment')
    cy.contains('button', 'Add').click()
    
    cy.get('input[name="firstName"]').type('Sophie')
    cy.get('input[name="lastName"]').type('Bernard')
    cy.get('.oxd-select-text-input').eq(0).click()
    cy.contains('div', 'Software Engineer').click()
    cy.get('input[placeholder="Type here"]').eq(0).type('sophie.bernard@example.com')
    cy.contains('button', 'Save').click()
    
    // Étape 3: Rechercher le candidat
    cy.navigateTo('Recruitment')
    cy.get('input[placeholder="Type for hints..."]').type('Sophie')
    cy.contains('button', 'Search').click()
    cy.get('.oxd-table-cell').contains('Sophie').should('be.visible')
    
    // Étape 4: Aller à la gestion des employés
    cy.navigateTo('PIM')
    cy.get('.oxd-topbar-header-breadcrumb').within(() => {
        cy.get('.oxd-topbar-header-breadcrumb-module').should('contain', 'PIM')
  })    
    cy.log('✅ Workflow complet exécuté avec succès!')
  })
})