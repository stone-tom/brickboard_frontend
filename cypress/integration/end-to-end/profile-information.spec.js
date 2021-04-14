/// <reference types="cypress" />

context('Brickboard Profile', () => {
  beforeEach(() => {
    cy.visit('https://brickboard-frontend.vercel.app')
    cy.contains('Login').click()
    cy.get('input[type=email]').type('admin@brickboard.com').should('have.value', 'admin@brickboard.com')
    cy.get('input[type=password]').type('123456').should('have.value', '123456')
    cy.get('button[type=submit]').click()
    cy.contains('Erfolgreich eingeloggt')
  });

  describe('Profil changes ', () => {
    it('changes personal information in profile', () => {
      cy.contains('Admin').trigger('mouseover')
      cy.contains('Profil').click()
      cy.contains('Persönliche Daten').children('button').click()
      cy.get('input[type=text]:first').clear().type(`Bot${Math.random().toFixed(3)}`)
      cy.contains('Persönliche Daten').children('button').click()
      cy.contains('Persönliche Informationen erfolgreich aktualisiert')
    });
  });
});