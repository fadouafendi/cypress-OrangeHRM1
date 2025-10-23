describe('Tests de Gestion des Employés', () => {
  beforeEach(() => {
    cy.goToSite()
    cy.wait(5000)
    cy.login()
    cy.navigateTo('PIM')
  })

  it('Devrait ajouter un nouvel employé', () => {
    // Cliquer sur ajouter un employé
    cy.contains('button', 'Add').click()
    
    // Remplir le formulaire
    cy.get('input[name="firstName"]').type('Jean')
    cy.get('input[name="lastName"]').type('Dupont')
    cy.get('input[name="middleName"]').type('Pierre')
    
    // Sauvegarder
    cy.contains('button', 'Save').click()
    
    // Vérifier la création
    cy.get('.oxd-toast-container')
      .should('be.visible')
      .and('contain', 'Successfully Saved')
    
    cy.verifyPageHeader('Personal Details')
    
    cy.screenshot('employee-added')
  })

  it('Devrait rechercher un employé', () => {
    // Rechercher par nom
    cy.get('input[placeholder="Type for hints..."]').first().type('Jean')
    cy.contains('button', 'Search').click()
    
    // Vérifier les résultats
    cy.get('.oxd-table-row').should('have.length.gt', 0)
    cy.get('.oxd-table-cell').contains('Jean').should('be.visible')
    
    cy.screenshot('employee-search')
  })

  it('Devrait modifier les informations d\'un employé', () => {
    // Rechercher un employé
    cy.get('input[placeholder="Type for hints..."]').first().type('Jean')
    cy.contains('button', 'Search').click()
    
    // Cliquer sur l'employé
    cy.get('.oxd-table-cell').contains('Jean').click()
    
    // Modifier les informations
    cy.contains('button', 'Save').scrollIntoView()
    cy.get('input[name="middleName"]').clear().type('Paul')
    cy.contains('button', 'Save').click()
    
    // Vérifier la modification
    cy.get('.oxd-toast-container')
      .should('contain', 'Successfully Updated')
    
    cy.screenshot('employee-updated')
  })
})