/// <reference types="cypress" />

context('Brickboard Filmvorstellungen', () => {
  beforeEach(() => {
    cy.visit('https://brickboard-frontend.vercel.app')
    cy.contains('Login').click()
    cy.get('input[type=email]').type('admin@brickboard.com').should('have.value', 'admin@brickboard.com')
    cy.get('input[type=password]').type('123456').should('have.value', '123456')
    cy.get('button[type=submit]').click()
    cy.contains('Erfolgreich eingeloggt')
  });

  describe('Filmvorstellungen', () => {
    it('filters movies', () => {
      cy.contains('Forum').click()
      cy.contains('Filmvorstellungen').scrollIntoView()
      cy.contains('Filmvorstellungen').click()
      cy.get('div[data-testid=movie_card]').then(($cards) => {
        expect($cards.length).greaterThan(0)
        cy.contains('Action').click()
        cy.wait(1000)
        cy.get('div[data-testid=movie_card]').then(($actionCards) => {
          expect($actionCards.length).lessThan($cards.length)
        })
      })
    });
  });
});