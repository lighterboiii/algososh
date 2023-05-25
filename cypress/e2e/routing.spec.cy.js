describe("Тест роутинга главной страницы", function() {
  it('Переход на страницу "Строка" осуществляется корректно', function() {
    cy.visit('/');
    cy.wait(500);
    cy.visit('/recursion');
    cy.contains('Строка');
  });
  it('Переход на страницу "Фибоначчи" осуществляется корректно', function() {
    cy.visit('/');
    cy.wait(500);
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });
  it('Переход на страницу "Сортировка массива" осуществляется корректно', function() {
    cy.visit('/');
    cy.wait(500);
    cy.visit('/sorting');
    cy.contains('Сортировка массива');
  });
  it('Переход на страницу "Стек" осуществляется корректно', function() {
    cy.visit('/');
    cy.wait(500);
    cy.visit('/stack');
    cy.contains('Стек');
  });
  it('Переход на страницу "Очередь" осуществляется корректно', function() {
    cy.visit('/');
    cy.wait(500);
    cy.visit('/queue');
    cy.contains('Очередь');
  });
  it('Переход на страницу "Связный список" осуществляется корректно', function() {
    cy.visit('/');
    cy.wait(500);
    cy.visit('/list');
    cy.contains('Связный список');
  });
});