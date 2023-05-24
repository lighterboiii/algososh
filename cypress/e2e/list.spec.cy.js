import {
  input,
  indexValue,
  inputValue,
  circle,
  addAtHeadButton,
  addAtIndexButton,
  addAtTailButton,
  deleteAtHeadButton,
  deleteAtIndexButton,
  deleteAtTailButton,
  circleContent,
  circleSmall,
  changingState,
  modifiedState,
  defaultState,
} from "../constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Тестирование визуализации структуры данных "Список":', () => {
  beforeEach(() => {
    cy.visit('/list');
    // cy.get('input').as('input');
    // cy.get('[data="input-value"]').as('inputValue');
    // cy.get('[data="index-value"]').as('indexValue');
    // cy.get('[data="add-at-head-button"]').as('addAtHeadButton');
    // cy.get('[data="add-at-tail-button"]').as('addAtTailButton');
    // cy.get('[data="delete-at-head-button"]').as('deleteAtHeadButton');
    // cy.get('[data="delete-at-tail-button"]').as('deleteAtTailButton');
    // cy.get('[data="add-at-index-button"]').as('addAtIndexButton');
    // cy.get('[data="delete-at-index-button"]').as('deleteAtIndexButton');
    // cy.get('[class^="circle_content"]').as('circle');
    // cy.get('[class^="circle_small').as('smallCircle');
  });

  it('Начальное состояние страницы отрисовано корректно', () => {
    cy.get(inputValue).should('have.value', '');
    cy.get(indexValue).should('have.value', '');
    cy.get(addAtHeadButton).should('be.disabled');
    cy.get(addAtTailButton).should('be.disabled');
    cy.get(deleteAtHeadButton).should('not.be.disabled');
    cy.get(deleteAtTailButton).should('not.be.disabled');
    cy.get(addAtIndexButton).should('be.disabled');
    cy.get(deleteAtIndexButton).should('be.disabled');
  })

  it('Добавление элемента в head реализовано корректно', () => {
    const value = "666";
    cy.get(inputValue).type(value);
    cy.get(addAtHeadButton).should('not.be.disabled');
    cy.get(addAtHeadButton).click();
    cy.get(addAtHeadButton)
      .invoke('attr', 'class')
      .then((classList) => expect(classList).contains('loader'));
    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[0]).find(circleSmall).children().should("have.text", value);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[0]).children().should("have.text", value);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should("have.text", value);
    });
  })
});