/// <reference types="cypress" />

context('Brickboard Forum Post', () => {
  beforeEach(() => {
    cy.visit('https://brickboard-frontend.vercel.app')
    cy.contains('Login').click()
    cy.get('input[type=email]').type('admin@brickboard.com').should('have.value', 'admin@brickboard.com')
    cy.get('input[type=password]').type('123456').should('have.value', '123456')
    cy.get('button[type=submit]').click()
    cy.contains('Erfolgreich eingeloggt')
  });

  describe('Forum Post', () => {
    it('Creates a new Forum Post', () => {
      cy.contains('Forum').click()
      cy.contains('Sonstiges').click()
      cy.contains('Dies ist ein Test').click()
      cy.contains('Antworten').scrollIntoView()
      cy.contains('Antworten').click()
      cy.get('.sun-editor-editable').type('Das ist ein cypress.io Test')
      cy.contains('Absenden').click()
      cy.contains('Deine Antwort wurde gepostet!')
    });
  });
});