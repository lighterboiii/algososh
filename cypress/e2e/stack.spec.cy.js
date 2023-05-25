import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { input, addButton, deleteButton, clearButton, circle, circleContent, changingState, defaultState } from "../constants";

const stack = [11, 22, 63];
const push = (val) => {
  cy.get(input).type(val);
  cy.get(addButton).should('not.be.disabled');
  cy.get(addButton).click();
  cy.get(deleteButton).should('not.be.disabled');
};

describe("Тест визуализации структуры данных 'Стек'", () => {
  beforeEach(() => {
    cy.visit('/stack');
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
  });

  it("Добавление элемента выполняется корректно", () => {
    const value = '666';
    cy.get(input).type(value);
    cy.get(addButton).should('not.be.disabled');
    cy.get(addButton).click();
    cy.get(addButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));
    cy.get(circle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(changingState));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(defaultState));

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should('have.text', 'top');
    });

    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('not.be.disabled');
    cy.get(clearButton).should('not.be.disabled');

    cy.wait(DELAY_IN_MS);

    cy.get(input).type(value);
    cy.get(addButton).should('not.be.disabled');
    cy.get(addButton).click();
    cy.get(addButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));
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
      cy.get(item[0]).children('div').invoke('first').should('not.have.text', 'top');
      cy.get(item[1]).children('div').invoke('first').should('have.text', 'top');
    });

    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('not.be.disabled');
    cy.get(clearButton).should('not.be.disabled');
  });

  it("Удаление элемента выполняется корректно", () => {
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
    
    stack.map(val => {
      push(val);
    });

    cy.get(deleteButton).click();
    cy.get(deleteButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(item[stack.length - 1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should('not.have.text', 'top');
      cy.get(item[1]).children('div').invoke('first').should('have.text', 'top');
    });

    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('not.be.disabled');
    cy.get(clearButton).should('not.be.disabled');
  });

  it("Очистка стека выполняется корректно", () => {
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');

    stack.map(val => {
      push(val);
    });

    cy.get(clearButton).click();
    // cy.wrap(circleContent).should('have.length', 0);

    cy.wait(SHORT_DELAY_IN_MS);
    
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
  });
});