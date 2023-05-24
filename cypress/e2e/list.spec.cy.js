describe('Тестирование визуализации структуры данных "Список":', () => {
  beforeEach(() => {
    cy.visit('/list');
    cy.get('input').as('input');
    cy.get('[data="input-value"]').as('inputValue');
    cy.get('[data="index-value"]').as('indexValue');
    cy.get('[data="add-at-head-button"]').as('addAtHeadButton');
    cy.get('[data="add-at-tail-button"]').as('addAtTailButton');
    cy.get('[data="delete-at-head-button"]').as('deleteAtHeadButton');
    cy.get('[data="delete-at-tail-button"]').as('deleteAtTailButton');
    cy.get('[data="add-at-index-button"]').as('addAtIndexButton');
    cy.get('[data="delete-at-index-button"]').as('deleteAtIndexButton');
  });


  it('Начальное состояние страницы отрисовано корректно', () => {
    cy.get('@inputValue').should('have.value', '');
    cy.get('@indexValue').should('have.value', '');
    cy.get('@addAtHeadButton').should('be.disabled');
    cy.get('@addAtTailButton').should('be.disabled');
    cy.get('@deleteAtHeadButton').should('not.be.disabled');
    cy.get('@deleteAtTailButton').should('not.be.disabled');
    cy.get('@addAtIndexButton').should('be.disabled');
    cy.get('@deleteAtIndexButton').should('be.disabled');
  })
});