import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { input, addButton, deleteButton, clearButton, circle, changingState, defaultState, circleContent } from "../constants";

const queue = [11, 22, 63];
const enqueue = (val) => {
  cy.get(input).type(val);
  cy.get(addButton).should('not.be.disabled');
  cy.get(addButton).click();
  cy.get(deleteButton).should('not.be.disabled');
};

describe("Тест визуализации структуры данных очередь", () => {
  beforeEach(() => {
    cy.visit('/queue');
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get(input).should('have.value', '');
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
  });

  it("Добавление элемента в очередь выполняется корректно", () => {
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

  it("Удаление элемента из очереди выполняется корректно", () => {
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');

    cy.wait(SHORT_DELAY_IN_MS);

    queue.map(val => {
      enqueue(val);
    });

    cy.get(deleteButton).click();
    cy.get(deleteButton)
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
      cy.get(item[0]).should('have.text', '');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children('div').invoke('first').should("not.have.text", "head");
      cy.get(item[1]).children('div').invoke('first').should("have.text", "head");
      cy.get(item[2]).children('div').invoke('last').should("have.text", "tail");
    });
  });

  it("Очистка очереди выполняется корректно", () => {
    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');

    cy.wait(SHORT_DELAY_IN_MS);

    queue.map(val => {
      enqueue(val);
    });

    cy.get(clearButton).click();
    cy.get(clearButton)
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0]).should('have.text', '');
      cy.get(item[1]).should('have.text', '');
      cy.get(item[2]).should('have.text', '');
    });

    cy.get(addButton).should('be.disabled');
    cy.get(deleteButton).should('be.disabled');
    cy.get(clearButton).should('be.disabled');
  });
});