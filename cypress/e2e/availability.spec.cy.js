describe('Тест работоспособности приложения:', function() {
  it('Приложение запускается', function() {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
    cy.contains('Сделано Славиком в Практикуме.')
  });
});