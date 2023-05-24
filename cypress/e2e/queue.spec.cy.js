import { input, addButton, deleteButton, clearButton } from "../constants";

describe("Тест визуализации структуры данных очередь", () => {
  beforeEach(() => {
    cy.visit('/queue');
  });

  it("Начальное состояние страницы отрисовано корректно" , () => {
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
    cy.get(addButton).should('have.text', 'Добавить');
    cy.get(deleteButton).should('have.text', 'Удалить');
    cy.get(clearButton).should('have.text', 'Очистить')
  });

});