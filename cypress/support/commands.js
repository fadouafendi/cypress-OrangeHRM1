Cypress.Commands.add('goToSite', ()=> {
    cy.visit('https://opensource-demo.orangehrmlive.com');
})

// Connexion standard
Cypress.Commands.add('login', (username = 'Admin', password = 'admin123') => {
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

// Navigation par le menu
Cypress.Commands.add('navigateTo', (menuItem) => {
  cy.get('.oxd-sidepanel').within(() => {
    cy.contains('span', menuItem).click()
  })
})

// Vérifier que la page est chargée
Cypress.Commands.add('verifyPageHeader', (expectedHeader) => {
  cy.get('.oxd-topbar-header-breadcrumb').within(() => {
    cy.wait(4000)
    cy.get('.oxd-topbar-header-breadcrumb-level').should('contain', expectedHeader)
  })
})