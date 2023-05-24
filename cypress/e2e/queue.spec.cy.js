import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { input, addButton, deleteButton, clearButton, circle, changingState, defaultState, circleContent } from "../constants";

describe("Тест визуализации структуры данных очередь", () => {
  beforeEach(() => {
    cy.visit('/queue');
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
    cy.get(addButton).should('have.text', 'Добавить');
    cy.get(deleteButton).should('have.text', 'Удалить');
    cy.get(clearButton).should('have.text', 'Очистить');
  });

  it("Добавление элемента в очередь происходит корректно", () => {
    cy.get(input).type('hi');
    cy.get(addButton).should('not.be.disabled');
    cy.get(addButton).click();
    cy.get(addButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
    });

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should("have.text", "head");
      cy.get(item[0]).children('div').invoke('last').should("have.text", "tail");
    });

    cy.wait(DELAY_IN_MS);

    cy.get(input).type('yo');
    cy.get(addButton).should('not.be.disabled');
    cy.get(addButton).click();
    cy.get(addButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
    });

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should("have.text", "head");
      cy.get(item[0]).children('div').invoke('last').should("not.have.text", "tail");
      cy.get(item[1]).children('div').invoke('last').should("have.text", "tail");
    });

    cy.wait(DELAY_IN_MS);

    cy.get(input).type('bb');
    cy.get(addButton).should('not.be.disabled');
    cy.get(addButton).click();
    cy.get(addButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
    });

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should("have.text", "head");
      cy.get(item[0]).children('div').invoke('last').should("not.have.text", "tail");
      cy.get(item[1]).children('div').invoke('last').should("not.have.text", "tail");
      cy.get(item[2]).children('div').invoke('last').should("have.text", "tail");
    });

    cy.wait(DELAY_IN_MS);

    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
  });
});