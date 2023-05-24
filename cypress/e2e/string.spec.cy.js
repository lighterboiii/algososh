import { DELAY_IN_MS } from "../../src/constants/delays";
import { input, modifiedState, defaultState, changingState, circle } from "../constants";

describe("Тест визуализатора алгоритма 'Строка'", () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it("Кнопка 'Развернуть' заблокирована при пустом инпуте", () => {
    cy.get('button').last().as('button');
    cy.get(input).should('have.value', '');
    cy.get('@button').should('be.disabled');
    cy.get('@button').should('have.text', 'Развернуть')
  })

  it("Разворот строки произведен корректно", () => {
    cy.get('button').last().as('button');
    cy.get(input).type('кофе');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button')
      .invoke("attr", "class")
      .then((className) => expect(className).contains('loader'));
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[0]).children().should("have.text", 'к');

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[1]).children().should("have.text", 'о');

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[2]).children().should("have.text", 'ф');

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[3]).children().should("have.text", 'е');

      cy.wait(DELAY_IN_MS);

      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[0]).children().should("have.text", 'е');

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[1]).children().should("have.text", 'о');

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[2]).children().should("have.text", 'ф');

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[3]).children().should("have.text", 'к');

      cy.wait(DELAY_IN_MS);

      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[0]).children().should("have.text", 'е');

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[1]).children().should("have.text", 'ф');

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[2]).children().should("have.text", 'о');

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[3]).children().should("have.text", 'к');
    });
  });
});