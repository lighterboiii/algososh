import {
  circle,
  indexValue,
  inputValue,
  circleSmall,
  defaultState,
  circleContent,
  changingState,
  modifiedState,
  addAtHeadButton,
  addAtTailButton,
  addAtIndexButton,
  deleteAtHeadButton,
  deleteAtTailButton,
  deleteAtIndexButton,
} from "../constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

export const getCirclesData = (array) => {
  cy.get(circle).then((item) => {
    cy.get(item).children().each((child) => {
      array.push(child.text());
    });
  });
};

describe("Тестирование визуализации структуры данных 'Список'", () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it("Начальное состояние страницы отрисовано корректно", () => {
    cy.get(inputValue).should('have.value', '');
    cy.get(indexValue).should('have.value', '');
    cy.get(addAtHeadButton).should('be.disabled');
    cy.get(addAtTailButton).should('be.disabled');
    cy.get(deleteAtHeadButton).should('not.be.disabled');
    cy.get(deleteAtTailButton).should('not.be.disabled');
    cy.get(addAtIndexButton).should('be.disabled');
    cy.get(deleteAtIndexButton).should('be.disabled');
  });

  it("Добавление элемента в head реализовано корректно", () => {
    const value = "666";
    cy.get(inputValue).type(value);
    cy.get(addAtHeadButton).should('not.be.disabled');
    cy.get(addAtHeadButton).click();
    cy.get(addAtHeadButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));
    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[0]).find(circleSmall).children().should('have.text', value);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[0]).children().should('have.text', value);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[0]).children().should('have.text', value);
    });
    cy.get(inputValue).should('have.text', '');
    cy.get(addAtHeadButton).should('be.disabled');
  });

  it("Добавление элемента в tail реализовано корректно", () => {
    const value = "666";
    let arrayOfCircles = [];
    getCirclesData(arrayOfCircles);
    cy.get(inputValue).type(value);
    cy.get(addAtTailButton).should('not.be.disabled');
    cy.get(addAtTailButton).click();
    cy.get(addAtTailButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));
    cy.get(circleContent).then((item) => {
      cy.get(item[arrayOfCircles.length - 1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[arrayOfCircles.length - 1]).find(circleSmall).children().should('have.text', value);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[arrayOfCircles.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[arrayOfCircles.length]).children().should('have.text', value);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[arrayOfCircles.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[arrayOfCircles.length]).children().should('have.text', value);
    });
    cy.get(inputValue).should('have.text', '');
    cy.get(addAtTailButton).should('be.disabled');
  });

  it("Добавление элемента по индексу реализовано корректно", () => {
    const value = "666";
    const index = "1";
    cy.get(inputValue).type(value);
    cy.get(indexValue).type(index);
    cy.get(addAtIndexButton).should('not.be.disabled');
    cy.get(addAtIndexButton).click();
    cy.get(addAtIndexButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContent).then((item) => {
      cy.get(item[index])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[index]).find(circleSmall).children().should('have.text', value);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[index])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedState));
      cy.get(item[index]).children().should('have.text', value);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[index])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultState));
      cy.get(item[index]).children().should('have.text', value);
    });
    cy.get(indexValue).should('have.text', '');
    cy.get(inputValue).should('have.text', '');
    cy.get(addAtIndexButton).should('be.disabled');
  });

  it("Удаление элемента из head реализовано корректно", () => {
    let arrayOfCircles = [];
    getCirclesData(arrayOfCircles);
    cy.get(deleteAtHeadButton).should('not.be.disabled');
    cy.get(deleteAtHeadButton).click();
    cy.get(deleteAtHeadButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));
    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[0]).find(circleSmall).children().should('have.text', arrayOfCircles[0]);
    });
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[1]).children().should('have.text', '');
    });
  });

  it("Удаление элемента из tail реализовано корректно", () => {
    let arrayOfCircles = [];
    getCirclesData(arrayOfCircles);
    cy.get(deleteAtTailButton).should('not.be.disabled');
    cy.get(deleteAtTailButton).click();
    cy.get(deleteAtTailButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));
    cy.get(circleContent).then((item) => {
      cy.get(item[arrayOfCircles.length - 1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[arrayOfCircles.length - 1]).find(circleSmall).children().should('have.text', arrayOfCircles[arrayOfCircles.length - 1]);
    });
    cy.get(circle).then((item) => {
      cy.get(item[arrayOfCircles.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[arrayOfCircles.length - 1]).children().should('have.text', '');
    });
  });

  it("Удаление элемента по индексу реализовано корректно", () => {
    let arrayOfCircles = [];
    getCirclesData(arrayOfCircles);
    const index = "1";
    cy.get(indexValue).type(index);
    cy.get(deleteAtIndexButton).should('not.be.disabled');
    cy.get(deleteAtIndexButton).click();
    cy.get(deleteAtIndexButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains('loader'));
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).then((item) => {
      cy.get(item[index])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[index]).children().should('have.text', '');
    });
    cy.get(circleContent).then((item) => {
      cy.get(item[index])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingState));
      cy.get(item[index]).find(circleSmall).children().should('have.text', arrayOfCircles[index]);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(indexValue).should('have.text', '');
    cy.get(deleteAtIndexButton).should('be.disabled');
  })
});