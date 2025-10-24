describe('Tests du Module Recrutement', () => {
  beforeEach(() => {
    cy.goToSite()
    cy.login()
    cy.navigateTo('Recruitment')
  })

  it('Devrait ajouter un nouveau candidat', () => {
    // Aller à la page d'ajout de candidat
    cy.contains('button', 'Add').click()
    
    // Remplir le formulaire
    cy.get('input[name="firstName"]').type('Marie')
    cy.get('input[name="lastName"]').type('Martin')
    cy.get('.oxd-select-text-input').eq(0).click()
    cy.contains('div', 'QA Lead').click()
    
    cy.get('input[placeholder="Type here"]').eq(0).type('marie.martin@example.com')
    
    // Sauvegarder
    cy.contains('button', 'Save').click()
    
    // Vérifier la création
    cy.get('.oxd-toast-container')
      .should('contain', 'Successfully Saved')
    
    cy.screenshot('candidate-added')
  })

  it('Devrait rechercher des candidats', () => {
    // Rechercher par nom
    cy.get('input[placeholder="Type for hints..."]').type('Marie')
    cy.contains('button', 'Search').click()
    
    // Vérifier les résultats
    cy.get('.oxd-table-row').should('have.length.gt', 0)
    cy.get('.oxd-table-cell').contains('Marie').should('be.visible')

  })
})