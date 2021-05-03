/// <reference types="cypress" />

context('Brickboard Logout', () => {
  beforeEach(() => {
    cy.visit('https://brickboard-frontend.vercel.app')
    cy.contains('Login').click()
    cy.get('input[type=email]').type('admin@brickboard.com').should('have.value', 'admin@brickboard.com')
    cy.get('input[type=password]').type('123456').should('have.value', '123456')
    cy.get('button[type=submit]').click()
    cy.contains('Erfolgreich eingeloggt')
  });

  describe('Logout', () => {
    it('logs out', () => {
      cy.contains('Admin').trigger('mouseover')
      cy.contains('Logout').click()
      cy.contains('Erfolgreich abgemeldet!')
    })
  })
});