import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { circle, defaultState, input } from "../constants";

describe("Тест компонента  'Последовательность Фибоначчи'", () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get('button').last().as('button');
    cy.get(input).should('have.value', '');
    cy.get('@button').should('be.disabled');
    cy.get('@button').should('have.text', 'Рассчитать')
  });

  it("Числа последовательности генерируются корректно", () => {
    cy.get('button').last().as('button');
    cy.get(input).type('5');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button')
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));

    cy.get(circle).then((item) => {
      cy.get(circle)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should("have.text", '1');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(circle)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(circle)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
      cy.get(item[2]).children().should("have.text", '2');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(circle)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
      cy.get(item[2]).children().should("have.text", '2');
      cy.get(item[3]).children().should("have.text", '3');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(circle)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
      cy.get(item[2]).children().should("have.text", '2');
      cy.get(item[3]).children().should("have.text", '3');
      cy.get(item[4]).children().should("have.text", '5');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(circle)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should("have.text", '1');
      cy.get(item[1]).children().should("have.text", '1');
      cy.get(item[2]).children().should("have.text", '2');
      cy.get(item[3]).children().should("have.text", '3');
      cy.get(item[4]).children().should("have.text", '5');
      cy.get(item[5]).children().should("have.text", '8');
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(input).should('have.value', '');
    cy.get('@button').should('be.disabled');
  });
});