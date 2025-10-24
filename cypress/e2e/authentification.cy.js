describe('Tests d\'Authentification OrangeHRM', () => {
  let username = "user1"
  beforeEach(() => {
    cy.goToSite()
  })

  it('Devrait se connecter avec des identifiants valides', () => {
    // Vérifier la page de login
    cy.get('.orangehrm-login-branding').should('be.visible')
    cy.get('.oxd-form').should('be.visible')
    
    // Saisir les identifiants
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Vérifier la connexion réussie
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-breadcrumb').should('be.visible')
    cy.get('.oxd-userdropdown-tab').should('be.visible')

  })

  it('Devrait afficher une erreur avec des identifiants invalides', () => {
    cy.get('input[name="username"]').type('invalid')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    // Vérifier le message d'erreur
    cy.get('.oxd-alert-content')
      .should('be.visible')
      .and('contain', 'Invalid credentials')

  })

  it('Devrait pouvoir réinitialiser le mot de passe', () => {
    cy.get('.oxd-form').within(() => {
      cy.contains('Forgot your password?').click()
    })
    
    cy.url().should('include', '/requestPasswordResetCode')
    cy.get('.oxd-text--h6').should('contain', 'Reset Password')
    cy.get('button[type="button"]').contains('Cancel').should('be.visible')
    cy.get('.oxd-input--active').type(username)
    cy.get('.orangehrm-forgot-password-button--reset').click()
    cy.get('.oxd-text--p').should('contain', 'A reset password link has been sent to you via email.')
  })
})